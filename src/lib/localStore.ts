// 사용자가 만든 콘텐츠를 브라우저 localStorage 에 저장/복원하기 위한 공용 헬퍼.
// 서버가 없는 프로토타입이라 "내가 만든 기록이 새로고침해도 남아 있는" 느낌만
// 로컬에서 재현한다. 용량(≈5MB)이 한정돼 있어 저장 시 몇 가지 규칙을 지킨다.

/** blob: URL(직접 올린 사진)은 새로고침하면 무효화되므로 저장 대상에서 제외한다. */
export const isBlobUrl = (src?: string): boolean => !!src && src.startsWith("blob:");

/** localStorage 에서 JSON 을 읽어 파싱한다. 없거나 깨졌으면 fallback. */
export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** localStorage 에 JSON 을 저장한다. 용량 초과 등 실패해도 앱은 계속 동작한다
 *  (세션 메모리엔 그대로 남아 있으므로 화면은 정상). */
export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 저장 실패는 조용히 무시 — 현재 세션 표시에는 영향 없음.
  }
}

/**
 * 이미지 src 를 지정한 최대 변(px) 안으로 축소해 JPEG dataURL 로 반환한다.
 * 러닝 기록 카드(1080px)를 로컬 저장용으로 가볍게 만드는 용도.
 * 이미 더 작으면 그대로 두고, 로드/인코딩 실패 시 원본 src 를 반환한다.
 */
export function downscaleDataUrl(src: string, maxSize = 640, quality = 0.8): Promise<string> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const longest = Math.max(image.naturalWidth, image.naturalHeight);
      const scale = Math.min(1, maxSize / longest);
      const width = Math.round(image.naturalWidth * scale);
      const height = Math.round(image.naturalHeight * scale);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(src);
      ctx.drawImage(image, 0, 0, width, height);
      try {
        resolve(canvas.toDataURL("image/jpeg", quality));
      } catch {
        resolve(src);
      }
    };
    image.onerror = () => resolve(src);
    image.src = src;
  });
}
