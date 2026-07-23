// 온보딩 완료 직후 최초 진입 시 뜨는 위치 "프리퍼미션" 안내 카드 (패턴 C · 가운데 카드).
// OS 권한 팝업(허용/거부)은 iOS·안드로이드가 직접 그리는 영역이라 우리가 디자인하지 않는다.
// 대신 "왜 위치가 필요한지" 우리 브랜드 톤으로 먼저 안내한다. 일반 웹 브라우저에서는
// [허용하기]를 눌러도 데모 위치로 진행하고, 설치형 PWA에서만 실제 geolocation을 요청한다.
// [건너뛰기]는 실제 API를 아예 호출하지 않는다.
import GuideDot from "./GuideDot";

export default function LocationPermissionDialog({
  onAllow,
  onDeny,
}: {
  onAllow: () => void;
  onDeny: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 px-[var(--gutter)]">
      <div className="w-full max-w-[300px] rounded-[18px] bg-[var(--bg-elevated)] px-5 pb-5 pt-6 text-center">
        <div className="flex flex-col items-center gap-3">
          {/* 위치 아이콘 */}
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--bg-app)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[var(--primary-lime)]" aria-hidden>
              <path
                d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </span>

          <p className="subtitle-1 text-white">위치 접근이 필요해요</p>
          <p className="body-2 text-[#8a8a8a]">
            러닝 코스 추천과 기록 저장을 위해
            <br />
            위치 정보를 사용해요
          </p>

          <button
            type="button"
            onClick={onAllow}
            className="btn-text relative mt-2 w-full rounded-[13px] bg-[var(--primary-lime)] py-3 text-[var(--bg-app)]"
          >
            <span className="relative inline-block">
              허용하기
              {/* 버튼 폭이 아니라 글씨 자체를 기준으로 위치를 잡아서, 화면 폭이 줄어들어도
                  글씨 옆에 붙어있는다. 이 점만 따로 미세조정하려면 여기 top/right 숫자만 바꾸세요. */}
              <GuideDot style={{ top: "-2px", right: "-8px" }} />
            </span>
          </button>
          <button type="button" onClick={onDeny} className="body-2 relative py-1 text-[#8a8a8a]">
            건너뛰기
            <GuideDot style={{ top: "-2px", right: "-8px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
