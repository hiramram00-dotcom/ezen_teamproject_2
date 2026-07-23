// 피드 인터랙션(좋아요·내 댓글·응원·스토리 열람)을 localStorage 에 저장/복원한다.
// 서버가 없어 각 브라우저 안에서만 유지되며, "진짜 앱처럼 상태가 남는" 느낌을 낸다.
// 각 값은 하나의 맵/배열로 묶어 저장한다(게시물 수만큼 키가 늘어나지 않도록).
import { readJSON, writeJSON } from "./localStore";

const LIKES_KEY = "wrun-feed-likes";
const COMMENTS_KEY = "wrun-feed-comments";
const CHEERS_KEY = "wrun-feed-cheers";
const VIEWED_STORIES_KEY = "wrun-viewed-stories";

// ── 좋아요: { [postId]: true } — 취소하면 항목을 지워 용량을 아낀다 ──
export function isPostLiked(postId: number): boolean {
  return readJSON<Record<string, boolean>>(LIKES_KEY, {})[postId] === true;
}
export function savePostLiked(postId: number, liked: boolean): void {
  const map = readJSON<Record<string, boolean>>(LIKES_KEY, {});
  if (liked) map[postId] = true;
  else delete map[postId];
  writeJSON(LIKES_KEY, map);
}

// ── 내가 단 댓글: { [postId]: string[] } — 비면 항목 삭제 ──
export function getPostComments(postId: number): string[] {
  return readJSON<Record<string, string[]>>(COMMENTS_KEY, {})[postId] ?? [];
}
export function savePostComments(postId: number, comments: string[]): void {
  const map = readJSON<Record<string, string[]>>(COMMENTS_KEY, {});
  if (comments.length) map[postId] = comments;
  else delete map[postId];
  writeJSON(COMMENTS_KEY, map);
}

// ── 응원한 크루 / 확인한 스토리: 이름 배열 ⇄ Set ──
export function getCheeredCrews(): string[] {
  return readJSON<string[]>(CHEERS_KEY, []);
}
export function saveCheeredCrews(names: Set<string>): void {
  writeJSON(CHEERS_KEY, [...names]);
}
export function getViewedStories(): string[] {
  return readJSON<string[]>(VIEWED_STORIES_KEY, []);
}
export function saveViewedStories(names: Set<string>): void {
  writeJSON(VIEWED_STORIES_KEY, [...names]);
}
