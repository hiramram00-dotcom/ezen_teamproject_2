const services = ["Apple Music", "Spotify", "YouTube Music"];

// ── 음악연결하기 (Figma 411:5527) ────────────────────────────
// 러닝/지도 화면의 "음악 연결하기" 버튼으로 진입하는 선택 화면.
// 서비스를 고르면 onConnect로 연결 상태가 되어 미니 플레이어가 뜬다.
// 위치 값은 시안 좌표에서 상태바(47px)를 뺀 기준.
export default function MusicConnectPage({
  onClose,
  onConnect,
}: {
  onClose?: () => void;
  onConnect?: () => void;
}) {
  return (
    <div className="relative flex-1 bg-black">
      <button
        type="button"
        className="absolute top-14 right-5.5 grid size-11 place-items-center rounded-full bg-[#34363a]"
        aria-label="닫기"
        onClick={onClose}
      >
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M1 1l12 12M13 1L1 13"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <p className="absolute top-91.25 left-9.25 text-[35px] font-medium leading-[1.2] tracking-[-0.7px] whitespace-nowrap text-white">
        음악 서비스 선택
      </p>

      <div className="absolute top-140.25 left-9.25 flex w-85.5 flex-col gap-3">
        {services.map((s) => (
          <button
            key={s}
            type="button"
            className="rounded-[30px] bg-white py-4.25 text-center text-[20px] font-medium leading-[1.3] tracking-[-0.6px] text-[#131408]"
            onClick={onConnect}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
