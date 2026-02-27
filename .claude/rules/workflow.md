# 컴포넌트 개발 워크플로

컴포넌트를 추가·확장·수정할 때 아래 순서를 따른다. 단계를 건너뛰지 않는다.

## Phase 1: Plan — 요구사항 명세

작업 대상 컴포넌트에 대해 아래 항목을 정리한다:

```markdown
## [ComponentName] 요구사항 명세

### 기능 요구사항
- [ ] 지원할 variant 목록과 각 variant의 시각적 차이
- [ ] 지원할 size 목록 (xs, sm, default, lg + responsive:xs/sm/default/lg)
- [ ] 상태별 동작 (hover, focus, active, disabled, loading 등)
- [ ] 합성 가능성 (asChild, Slot 패턴 필요 여부)

### 디자인 스펙
- [ ] 각 size별 높이, 패딩, 폰트 크기, 아이콘 크기
- [ ] 색상·간격·그림자·반경 → design-tokens.md 참조

### 접근성
- [ ] 키보드 네비게이션 동작
- [ ] ARIA 속성 (role, aria-label, aria-expanded 등)
- [ ] 포커스 표시 스타일
- [ ] 스크린 리더 지원

### Responsive 매핑
모든 고정 size에 대응하는 responsive variant를 정의한다.
각 variant는 브레이크포인트별 **고유 중간값**을 갖고, lg에서 목표 고정 size에 도달한다:
- [ ] responsive:xs — 4단계 스케일 → lg에서 고정 xs 도달
- [ ] responsive:sm — 4단계 스케일 → lg에서 고정 sm 도달
- [ ] responsive:default — 4단계 스케일 → lg에서 고정 default 도달
- [ ] responsive:lg — 4단계 스케일 → lg에서 고정 lg 도달
```

## Phase 2: Test — TDD로 테스트 먼저

요구사항 명세 기반으로 테스트를 먼저 작성한다.

- 위치: `src/components/ui/__tests__/[component].test.tsx`
- 프레임워크: Vitest + @testing-library/react

### 커버리지 항목

1. **렌더링** — default props, 각 variant, 각 size, children
2. **Responsive** — `responsive:xs`가 기본값인지, 각 responsive variant별 브레이크포인트 클래스 적용
3. **상호작용** — 클릭, disabled 무시, 키보드 (Enter, Space)
4. **접근성** — ARIA 속성 전달, role, 포커스 관리
5. **스타일** — className 병합(cn), data-slot, data-variant, data-size
6. **합성** — asChild (해당 시), ref 전달

## Phase 3: Implement — Responsive Prop 구현

### Responsive Size 패턴 (Button 레퍼런스)

각 responsive variant는 목표 고정 size를 향해 **고유한 중간값**으로 점진적 스케일업한다.
고정 size 스타일을 그대로 재사용하지 않는다.

```tsx
size: {
  // 고정 size
  xs:        "h-6  px-2  text-xs   gap-1   ...",
  sm:        "h-8  px-3  text-sm   gap-1.5 ...",
  default:   "h-9  px-4  text-sm   gap-2   ...",
  lg:        "h-10 px-6  text-base gap-2   ...",

  // 반응형 size — 브레이크포인트별 고유 중간값, lg에서 목표 고정 size 도달
  //
  //  개념 모델 (고정 size = 1, 2, 3, 4일 때):
  //                    base    sm:     md:     lg: (=목표)
  //  responsive:xs     0.25    0.5     0.75    1
  //  responsive:sm     1.25    1.5     1.75    2
  //  responsive:default 2.25   2.5     2.75    3
  //  responsive:lg     3.25    3.5     3.75    4
  //
  "responsive:xs":
    "[xs↓3 고유값] " +
    "sm:[xs↓2 고유값] " +
    "md:[xs↓1 고유값] " +
    "lg:[고정 xs 스타일]",
  "responsive:sm":
    "[sm↓3 고유값] " +
    "sm:[sm↓2 고유값] " +
    "md:[sm↓1 고유값] " +
    "lg:[고정 sm 스타일]",
  "responsive:default":
    "[default↓3 고유값] " +
    "sm:[default↓2 고유값] " +
    "md:[default↓1 고유값] " +
    "lg:[고정 default 스타일]",
  "responsive:lg":
    "[lg↓3 고유값] " +
    "sm:[lg↓2 고유값] " +
    "md:[lg↓1 고유값] " +
    "lg:[고정 lg 스타일]",
},
defaultVariants: { size: "responsive:xs" }
```

> `↓N` = 목표에서 N단계 아래. 각 브레이크포인트의 구체적 Tailwind 값은 고정 size 간 비율을 기반으로 컴포넌트별로 결정한다.

### 체크리스트

- [ ] 기존 shadcn 코드 구조 유지
- [ ] size variant에 responsive:xs/sm/default/lg 추가, 기본값 `"responsive:xs"`
- [ ] data-size 속성 반영
- [ ] 디자인 토큰만 사용
- [ ] 테스트 통과 확인

## Phase 4: Story — 스토리북 작성

요구사항 + 테스트에서 Use Case를 도출하여 스토리북 작성.

- 위치: `src/components/ui/[component].stories.tsx`
- 포맷: CSF 3.0

### 필수 스토리

1. **Default** — 기본 렌더링 (responsive:xs)
2. **AllVariants** — 모든 variant 나열
3. **AllSizes** — xs, sm, default, lg 나열
4. **ResponsiveXs** — responsive:xs 뷰포트 리사이즈 데모
5. **ResponsiveSm** — responsive:sm 뷰포트 리사이즈 데모
6. **ResponsiveDefault** — responsive:default 뷰포트 리사이즈 데모
7. **ResponsiveLg** — responsive:lg 뷰포트 리사이즈 데모
8. **WithIcon** — 아이콘 포함 (해당 시)
9. **States** — hover, focus, disabled, loading
10. **Playground** — argTypes로 모든 prop 조합
