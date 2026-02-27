import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { createRef } from "react"

import { Button, buttonVariants } from "../button"

describe("Button", () => {
  // ─── 렌더링 ───────────────────────────────────────────

  describe("렌더링", () => {
    it("기본 props로 렌더링된다", () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
    })

    it("children을 올바르게 렌더링한다", () => {
      render(<Button><span>Icon</span> Label</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveTextContent("Icon")
      expect(button).toHaveTextContent("Label")
    })

    it.each([
      "default",
      "destructive",
      "outline",
      "secondary",
      "ghost",
      "link",
    ] as const)("variant='%s'가 렌더링된다", (variant) => {
      render(<Button variant={variant}>btn</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("data-variant", variant)
    })

    it.each([
      "xs",
      "sm",
      "default",
      "lg",
      "icon",
      "icon-xs",
      "icon-sm",
      "icon-lg",
      "responsive:xs",
      "responsive:sm",
      "responsive:default",
      "responsive:lg",
    ] as const)("size='%s'가 렌더링된다", (size) => {
      render(<Button size={size}>btn</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("data-size", size)
    })
  })

  // ─── Responsive ───────────────────────────────────────

  describe("Responsive", () => {
    it("size 기본값이 default이다", () => {
      render(<Button>btn</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("data-size", "default")
    })

    it.each([
      ["responsive:xs", { base: "h-5", lg: "h-6" }],
      ["responsive:sm", { base: "h-7", lg: "h-8" }],
      ["responsive:default", { base: "h-8", lg: "h-9" }],
      ["responsive:lg", { base: "h-9", lg: "h-10" }],
    ] as const)("%s 클래스에 브레이크포인트 프리픽스가 포함된다", (size, expected) => {
      render(<Button size={size}>btn</Button>)
      const className = screen.getByRole("button").className
      expect(className).toContain(expected.base)
      expect(className).toContain("sm:")
      expect(className).toContain("md:")
      expect(className).toContain(`lg:${expected.lg}`)
    })

    it.each([
      ["responsive:xs", "lg:h-6"],
      ["responsive:sm", "lg:h-8"],
      ["responsive:default", "lg:h-9"],
      ["responsive:lg", "lg:h-10"],
    ] as const)("%s가 lg에서 목표 고정 size에 도달한다", (size, lgClass) => {
      const classes = buttonVariants({ size })
      expect(classes).toContain(lgClass)
    })
  })

  // ─── 상호작용 ─────────────────────────────────────────

  describe("상호작용", () => {
    it("클릭 이벤트가 발생한다", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Button onClick={onClick}>btn</Button>)

      await user.click(screen.getByRole("button"))
      expect(onClick).toHaveBeenCalledOnce()
    })

    it("disabled 상태에서 클릭이 무시된다", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Button disabled onClick={onClick}>btn</Button>)

      await user.click(screen.getByRole("button"))
      expect(onClick).not.toHaveBeenCalled()
    })

    it("Enter 키로 클릭된다", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Button onClick={onClick}>btn</Button>)

      screen.getByRole("button").focus()
      await user.keyboard("{Enter}")
      expect(onClick).toHaveBeenCalledOnce()
    })

    it("Space 키로 클릭된다", async () => {
      const user = userEvent.setup()
      const onClick = vi.fn()
      render(<Button onClick={onClick}>btn</Button>)

      screen.getByRole("button").focus()
      await user.keyboard(" ")
      expect(onClick).toHaveBeenCalledOnce()
    })
  })

  // ─── 접근성 ───────────────────────────────────────────

  describe("접근성", () => {
    it("ARIA 속성이 전달된다", () => {
      render(<Button aria-label="닫기" aria-expanded={true}>X</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("aria-label", "닫기")
      expect(button).toHaveAttribute("aria-expanded", "true")
    })

    it("disabled 속성이 반영된다", () => {
      render(<Button disabled>btn</Button>)
      expect(screen.getByRole("button")).toBeDisabled()
    })

    it("type 속성을 지정할 수 있다", () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit")
    })
  })

  // ─── 스타일 ───────────────────────────────────────────

  describe("스타일", () => {
    it("data-slot='button'이 설정된다", () => {
      render(<Button>btn</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button")
    })

    it("data-variant가 반영된다", () => {
      render(<Button variant="destructive">btn</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("data-variant", "destructive")
    })

    it("data-size가 반영된다", () => {
      render(<Button size="lg">btn</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("data-size", "lg")
    })

    it("className이 cn으로 병합된다", () => {
      render(<Button className="custom-class">btn</Button>)
      expect(screen.getByRole("button")).toHaveClass("custom-class")
    })

    it("추가 className이 기존 스타일과 함께 적용된다", () => {
      render(<Button className="mt-4">btn</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("mt-4")
      expect(button).toHaveClass("inline-flex")
    })
  })

  // ─── 합성 (asChild) ──────────────────────────────────

  describe("합성 (asChild)", () => {
    it("asChild로 다른 엘리먼트를 렌더링한다", () => {
      render(
        <Button asChild>
          <a href="/home">Home</a>
        </Button>
      )
      const link = screen.getByRole("link", { name: "Home" })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "/home")
    })

    it("ref가 전달된다", () => {
      const ref = createRef<HTMLButtonElement>()
      render(<Button ref={ref}>btn</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })
})
