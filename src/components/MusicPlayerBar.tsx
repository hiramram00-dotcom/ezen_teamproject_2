import { useState } from "react";
import { useRecordMusic } from "../lib/recordMusic";
import iconNote from "../assets/icons/player-note.svg";
import iconPlay from "../assets/icons/player-play.svg";
import iconNext from "../assets/icons/player-next.svg";

// 컨텍스트(재생 엔진)가 없을 때만 쓰는 목업 곡명 (기록하기 밖에서 단독 렌더될 경우)
const FALLBACK_TITLE = "The Weeknd – Blinding Lights";

type Props = {
  /** 배치용 클래스(absolute 좌표나 margin)를 화면별로 넘긴다 */
  className?: string;
  /** 밝은 지도 위에서는 시안대로 더 투명한 유리(black/30)를 쓴다 */
  onMap?: boolean;
};

// ── 음악 미니 플레이어 (Figma 411:5351 · 411:5408) ──────────
// 음악을 연결하면 "음악 연결하기" 버튼 자리에 뜨는 글래스 바.
// RecordFlow 의 재생 엔진(useRecordMusic)과 연결돼 실제로 동작한다:
// 곡명 = 현재 재생 중인 대표 러닝곡, ▶/⏸ = 실재생 토글, ⏭ = 다음 곡.
// 대표 러닝곡이 없으면 안내 문구를 보여준다. 재생 중에만 곡명이 마퀴로 흐른다.
// position 충돌을 피하려고 내부는 flex로만 배치한다(기본 relative 없음).
export default function MusicPlayerBar({ className = "", onMap = false }: Props) {
  const music = useRecordMusic();
  // 엔진이 없을 때(스토리북식 단독 렌더 대비)만 쓰는 로컬 토글
  const [localPlaying, setLocalPlaying] = useState(false);

  const song = music?.song ?? null;
  // 곡이 없으면 안내 상태 — 재생 아이콘도 ▶(정지 모양)로 보여준다
  const isNotice = music !== null && !song;
  const playing = music ? music.playing && !!song : localPlaying;
  const title = music ? (song ? `${song.artist} – ${song.title}` : "") : FALLBACK_TITLE;

  return (
    <div
      className={`flex h-17 w-89 max-w-[calc(100%-36px)] items-center rounded-[50px] border border-white/12 pr-5.25 pl-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl backdrop-saturate-150 ${
        onMap ? "bg-black/30" : "bg-black/40"
      } ${className}`}
    >
      <span className="grid size-10.5 flex-none place-items-center rounded-full bg-[#34363a]">
        <img className="h-5 w-3.75" src={iconNote} alt="" />
      </span>

      {/* 곡명 영역 — 곡 없음(안내)은 마퀴·복사본 없이 단일 고정 문구,
          곡이 있으면 마퀴(양 끝은 마스크로 자연스럽게 사라짐, 재생 중에만 흐름) */}
      {isNotice ? (
        <div className="ml-3.75 min-w-0 flex-1 overflow-hidden">
          <span className="block truncate text-[13px] font-medium text-white/60">
            대표 러닝곡을 추가해주세요
          </span>
        </div>
      ) : (
        <div className="ml-3.75 min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,black_6%,black_78%,transparent_100%)]">
          <div
            className={`animate-music-marquee flex w-max ${
              playing ? "" : "[animation-play-state:paused]"
            }`}
          >
            <span className="pr-12 text-[13px] font-medium whitespace-nowrap text-white/85">
              {title}
            </span>
            <span
              className="pr-12 text-[13px] font-medium whitespace-nowrap text-white/85"
              aria-hidden
            >
              {title}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-none items-center gap-5.75">
        <button
          type="button"
          aria-label={playing ? "일시정지" : "재생"}
          onClick={() => (music ? music.toggle() : setLocalPlaying((p) => !p))}
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
        <button type="button" aria-label="다음 곡" onClick={() => music?.next()}>
          <img className="h-4 w-5" src={iconNext} alt="" />
        </button>
      </div>
    </div>
  );
}
