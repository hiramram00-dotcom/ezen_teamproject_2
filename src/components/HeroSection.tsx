import { heroData } from "../data";
import route from "../assets/icons/route.svg";
import GuideDot from "./GuideDot";
import "./HeroSection.css";

export default function HeroSection({
  onStartRecord,
  image = heroData.image,
}: {
  onStartRecord?: () => void;
  image?: string;
}) {
  const isSharedCard = image !== heroData.image;

  return (
    <section className="hero">
      <div className="hero__card">
        <img className="hero__bg" src={image} alt="" />
        {!isSharedCard && (
          <>
            <div className="hero__tint" />
            <div className="hero__scrim" />
            <img className="hero__route" src={route} alt="" />

            <div className="hero__head">
              <h1 className="hero__title">{heroData.title}</h1>
              <p className="hero__meta">{heroData.meta}</p>
            </div>

            <ul className="hero__stats">
              {heroData.stats.map((s) => (
                <li key={s.label} className="hero__stat">
                  <span className="hero__stat-label">{s.label}</span>
                  <span className="hero__stat-value">{s.value}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <button className="relative hero__cta" type="button" onClick={onStartRecord}>
        오늘 기록 시작하기
        {/* 이 버튼만 따로 미세조정하려면 여기 top/right 숫자만 바꾸세요 (1px 단위, 다른 버튼엔 영향 없음). */}
        <GuideDot style={{ top: "-2px", right: "-2px" }} />
      </button>
    </section>
  );
}
