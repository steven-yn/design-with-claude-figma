# 컴포넌트 컨벤션

## 기본 구조

- 위치: `src/components/ui/`
- shadcn/ui 원본 구조 유지 — `cva` + `cn()` 패턴
- `data-slot` 속성으로 서브 컴포넌트 식별

## Size 체계

### 고정 Size

shadcn/ui 표준 size variant를 그대로 유지한다:

| Size | 용도 |
|------|------|
| `xs` | 밀집 UI (테이블 셀, 태그, 인라인 액션) |
| `sm` | 보조 액션, 사이드바 |
| `default` | 일반적인 폼 요소, 주요 액션 |
| `lg` | 히어로 CTA, 강조 버튼 |

각 size는 **높이 → 패딩 → 폰트 → gap → 아이콘** 순서로 일정 비율(≈1.25배)씩 스케일한다:

```
xs:      h-6   px-2   text-xs   gap-1    icon-3
sm:      h-8   px-3   text-sm   gap-1.5  icon-4
default: h-9   px-4   text-sm   gap-2    icon-4
lg:      h-10  px-6   text-base gap-2    icon-4
```

> 컴포넌트마다 세부 값은 달라질 수 있지만, 스케일 비율은 위 표를 기준으로 한다.

### Responsive Size

모든 고정 size에는 대응하는 responsive variant가 **반드시** 존재한다.

네이밍 규칙: `"responsive:{고정size}"` — 고정 size와 1:1 매핑

#### 핵심 원칙

`responsive:{size}`는 대응하는 고정 size를 **목표값**으로 갖는다.
`lg` 브레이크포인트에서 목표 고정 size에 도달하며, 더 작은 브레이크포인트에서는 **고유한 중간값**으로 점진적 스케일업한다.

> 고정 size를 그대로 재사용하는 것이 **아니다**. 각 responsive variant는 브레이크포인트마다 고유한 스타일 값을 갖는다.

#### 개념 모델

고정 size가 1, 2, 3, 4일 때, responsive는 다음과 같이 세분화된 스케일을 갖는다:

```
고정 size:          xs=1       sm=2       default=3  lg=4

                    base       sm:        md:        lg: (=목표)
responsive:xs       0.25       0.5        0.75       1
responsive:sm       1.25       1.5        1.75       2
responsive:default  2.25       2.5        2.75       3
responsive:lg       3.25       3.5        3.75       4
```

- 각 responsive variant는 4개의 **고유한** 값을 갖는다 (고정 size 재사용 아님)
- `lg` 브레이크포인트에서만 대응하는 고정 size 값에 도달한다
- 전체 스케일이 연속적이다: responsive:xs(lg) < responsive:sm(base)

#### 속성

- **기본값**: `"responsive:xs"` — 모바일 퍼스트로 가장 작은 스케일에서 시작
- cva `defaultVariants`와 컴포넌트 함수 파라미터 모두 `"responsive:xs"` 기본값
- `data-size` 속성에 현재 size 값 반영

#### 사용 가이드

| 상황 | 추천 size |
|------|-----------|
| 일반 페이지 버튼, 카드 내부 액션 | `responsive:xs` (기본값) |
| 폼 요소, 사이드바 메뉴 | `responsive:sm` |
| 대시보드 메인 액션, 헤더 CTA | `responsive:default` |
| 항상 큰 사이즈 유지 (반응형) | `responsive:lg` |
| 고정 크기가 필요한 경우 | `xs`, `sm`, `default`, `lg` |

## 스타일 규칙

- Tailwind 유틸리티 클래스 사용 (임의값 `[...]` 지양)
- 색상은 시맨틱 토큰만 사용 (`.claude/rules/design-tokens.md` 참조)
- `cn()` 유틸리티로 className 병합
