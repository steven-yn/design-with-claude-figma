import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ChevronRight, Loader2, Mail, Plus, Trash2 } from "lucide-react"

import { Button } from "./button"

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "icon", "icon-xs", "icon-sm", "icon-lg", "responsive:xs", "responsive:sm", "responsive:default", "responsive:lg"],
    },
    disabled: { control: "boolean" },
    asChild: { control: "boolean" },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─── Default ────────────────────────────────────────────

export const Default: Story = {
  args: {
    children: "Button",
  },
}

// ─── AllVariants ────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

// ─── AllSizes ───────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="default">Default</Button>
      <Button size="lg">LG</Button>
    </div>
  ),
}

// ─── Responsive ─────────────────────────────────────────

export const ResponsiveXs: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="p-8">
      <p className="mb-4 text-sm text-muted-foreground">
        responsive:xs — 브라우저 너비를 조절하여 반응형 크기 변화를 확인하세요.
      </p>
      <Button size="responsive:xs">Responsive XS</Button>
    </div>
  ),
}

export const ResponsiveSm: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="p-8">
      <p className="mb-4 text-sm text-muted-foreground">
        responsive:sm — 브라우저 너비를 조절하여 반응형 크기 변화를 확인하세요.
      </p>
      <Button size="responsive:sm">Responsive SM</Button>
    </div>
  ),
}

export const ResponsiveDefault: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="p-8">
      <p className="mb-4 text-sm text-muted-foreground">
        responsive:default — 브라우저 너비를 조절하여 반응형 크기 변화를 확인하세요.
      </p>
      <Button size="responsive:default">Responsive Default</Button>
    </div>
  ),
}

export const ResponsiveLg: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="p-8">
      <p className="mb-4 text-sm text-muted-foreground">
        responsive:lg — 브라우저 너비를 조절하여 반응형 크기 변화를 확인하세요.
      </p>
      <Button size="responsive:lg">Responsive LG</Button>
    </div>
  ),
}

// ─── WithIcon ───────────────────────────────────────────

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>
        <Mail /> 이메일 보내기
      </Button>
      <Button variant="outline">
        다음 <ChevronRight />
      </Button>
      <Button variant="destructive">
        <Trash2 /> 삭제
      </Button>
      <Button size="icon">
        <Plus />
      </Button>
      <Button size="icon-xs" variant="ghost">
        <Plus />
      </Button>
      <Button size="icon-sm" variant="outline">
        <Plus />
      </Button>
      <Button size="icon-lg" variant="secondary">
        <Plus />
      </Button>
    </div>
  ),
}

// ─── States ─────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button disabled>
          <Loader2 className="animate-spin" /> Loading
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="outline">Normal</Button>
        <Button variant="outline" disabled>Disabled</Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="destructive">Normal</Button>
        <Button variant="destructive" disabled>Disabled</Button>
      </div>
    </div>
  ),
}

// ─── Playground ─────────────────────────────────────────

export const Playground: Story = {
  args: {
    children: "Playground",
    variant: "default",
    size: "default",
    disabled: false,
  },
}
