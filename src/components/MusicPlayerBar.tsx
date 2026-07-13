import { useState } from "react";
import iconNote from "../assets/icons/player-note.svg";
import iconPlay from "../assets/icons/player-play.svg";
import iconNext from "../assets/icons/player-next.svg";

const TRACK_TITLE = "The Weeknd – Blinding Lights";

type Props = {
  /** 배치용 클래스(absolute 좌표나 margin)를 화면별로 넘긴다 */
  className?: string;
  /** 밝은 지도 위에서는 시안대로 더 투명한 유리(black/30)를 쓴다 */
  onMap?: boolean;
};

// ── 음악 미니 플레이어 (Figma 411:5351 · 411:5408) ──────────
// 음악 서비스를 연결하면 "음악 연결하기" 버튼 자리에 뜨는 글래스 바.
// 재생(▶)을 누르면 일시정지(⏸)로 바뀌고, 재생 중에만 곡명이
// 마퀴로 흐른다(멈추면 그 자리에서 정지).
// position 충돌을 피하려고 내부는 flex로만 배치한다(기본 relative 없음).
export default function MusicPlayerBar({ className = "", onMap = false }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={`flex h-17 w-89 max-w-[calc(100%-36px)] items-center rounded-[50px] border border-white/12 pr-5.25 pl-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl backdrop-saturate-150 ${
        onMap ? "bg-black/30" : "bg-black/40"
      } ${className}`}
    >
      <span className="grid size-10.5 flex-none place-items-center rounded-full bg-[#34363a]">
        <img className="h-5 w-3.75" src={iconNote} alt="" />
      </span>

      {/* 곡명 마퀴: 양 끝은 마스크로 자연스럽게 사라진다 */}
      <div className="ml-3.75 min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,black_6%,black_78%,transparent_100%)]">
        <div
          className={`animate-music-marquee flex w-max ${
            playing ? "" : "[animation-play-state:paused]"
          }`}
        >
          <span className="pr-12 text-[13px] font-medium whitespace-nowrap text-white/85">
            {TRACK_TITLE}
          </span>
          <span
            className="pr-12 text-[13px] font-medium whitespace-nowrap text-white/85"
            aria-hidden
          >
            {TRACK_TITLE}
          </span>
        </div>
      </div>

      <div className="flex flex-none items-center gap-5.75">
        <button
          type="button"
          aria-label={playing ? "일시정지" : "재생"}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? (
            <svg width={16} height={27} viewBox="0 0 16 27" fill="none" aria-hidden>
              <rect x="0" y="0" width="5.5" height="27" rx="1.5" fill="#fff" />
              <rect x="10.5" y="0" width="5.5" height="27" rx="1.5" fill="#fff" />
            </svg>
          ) : (
            <img className="h-6.75 w-4.5" src={iconPlay} alt="" />
          )}
        </button>
        <button type="button" aria-label="다음 곡">
          <img className="h-4 w-5" src={iconNext} alt="" />
        </button>
      </div>
    </div>
  );
}
