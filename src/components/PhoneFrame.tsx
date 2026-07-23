import { useState, type ReactNode } from "react";
import { StatusBar } from "./TopBars";
import { GuideDotProvider } from "./GuideDot";

type TrackPoint = { x: number; y: number };
type TrackCubic = [TrackPoint, TrackPoint, TrackPoint, TrackPoint];

const trackCubics: TrackCubic[] = [
  [
    { x: -190, y: 1140 },
    { x: 270, y: 980 },
    { x: 255, y: 765 },
    { x: 480, y: 630 },
  ],
  [
    { x: 480, y: 630 },
    { x: 685, y: 505 },
    { x: 815, y: 515 },
    { x: 1000, y: 350 },
  ],
  [
    { x: 1000, y: 350 },
    { x: 1195, y: 176 },
    { x: 1260, y: 76 },
    { x: 1790, y: -145 },
  ],
];

const trackCenterPath =
  "M -190 1140 C 270 980 255 765 480 630 C 685 505 815 515 1000 350 C 1195 176 1260 76 1790 -145";

function cubicPoint([start, control1, control2, end]: TrackCubic, t: number): TrackPoint {
  const inverse = 1 - t;
  const inverseSquared = inverse * inverse;
  const tSquared = t * t;

  return {
    x:
      inverseSquared * inverse * start.x +
      3 * inverseSquared * t * control1.x +
      3 * inverse * tSquared * control2.x +
      tSquared * t * end.x,
    y:
      inverseSquared * inverse * start.y +
      3 * inverseSquared * t * control1.y +
      3 * inverse * tSquared * control2.y +
      tSquared * t * end.y,
  };
}

function buildParallelTrackPath(offset: number) {
  const points = trackCubics.flatMap((curve, curveIndex) =>
    Array.from({ length: 49 }, (_, index) => cubicPoint(curve, index / 48)).filter(
      (_, index) => curveIndex === 0 || index > 0,
    ),
  );

  return points
    .map((point, index) => {
      const previous = points[Math.max(0, index - 1)];
      const next = points[Math.min(points.length - 1, index + 1)];
      const tangentX = next.x - previous.x;
      const tangentY = next.y - previous.y;
      const tangentLength = Math.hypot(tangentX, tangentY) || 1;
      const offsetX = (-tangentY / tangentLength) * offset;
      const offsetY = (tangentX / tangentLength) * offset;
      const command = index === 0 ? "M" : "L";

      return `${command} ${(point.x + offsetX).toFixed(2)} ${(point.y + offsetY).toFixed(2)}`;
    })
    .join(" ");
}

const trackLanePaths = [-132, -66, 0, 66, 132].map(buildParallelTrackPath);

/**
 * 폰 목업 프레임.
 * - 데스크톱(≥768px): 가운데 정렬된 베젤 프레임 + 내부 스크롤로 "폰 안의 앱"처럼 보임.
 * - 모바일(≤767px): 베젤 없이 풀스크린.
 * 스타일은 App.css 의 .phone-frame / .phone-scroll / .frame-statusbar 참고.
 * 모든 화면(온보딩·홈·기록·챗봇 등)을 이 컴포넌트 하나로 감싸 프레임을 통일한다.
 *
 * 상태바(10:36) 목업은 여기서 "딱 한 번" 오버레이로 그린다(각 페이지는 안 그림).
 * - 자리를 차지하지 않는 absolute 오버레이라, 몰입 화면(기록·카운트다운)의
 *   배경색이 상태바 영역까지 꽉 찬다(밀림 현상 해결).
 * - mix-blend-difference 로 밝은/어두운 배경 모두에서 자동 대비.
 * - 데스크톱 프레임에서만 보임(실제 모바일엔 OS 상태바가 있으므로 숨김).
 */
export default function PhoneFrame({
  children,
  statusBar = "solid",
  className = "",
}: {
  children: ReactNode;
  /** solid = 불투명 배경(메인·연결 페이지, 스크롤 시 콘텐츠 가려짐)
   *  clear = 투명(기록·온보딩 몰입 화면, 배경이 상단까지 꽉 참) */
  statusBar?: "solid" | "clear";
  className?: string;
}) {
  const [guideEnabled, setGuideEnabled] = useState(true);

  return (
    <div className="desktop-stage">
      <div className="desktop-track" aria-hidden="true">
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="track-surface" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#18191b" />
              <stop offset="0.52" stopColor="#242629" />
              <stop offset="1" stopColor="#191a1c" />
            </linearGradient>
            <linearGradient id="track-highlight" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#d4ff3f" stopOpacity="0" />
              <stop offset="0.48" stopColor="#d4ff3f" stopOpacity="0.5" />
              <stop offset="1" stopColor="#d4ff3f" stopOpacity="0" />
            </linearGradient>
            <filter id="track-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          <path
            className="desktop-track__surface"
            d={trackCenterPath}
            stroke="url(#track-surface)"
            strokeWidth="390"
          />
          <path
            className="desktop-track__edge"
            d={trackCenterPath}
            strokeWidth="392"
          />
          {trackLanePaths.map((lanePath, index) => (
            <path
              key={index}
              className="desktop-track__lane"
              d={lanePath}
            />
          ))}
          <path
            className="desktop-track__lime-glow"
            d={trackCenterPath}
            stroke="url(#track-highlight)"
            filter="url(#track-glow)"
          />
          <path
            className="desktop-track__lime"
            d={trackCenterPath}
            stroke="url(#track-highlight)"
          />
        </svg>
      </div>

      <section className="desktop-brand" aria-label="W:RUN brand message">
        <p className="desktop-brand__eyebrow">RUNNING COMMUNITY</p>
        <p className="desktop-brand__title">WE RUN.</p>
        <p className="desktop-brand__question">YOU IN?</p>
        <div className="desktop-brand__marker" aria-hidden="true">
          <span>START</span>
        </div>
        <div className="desktop-guide">
          <div className="desktop-guide__copy">
            <span>GUIDE</span>
            <strong>{guideEnabled ? "ON" : "OFF"}</strong>
          </div>
          <button
            type="button"
            className="desktop-guide__switch"
            role="switch"
            aria-checked={guideEnabled}
            aria-label="앱 사용 가이드 표시"
            onClick={() => setGuideEnabled((enabled) => !enabled)}
          >
            <span className="desktop-guide__thumb" />
          </button>
        </div>
      </section>

      <aside className="desktop-crew" aria-label="W:RUN team members">
        <p className="desktop-crew__eyebrow">W:RUN CREW</p>
        <h2>PACEMAKERS</h2>
        <div className="desktop-crew__rule" aria-hidden="true" />
        <ol>
          <li><span>01</span><strong>이가람</strong></li>
          <li><span>02</span><strong>김종욱</strong></li>
          <li><span>03</span><strong>박지현</strong></li>
          <li><span>04</span><strong>권나현</strong></li>
          <li><span>05</span><strong>김가영</strong></li>
          <li><span>06</span><strong>유수민</strong></li>
        </ol>
        <p className="desktop-crew__closing">WE RUN TOGETHER.</p>
      </aside>

      <div className={`phone-frame ${className}`}>
        <div
          className={`frame-statusbar${statusBar === "solid" ? " frame-statusbar--solid" : ""}`}
          aria-hidden
        >
          <StatusBar />
        </div>
        <div className="phone-scroll">
          <GuideDotProvider enabled={guideEnabled}>{children}</GuideDotProvider>
        </div>
      </div>
    </div>
  );
}
