// 기록하기 음악 재생 컨텍스트 — RecordFlow 가 재생 엔진(현재 곡·재생 상태)을
// 만들어 공급하고, 하위 화면들의 MusicPlayerBar 가 이걸 소비해 실제 재생을 제어한다.
// (연결 여부 자체는 App 이 들고 있어 기록 탭을 나갔다 와도 유지 — 새로고침 시 초기화)
import { createContext, useContext } from "react";
import type { Song } from "./musicApi";

export type RecordMusic = {
  /** 현재 곡 — 대표 러닝곡이 하나도 없으면 null (플레이어에 안내 문구 표시) */
  song: Song | null;
  playing: boolean;
  /** ▶/⏸ — 다시 재생하면 현재 곡 처음부터 */
  toggle: () => void;
  /** ⏭ 다음 곡 (마지막 곡이면 첫 곡으로) */
  next: () => void;
};

export const RecordMusicContext = createContext<RecordMusic | null>(null);

/** 기록하기 하위 화면(MusicPlayerBar 등)에서 재생 엔진 접근 */
export function useRecordMusic(): RecordMusic | null {
  return useContext(RecordMusicContext);
}
