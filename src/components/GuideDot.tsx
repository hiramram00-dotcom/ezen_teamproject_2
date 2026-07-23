import { createContext, useContext, type CSSProperties, type ReactNode } from "react";

// 화면 밖 "GUIDE" 토글(PhoneFrame의 desktop-guide__switch)로 앱 전체를 한꺼번에
// 켜고 끌 수 있게 하는 컨텍스트. 클릭 가능한 요소 옆에 <GuideDot /> 하나만 추가하면
// 토글 상태를 알아서 따라간다(각 컴포넌트가 prop을 직접 받을 필요 없음).
const GuideDotContext = createContext(false);

export function GuideDotProvider({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  return <GuideDotContext.Provider value={enabled}>{children}</GuideDotContext.Provider>;
}

export function useGuideDotEnabled() {
  return useContext(GuideDotContext);
}

type GuideDotVariant = "card" | "cardTight" | "cardOutside" | "tight";

// card: 카드형 요소 — 표면 위쪽에서 16px, 오른쪽에서 16px 띄운 위치.
// cardTight: 카드형 요소지만 더 안쪽으로 — 위에서 6px, 오른쪽에서 6px.
// cardOutside: 카드 테두리 바깥쪽 모서리에 걸치는 위치.
// tight: 버튼/아이콘 버튼 — 안쪽 텍스트·아이콘에 붙는 우상단 코너.
//
// 미세조정 팁: 아래 top-[Npx] / right-[Npx]의 숫자만 바꾸면 1px 단위로 움직입니다.
// (Tailwind의 -top-1, -right-0.5 같은 숫자 클래스는 1px이 아니라 약 4px 단위로 건너뛰어서
// 조금만 옮기려 해도 크게 움직이는 것처럼 보입니다 — 그래서 여기는 전부 [Npx] 표기로 통일.)
// top은 커질수록 아래로, right는 커질수록 왼쪽으로 이동합니다.
const variantClass: Record<GuideDotVariant, string> = {
  card: "absolute top-[16px] right-[16px]",
  cardTight: "absolute top-[8px] right-[8px]",
  cardOutside: "absolute -top-[2px] -right-[0.5px]",
  tight: "absolute -top-[2px] -right-[2px]",
};

/**
 * 클릭 가능한 요소(button/link/card/icon button)의 우측 상단에 표시하는
 * 4x4px 오렌지 가이드 점. 감싸는 요소는 position:relative(또는 이미 absolute
 * 컨텍스트인 카드)여야 위치가 올바르게 잡힌다. 레이아웃에 자리를 차지하지
 * 않도록 absolute + pointer-events-none.
 * style은 개별 버튼 단위로 위치를 미세 조정(예: ±2px)할 때만 사용 — 인라인
 * style이 항상 우선 적용되므로 Tailwind 클래스 충돌 걱정 없이 덮어쓸 수 있다.
 */
export default function GuideDot({
  variant = "tight",
  className = "",
  style,
}: {
  variant?: GuideDotVariant;
  className?: string;
  style?: CSSProperties;
}) {
  const enabled = useGuideDotEnabled();
  if (!enabled) return null;

  return (
    <span
      aria-hidden
      style={style}
      className={`pointer-events-none block size-1 rounded-full bg-[var(--primary-orange)] ${variantClass[variant]} ${className}`}
    />
  );
}
