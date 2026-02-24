const LIGHT = {
  background:                { hex: "#F7F9FF", oklch: "{indigo.2} rdx" },
  foreground:                { hex: "#0F172A", oklch: "{slate.900} tw" },
  card:                      { hex: "#FBFDFF", oklch: "{blue.1} rdx" },
  cardForeground:            { hex: "#0F172A", oklch: "{slate.900} tw" },
  popover:                   { hex: "#FBFDFF", oklch: "{blue.1} rdx" },
  popoverForeground:         { hex: "#0F172A", oklch: "{slate.900} tw" },
  primary:                   { hex: "#2563EB", oklch: "{blue.600} tw" },
  primaryForeground:         { hex: "#FCFCFC", oklch: "{gray.1} rdx" },
  secondary:                 { hex: "#E0E7FF", oklch: "{indigo.100} tw" },
  secondaryForeground:       { hex: "#1F2D5C", oklch: "{indigo.12} rdx" },
  muted:                     { hex: "#EDF2FE", oklch: "{indigo.3} rdx" },
  mutedForeground:           { hex: "#64748B", oklch: "{slate.500} tw" },
  accent:                    { hex: "#F76B15", oklch: "{orange.9} rdx" },
  accentForeground:          { hex: "#FCFCFC", oklch: "{gray.1} rdx" },
  cta:                       { hex: "#F76B15", oklch: "{orange.9} rdx" },
  ctaForeground:             { hex: "#FCFCFC", oklch: "{gray.1} rdx" },
  destructive:               { hex: "#DC2626", oklch: "{red.600} tw" },
  border:                    { hex: "#E2E8F0", oklch: "{slate.200} tw" },
  input:                     { hex: "#CBD5E1", oklch: "{slate.300} tw" },
  ring:                      { hex: "#2563EB", oklch: "{blue.600} tw" },
  chart1:                    { hex: "#2563EB", oklch: "{blue.600} tw" },
  chart2:                    { hex: "#F76B15", oklch: "{orange.9} rdx" },
  chart3:                    { hex: "#12A594", oklch: "{teal.9} rdx" },
  chart4:                    { hex: "#6E56CF", oklch: "{violet.9} rdx" },
  chart5:                    { hex: "#FFC53D", oklch: "{amber.9} rdx" },
  sidebar:                   { hex: "#EFF6FF", oklch: "{blue.50} tw" },
  sidebarForeground:         { hex: "#0F172A", oklch: "{slate.900} tw" },
  sidebarPrimary:            { hex: "#2563EB", oklch: "{blue.600} tw" },
  sidebarPrimaryForeground:  { hex: "#FCFCFC", oklch: "{gray.1} rdx" },
  sidebarAccent:             { hex: "#E0E7FF", oklch: "{indigo.100} tw" },
  sidebarAccentForeground:   { hex: "#0F172A", oklch: "{slate.900} tw" },
  sidebarBorder:             { hex: "#E2E8F0", oklch: "{slate.200} tw" },
  sidebarRing:               { hex: "#2563EB", oklch: "{blue.600} tw" },
} as const;

const DARK = {
  background:                { hex: "#020617", oklch: "{slate.950} tw" },
  foreground:                { hex: "#F1F5F9", oklch: "{slate.100} tw" },
  card:                      { hex: "#11131F", oklch: "{indigo.1} rdx dark" },
  cardForeground:            { hex: "#F1F5F9", oklch: "{slate.100} tw" },
  popover:                   { hex: "#141726", oklch: "{indigo.2} rdx dark" },
  popoverForeground:         { hex: "#F1F5F9", oklch: "{slate.100} tw" },
  primary:                   { hex: "#70B8FF", oklch: "{blue.11} rdx dark" },
  primaryForeground:         { hex: "#FCFCFC", oklch: "{gray.1} rdx" },
  secondary:                 { hex: "#182449", oklch: "{indigo.3} rdx dark" },
  secondaryForeground:       { hex: "#E2E8F0", oklch: "{slate.200} tw" },
  muted:                     { hex: "#141726", oklch: "{indigo.2} rdx dark" },
  mutedForeground:           { hex: "#696E77", oklch: "{slate.9} rdx dark" },
  accent:                    { hex: "#F76B15", oklch: "{orange.9} rdx" },
  accentForeground:          { hex: "#020617", oklch: "{slate.950} tw" },
  cta:                       { hex: "#F76B15", oklch: "{orange.9} rdx" },
  ctaForeground:             { hex: "#020617", oklch: "{slate.950} tw" },
  destructive:               { hex: "#FF9592", oklch: "{red.11} rdx dark" },
  border:                    { hex: "rgba(255,255,255,0.10)", oklch: "rgba — translucent" },
  input:                     { hex: "rgba(255,255,255,0.14)", oklch: "rgba — translucent" },
  ring:                      { hex: "#70B8FF", oklch: "{blue.11} rdx dark" },
  chart1:                    { hex: "#70B8FF", oklch: "{blue.11} rdx dark" },
  chart2:                    { hex: "#F76B15", oklch: "{orange.9} rdx" },
  chart3:                    { hex: "#0BD8B6", oklch: "{teal.11} rdx dark" },
  chart4:                    { hex: "#BAA7FF", oklch: "{violet.11} rdx dark" },
  chart5:                    { hex: "#FFC53D", oklch: "{amber.9} rdx" },
  sidebar:                   { hex: "#111113", oklch: "{slate.1} rdx dark" },
  sidebarForeground:         { hex: "#F1F5F9", oklch: "{slate.100} tw" },
  sidebarPrimary:            { hex: "#70B8FF", oklch: "{blue.11} rdx dark" },
  sidebarPrimaryForeground:  { hex: "#FCFCFC", oklch: "{gray.1} rdx" },
  sidebarAccent:             { hex: "#182449", oklch: "{indigo.3} rdx dark" },
  sidebarAccentForeground:   { hex: "#F1F5F9", oklch: "{slate.100} tw" },
  sidebarBorder:             { hex: "rgba(255,255,255,0.10)", oklch: "rgba — translucent" },
  sidebarRing:               { hex: "#70B8FF", oklch: "{blue.11} rdx dark" },
} as const;

function isLight(hex: string) {
  if (hex.startsWith("rgba")) return hex.includes("0.1");
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140;
}

function Swatch({
  label,
  variable,
  hex,
  oklch,
  darkBg,
}: {
  label: string;
  variable: string;
  hex: string;
  oklch: string;
  darkBg?: boolean;
}) {
  const textColor = darkBg
    ? isLight(hex) ? "#020617" : "#F1F5F9"
    : isLight(hex) ? "#0F172A" : "#FFFFFF";
  const needsBorder = hex.startsWith("rgba") || ["#FBFDFF", "#FCFCFC", "#F7F9FF"].includes(hex);

  return (
    <div className="flex flex-col w-[154px] shrink-0">
      <div
        className="h-[72px] rounded-xl flex flex-col items-center justify-center px-2"
        style={{
          backgroundColor: hex,
          border: needsBorder
            ? darkBg ? "1px solid rgba(255,255,255,0.15)" : "1px solid #E2E8F0"
            : "none",
        }}
      >
        <span className="text-[11px] font-semibold leading-tight" style={{ color: textColor }}>
          {hex.length <= 10 ? hex : hex.slice(0, 22)}
        </span>
      </div>
      <p className="text-[12px] font-semibold mt-2 leading-tight" style={{ color: darkBg ? "#F1F5F9" : "#0F172A" }}>
        {label}
      </p>
      <p className="text-[10px] font-mono leading-tight mt-0.5" style={{ color: darkBg ? "#64748B" : "#696E77" }}>
        {variable}
      </p>
      <p className="text-[9px] font-mono leading-tight mt-0.5 opacity-60" style={{ color: darkBg ? "#64748B" : "#696E77" }}>
        {oklch}
      </p>
    </div>
  );
}

function Section({
  title,
  count,
  children,
  dark,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-3 mb-4">
        <h3 className="text-[16px] font-semibold" style={{ color: dark ? "#F1F5F9" : "#0F172A" }}>
          {title}
        </h3>
        <span className="text-[12px] font-mono" style={{ color: dark ? "#64748B" : "#696E77" }}>
          {count} tokens
        </span>
      </div>
      <div className="flex flex-wrap gap-4">
        {children}
      </div>
    </div>
  );
}

export default function ColorPalettePage() {
  return (
    <div className="bg-white p-12 min-w-[1600px]">
      <h1 className="text-[28px] font-bold text-[#0F172A] mb-1">
        Design System — Complete Color Palette
      </h1>
      <p className="text-[14px] text-[#64748B] mb-1">
        globals.css — 33 tokens per mode / tw + rdx palette references
      </p>
      <p className="text-[12px] font-mono text-[#696E77] mb-10">
        shadcn/ui + Tailwind CSS v4 semantic tokens
      </p>

      {/* ===== LIGHT MODE ===== */}
      <section className="mb-12">
        <div className="flex items-baseline gap-3 mb-6">
          <h2 className="text-[22px] font-bold text-[#0F172A]">Light Mode</h2>
          <span className="text-[13px] text-[#64748B]">33 tokens — :root</span>
        </div>

        <Section title="Brand" count={10}>
          <Swatch label="Primary" variable="--primary" {...LIGHT.primary} />
          <Swatch label="Primary FG" variable="--primary-foreground" {...LIGHT.primaryForeground} />
          <Swatch label="Secondary" variable="--secondary" {...LIGHT.secondary} />
          <Swatch label="Secondary FG" variable="--secondary-foreground" {...LIGHT.secondaryForeground} />
          <Swatch label="Accent" variable="--accent" {...LIGHT.accent} />
          <Swatch label="Accent FG" variable="--accent-foreground" {...LIGHT.accentForeground} />
          <Swatch label="CTA" variable="--cta" {...LIGHT.cta} />
          <Swatch label="CTA FG" variable="--cta-foreground" {...LIGHT.ctaForeground} />
          <Swatch label="Destructive" variable="--destructive" {...LIGHT.destructive} />
          <Swatch label="Muted" variable="--muted" {...LIGHT.muted} />
        </Section>

        <Section title="Muted" count={2}>
          <Swatch label="Muted" variable="--muted" {...LIGHT.muted} />
          <Swatch label="Muted FG" variable="--muted-foreground" {...LIGHT.mutedForeground} />
        </Section>

        <Section title="Surfaces" count={6}>
          <Swatch label="Background" variable="--background" {...LIGHT.background} />
          <Swatch label="Foreground" variable="--foreground" {...LIGHT.foreground} />
          <Swatch label="Card" variable="--card" {...LIGHT.card} />
          <Swatch label="Card FG" variable="--card-foreground" {...LIGHT.cardForeground} />
          <Swatch label="Popover" variable="--popover" {...LIGHT.popover} />
          <Swatch label="Popover FG" variable="--popover-foreground" {...LIGHT.popoverForeground} />
        </Section>

        <Section title="Sidebar" count={8}>
          <Swatch label="Sidebar" variable="--sidebar" {...LIGHT.sidebar} />
          <Swatch label="Sidebar FG" variable="--sidebar-foreground" {...LIGHT.sidebarForeground} />
          <Swatch label="Sidebar Primary" variable="--sidebar-primary" {...LIGHT.sidebarPrimary} />
          <Swatch label="Sidebar Primary FG" variable="--sidebar-primary-fg" {...LIGHT.sidebarPrimaryForeground} />
          <Swatch label="Sidebar Accent" variable="--sidebar-accent" {...LIGHT.sidebarAccent} />
          <Swatch label="Sidebar Accent FG" variable="--sidebar-accent-fg" {...LIGHT.sidebarAccentForeground} />
          <Swatch label="Sidebar Border" variable="--sidebar-border" {...LIGHT.sidebarBorder} />
          <Swatch label="Sidebar Ring" variable="--sidebar-ring" {...LIGHT.sidebarRing} />
        </Section>

        <Section title="Utilities" count={3}>
          <Swatch label="Border" variable="--border" {...LIGHT.border} />
          <Swatch label="Input" variable="--input" {...LIGHT.input} />
          <Swatch label="Ring" variable="--ring" {...LIGHT.ring} />
        </Section>

        <Section title="Charts" count={5}>
          <Swatch label="Chart 1 — Blue" variable="--chart-1" {...LIGHT.chart1} />
          <Swatch label="Chart 2 — Orange" variable="--chart-2" {...LIGHT.chart2} />
          <Swatch label="Chart 3 — Teal" variable="--chart-3" {...LIGHT.chart3} />
          <Swatch label="Chart 4 — Violet" variable="--chart-4" {...LIGHT.chart4} />
          <Swatch label="Chart 5 — Amber" variable="--chart-5" {...LIGHT.chart5} />
        </Section>
      </section>

      {/* Divider */}
      <div className="border-t border-[#E2E8F0] my-10" />

      {/* ===== DARK MODE ===== */}
      <section className="rounded-3xl bg-[#020617] p-10">
        <div className="flex items-baseline gap-3 mb-6">
          <h2 className="text-[22px] font-bold text-[#F1F5F9]">Dark Mode</h2>
          <span className="text-[13px] text-[#64748B]">33 tokens — .dark</span>
        </div>

        <Section title="Brand" count={10} dark>
          <Swatch label="Primary" variable="--primary" {...DARK.primary} darkBg />
          <Swatch label="Primary FG" variable="--primary-foreground" {...DARK.primaryForeground} darkBg />
          <Swatch label="Secondary" variable="--secondary" {...DARK.secondary} darkBg />
          <Swatch label="Secondary FG" variable="--secondary-foreground" {...DARK.secondaryForeground} darkBg />
          <Swatch label="Accent" variable="--accent" {...DARK.accent} darkBg />
          <Swatch label="Accent FG" variable="--accent-foreground" {...DARK.accentForeground} darkBg />
          <Swatch label="CTA" variable="--cta" {...DARK.cta} darkBg />
          <Swatch label="CTA FG" variable="--cta-foreground" {...DARK.ctaForeground} darkBg />
          <Swatch label="Destructive" variable="--destructive" {...DARK.destructive} darkBg />
          <Swatch label="Muted" variable="--muted" {...DARK.muted} darkBg />
        </Section>

        <Section title="Muted" count={2} dark>
          <Swatch label="Muted" variable="--muted" {...DARK.muted} darkBg />
          <Swatch label="Muted FG" variable="--muted-foreground" {...DARK.mutedForeground} darkBg />
        </Section>

        <Section title="Surfaces" count={6} dark>
          <Swatch label="Background" variable="--background" {...DARK.background} darkBg />
          <Swatch label="Foreground" variable="--foreground" {...DARK.foreground} darkBg />
          <Swatch label="Card" variable="--card" {...DARK.card} darkBg />
          <Swatch label="Card FG" variable="--card-foreground" {...DARK.cardForeground} darkBg />
          <Swatch label="Popover" variable="--popover" {...DARK.popover} darkBg />
          <Swatch label="Popover FG" variable="--popover-foreground" {...DARK.popoverForeground} darkBg />
        </Section>

        <Section title="Sidebar" count={8} dark>
          <Swatch label="Sidebar" variable="--sidebar" {...DARK.sidebar} darkBg />
          <Swatch label="Sidebar FG" variable="--sidebar-foreground" {...DARK.sidebarForeground} darkBg />
          <Swatch label="Sidebar Primary" variable="--sidebar-primary" {...DARK.sidebarPrimary} darkBg />
          <Swatch label="Sidebar Primary FG" variable="--sidebar-primary-fg" {...DARK.sidebarPrimaryForeground} darkBg />
          <Swatch label="Sidebar Accent" variable="--sidebar-accent" {...DARK.sidebarAccent} darkBg />
          <Swatch label="Sidebar Accent FG" variable="--sidebar-accent-fg" {...DARK.sidebarAccentForeground} darkBg />
          <Swatch label="Sidebar Border" variable="--sidebar-border" {...DARK.sidebarBorder} darkBg />
          <Swatch label="Sidebar Ring" variable="--sidebar-ring" {...DARK.sidebarRing} darkBg />
        </Section>

        <Section title="Utilities" count={3} dark>
          <Swatch label="Border" variable="--border" {...DARK.border} darkBg />
          <Swatch label="Input" variable="--input" {...DARK.input} darkBg />
          <Swatch label="Ring" variable="--ring" {...DARK.ring} darkBg />
        </Section>

        <Section title="Charts" count={5} dark>
          <Swatch label="Chart 1 — Blue" variable="--chart-1" {...DARK.chart1} darkBg />
          <Swatch label="Chart 2 — Orange" variable="--chart-2" {...DARK.chart2} darkBg />
          <Swatch label="Chart 3 — Teal" variable="--chart-3" {...DARK.chart3} darkBg />
          <Swatch label="Chart 4 — Purple" variable="--chart-4" {...DARK.chart4} darkBg />
          <Swatch label="Chart 5 — Amber" variable="--chart-5" {...DARK.chart5} darkBg />
        </Section>
      </section>
    </div>
  );
}
