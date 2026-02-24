#!/usr/bin/env node

/**
 * sync-tokens.mjs
 *
 * globals.css의 :root(light) / .dark(dark) CSS 변수를 파싱하여
 * design-system/tokens.json의 mode/light mode, mode/dark mode 컬러 토큰을
 * 자동 최신화한다.
 *
 * hex 값은 tw/colors, rdx/colors 팔레트에서 매칭되는 참조({color.step})로 변환하고,
 * 매칭되지 않는 값(rgba 등)은 원본 그대로 유지한다.
 *
 * Usage: node scripts/sync-tokens.mjs
 *        npm run tokens:build
 */

import { readFileSync, writeFileSync, existsSync, copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const CSS_PATH = resolve(ROOT, "src/app/globals.css");
const TOKENS_PATH = resolve(ROOT, "design-system/tokens.json");
const ORIGIN_PATH = resolve(ROOT, "design-system/origin/tokens.json");

// ── CSS 파싱: :root / .dark 블록에서 변수 추출 ──────────────────────────

/**
 * CSS 텍스트에서 특정 선택자 블록의 커스텀 프로퍼티를 추출한다.
 * 중첩 브레이스를 카운팅하여 블록 경계를 정확히 잡는다.
 */
function parseCssBlock(css, selectorPattern) {
  const idx = css.search(selectorPattern);
  if (idx === -1) return {};

  const braceStart = css.indexOf("{", idx);
  if (braceStart === -1) return {};

  let depth = 0;
  let blockEnd = -1;
  for (let i = braceStart; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) {
        blockEnd = i;
        break;
      }
    }
  }
  if (blockEnd === -1) return {};

  const block = css.slice(braceStart + 1, blockEnd);

  const vars = {};
  const re = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = re.exec(block)) !== null) {
    const name = match[1].trim();
    let value = match[2].trim();
    // 인라인 주석 제거
    value = value.replace(/\/\*[\s\S]*?\*\//g, "").trim();
    vars[name] = value;
  }

  return vars;
}

/**
 * 컬러로 판별되는 CSS 변수만 필터링한다.
 * spacing, shadow, radius, font 등 비-컬러 변수는 제외.
 */
const NON_COLOR_PREFIXES = [
  "radius",
  "space",
  "shadow",
  "font",
  "color-",
  "animate",
];

function isColorVar(name, value) {
  if (NON_COLOR_PREFIXES.some((p) => name.startsWith(p))) return false;
  if (value.startsWith("var(")) return false;
  if (value.startsWith("calc(")) return false;
  if (/^#[0-9a-fA-F]{3,8}$/.test(value)) return true;
  if (/^rgba?\(/.test(value)) return true;
  if (/^hsla?\(/.test(value)) return true;
  return false;
}

// ── 팔레트 참조 맵 구축 ──────────────────────────────────────────────

/**
 * tokens.json의 tw/colors, rdx/colors 컬렉션에서
 * hex → {color.step} 참조 맵을 구축한다.
 */
function buildHexToRefMap(tokens) {
  const map = new Map();

  const collections = [
    "tw/colors/Mode 1",
    "rdx/colors/light mode",
    "rdx/colors/dark mode",
  ];

  for (const collName of collections) {
    const coll = tokens[collName];
    if (!coll) continue;

    for (const [colorName, shades] of Object.entries(coll)) {
      if (!shades || typeof shades !== "object") continue;

      if (shades.$value !== undefined) {
        const hex = String(shades.$value).toLowerCase();
        if (!map.has(hex)) {
          map.set(hex, colorName);
        }
        continue;
      }

      for (const [step, info] of Object.entries(shades)) {
        if (step.startsWith("$")) continue;
        if (!info || typeof info !== "object" || info.$value === undefined)
          continue;

        const hex = String(info.$value).toLowerCase();
        const ref = `${colorName}.${step}`;

        if (!map.has(hex)) {
          map.set(hex, ref);
        }
      }
    }
  }

  return map;
}

// ── 토큰 엔트리 생성 ────────────────────────────────────────────────

function makeTokenEntry(value) {
  return {
    $extensions: {
      "com.figma.scopes": ["ALL_SCOPES"],
    },
    $value: value,
    $type: "color",
  };
}

// ── 메인 로직 ────────────────────────────────────────────────────────

function main() {
  // tokens.json이 없으면 origin에서 복사하여 베이스 생성
  if (!existsSync(TOKENS_PATH)) {
    if (!existsSync(ORIGIN_PATH)) {
      console.error(
        "Error: tokens.json도 origin/tokens.json도 존재하지 않습니다."
      );
      process.exit(1);
    }
    copyFileSync(ORIGIN_PATH, TOKENS_PATH);
    console.log("tokens.json not found → origin/tokens.json에서 복사했습니다.\n");
  }

  const css = readFileSync(CSS_PATH, "utf-8");
  const tokensRaw = readFileSync(TOKENS_PATH, "utf-8");
  const tokens = JSON.parse(tokensRaw);

  // 1. CSS 파싱
  const lightVars = parseCssBlock(css, /^:root\s*\{/m);
  const darkVars = parseCssBlock(css, /^\.dark\s*\{/m);

  const lightColors = {};
  for (const [k, v] of Object.entries(lightVars)) {
    if (isColorVar(k, v)) lightColors[k] = v;
  }

  const darkColors = {};
  for (const [k, v] of Object.entries(darkVars)) {
    if (isColorVar(k, v)) darkColors[k] = v;
  }

  // 2. 팔레트 참조 맵 구축
  const hexToRef = buildHexToRefMap(tokens);

  // 3. 값을 참조로 변환
  function resolveValue(rawValue) {
    const lower = rawValue.toLowerCase();
    const ref = hexToRef.get(lower);
    if (ref) return `{${ref}}`;
    return rawValue;
  }

  // 4. tokens.json 업데이트
  const lightMode = tokens["mode/light mode"];
  const darkMode = tokens["mode/dark mode"];

  if (!lightMode || !darkMode) {
    console.error(
      'Error: tokens.json에 "mode/light mode" 또는 "mode/dark mode"가 없습니다.'
    );
    process.exit(1);
  }

  let lightUpdated = 0;
  let darkUpdated = 0;

  for (const [name, value] of Object.entries(lightColors)) {
    const resolved = resolveValue(value);
    const existing = lightMode[name];

    if (!existing) {
      lightMode[name] = makeTokenEntry(resolved);
      lightUpdated++;
      console.log(`  [light] + ${name}: ${resolved}`);
    } else if (existing.$type === "color" && existing.$value !== resolved) {
      const old = existing.$value;
      existing.$value = resolved;
      lightUpdated++;
      console.log(`  [light] ~ ${name}: ${old} → ${resolved}`);
    }
  }

  for (const [name, value] of Object.entries(darkColors)) {
    const resolved = resolveValue(value);
    const existing = darkMode[name];

    if (!existing) {
      darkMode[name] = makeTokenEntry(resolved);
      darkUpdated++;
      console.log(`  [dark]  + ${name}: ${resolved}`);
    } else if (existing.$type === "color" && existing.$value !== resolved) {
      const old = existing.$value;
      existing.$value = resolved;
      darkUpdated++;
      console.log(`  [dark]  ~ ${name}: ${old} → ${resolved}`);
    }
  }

  // 5. 저장 (indent 2, trailing newline)
  const output = JSON.stringify(tokens, null, 2) + "\n";
  writeFileSync(TOKENS_PATH, output, "utf-8");

  console.log(
    `\nSync complete: light ${lightUpdated}, dark ${darkUpdated} tokens updated.`
  );
  if (lightUpdated === 0 && darkUpdated === 0) {
    console.log("Already up to date.");
  }
}

main();
