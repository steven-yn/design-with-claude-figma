# TypeScript 설정 (`tsconfig.json`)

> TypeScript 5.9 + Next.js 16 + React 19 환경에 최적화된 설정.
> `@tsconfig/strictest` 수준의 타입 안전성을 적용하되, ESLint와 중복되는 옵션은 제외했다.

## Language & Environment

| 옵션 | 값 | 설명 |
|------|-----|------|
| `target` | `ES2022` | top-level await, `Array.at()`, `Object.hasOwn()`, private fields 등 최신 문법 지원. Next.js 16 런타임과 일치시킨다. |
| `lib` | `dom, dom.iterable, ESNext` | 브라우저 DOM API + 최신 ECMAScript 내장 타입 |
| `jsx` | `react-jsx` | React 17+ 자동 JSX 변환. `import React` 불필요 |

## Module System

| 옵션 | 값 | 설명 |
|------|-----|------|
| `module` | `esnext` | ESM 모듈 시스템 사용 |
| `moduleResolution` | `bundler` | Next.js/Vite 등 번들러 환경에 맞는 모듈 해석 전략. `node`와 달리 `exports` 필드를 올바르게 처리한다. |
| `resolveJsonModule` | `true` | `.json` 파일을 모듈로 import 허용 |
| `isolatedModules` | `true` | 파일 단위 트랜스파일 보장. SWC, esbuild 등 단일 파일 변환 도구와의 호환성 확보 |
| `verbatimModuleSyntax` | `true` | `import type`과 `import`를 엄격히 구분. 타입 전용 import는 번들에서 완전 제거되어 번들 크기 최적화 및 순환 의존성 방지 |
| `allowJs` | `true` | `.js` 파일을 TypeScript 프로젝트에서 함께 사용 허용 |
| `esModuleInterop` | `true` | CommonJS 모듈의 default import 호환성 (`import foo from 'cjs-lib'`) |

## Type Checking

### `strict: true`가 활성화하는 옵션들

`strict`는 아래 7개 옵션을 한번에 활성화하는 단축 플래그다:

| 옵션 | 효과 |
|------|------|
| `strictNullChecks` | `null`/`undefined`를 별도 타입으로 취급 |
| `strictFunctionTypes` | 함수 파라미터 타입의 반공변성(contravariance) 검사 |
| `strictBindCallApply` | `bind`, `call`, `apply` 호출 시 정확한 타입 검사 |
| `strictPropertyInitialization` | 클래스 속성의 생성자 내 초기화 강제 |
| `noImplicitAny` | 타입 추론 실패 시 암묵적 `any` 금지 |
| `noImplicitThis` | `this`의 타입이 `any`로 추론되는 것을 금지 |
| `alwaysStrict` | 모든 파일에 `"use strict"` 적용 |

### strict 이상의 추가 검사

| 옵션 | 값 | 설명 |
|------|-----|------|
| `noUncheckedIndexedAccess` | `true` | 배열/Record 인덱스 접근 시 반환 타입에 `\| undefined` 자동 추가. `arr[0]`이 `T`가 아닌 `T \| undefined`가 되어 런타임 에러를 컴파일 타임에 잡는다. |
| `noFallthroughCasesInSwitch` | `true` | switch 문에서 `break`/`return` 없이 다음 case로 떨어지는 것을 방지 |
| `noImplicitOverride` | `true` | 클래스에서 부모 메서드 오버라이드 시 `override` 키워드 필수. 부모 클래스 변경 시 서브클래스 불일치를 즉시 감지 |
| `noImplicitReturns` | `true` | 함수의 모든 코드 경로에서 명시적 return 강제. `if/else` 분기 누락 방지 |
| `allowUnusedLabels` | `false` | 미사용 label 문 에러 처리 |
| `allowUnreachableCode` | `false` | 도달 불가능한 코드(dead code) 에러 처리 |
| `forceConsistentCasingInFileNames` | `true` | 파일명 대소문자 일관성 강제. macOS(대소문자 무시)에서 개발 → Linux CI(대소문자 구분)에서 빌드 시 경로 오류 방지 |
| `exactOptionalPropertyTypes` | `true` | `{ x?: string }`에서 `x: undefined` 명시 할당 금지. "값 없음"과 "undefined 전달"을 구분하여 API 설계 의도 보호 |
| `erasableSyntaxOnly` | `true` | `enum`, `namespace`, parameter properties 등 런타임 코드를 생성하는 TS 전용 문법 금지. 순수한 타입 지우기(type erasure)만으로 JS 변환 가능한 상태 유지. Node.js 네이티브 TS 실행과도 호환 |

## Output

| 옵션 | 값 | 설명 |
|------|-----|------|
| `noEmit` | `true` | `.js` 파일 출력 안 함. Next.js/SWC가 직접 트랜스파일을 담당 |
| `skipLibCheck` | `true` | `node_modules` 내 `.d.ts` 파일 검사 스킵. 빌드 속도 향상 |
| `incremental` | `true` | 이전 빌드 결과를 캐시하여 재검사 속도 향상 |

## Paths

| 옵션 | 값 | 설명 |
|------|-----|------|
| `paths` | `@/* → ./src/*` | `@/components/ui/button` 같은 절대 경로 alias |

## Plugins

| 옵션 | 값 | 설명 |
|------|-----|------|
| `plugins` | `next` | Next.js 전용 타입 검사 플러그인. App Router의 `page.tsx`, `layout.tsx` 등에 대한 타입 지원 |

## Include / Exclude

| 구분 | 패턴 | 설명 |
|------|------|------|
| include | `next-env.d.ts` | Next.js 환경 타입 선언 |
| include | `**/*.ts, **/*.tsx, **/*.mts` | 모든 TypeScript 소스 |
| include | `.next/types/**/*.ts` | Next.js 빌드 생성 타입 |
| exclude | `node_modules` | 의존성 패키지 제외 |
| exclude | `claude-talk-to-figma-mcp` | Figma MCP 서버 (별도 프로젝트) |

## 의도적으로 제외한 옵션

| 옵션 | 제외 이유 |
|------|----------|
| `noUnusedLocals` | ESLint `@typescript-eslint/no-unused-vars`에서 `_` 접두사 무시 패턴과 함께 커버. 중복 설정 시 개발 중 노이즈 증가 |
| `noUnusedParameters` | 위와 동일 이유 |
| `noPropertyAccessFromIndexSignature` | Record/Map 타입 사용 시 노이즈가 심하고, 실익 대비 불편함이 큼 |
| `declaration` / `declarationMap` | 라이브러리 배포가 아닌 앱 프로젝트이므로 불필요 |
| `sourceMap` | Next.js가 자체적으로 소스맵 처리 |
| `module: "nodenext"` / `"node20"` | Next.js는 `bundler` moduleResolution을 사용하므로 변경 불필요 |
