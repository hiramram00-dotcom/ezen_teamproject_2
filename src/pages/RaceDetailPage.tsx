import { StatusBar } from "../components/TopBars";
import raceHero from "../assets/img/race1.png";
import "./RaceDetailPage.css";

type Props = {
  onBack: () => void;
};

const infoCards = [
  { label: "접수 마감", value: "2026.07.22", note: "선착순 5,000명" },
  { label: "대회 장소", value: "여의도 한강공원", note: "이벤트 광장 집결" },
  { label: "코스", value: "5K · 10K · Half", note: "초보 러너도 참여 가능" },
  { label: "참가비", value: "30,000원부터", note: "기념 티셔츠 포함" },
];

const timeline = [
  { time: "17:00", title: "참가자 체크인", desc: "배번호 수령, 물품 보관, 현장 안내 확인", active: true },
  { time: "18:00", title: "10K · Half 출발", desc: "페이스 그룹별 순차 출발" },
  { time: "18:20", title: "5K 출발", desc: "초보 러너와 동반 참가자 추천 코스" },
  { time: "20:30", title: "기록 확인", desc: "완주 메달과 굿즈 수령 후 포토존 이용" },
];

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 5L8 12L15 19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="19" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 11L16 6M8 13L16 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function RouteMiniMap() {
  return (
    <svg className="race-detail-route__map" width="72" height="72" viewBox="0 0 80 80" fill="none" aria-hidden>
      <rect width="80" height="80" rx="18" fill="#1D1D1D" />
      <path
        d="M17 51C26 42 30 57 39 46C46 37 49 28 62 23"
        stroke="#D4FF3F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <circle cx="17" cy="51" r="3.5" fill="#D4FF3F" />
      <circle cx="62" cy="23" r="4" fill="#D4FF3F" stroke="#F6F6ED" strokeWidth="2" />
    </svg>
  );
}

export default function RaceDetailPage({ onBack }: Props) {
  return (
    <div className="phone race-detail-page">
      <StatusBar />
      <header className="race-detail-header">
        <button type="button" onClick={onBack} aria-label="뒤로가기">
          <BackIcon />
        </button>
        <h1>대회 소식</h1>
        <button type="button" aria-label="공유하기">
          <ShareIcon />
        </button>
      </header>

      <main className="race-detail-content">
        <section className="race-detail-hero">
          <img src={raceHero} alt="" />
          <div className="race-detail-hero__inner">
            <span className="race-detail-region">서울</span>
            <div className="race-detail-hero__copy">
              <p className="race-detail-dday">D-3</p>
              <h2>한강 마라톤</h2>
              <p>2026-07-25(토) 18:00 · 여의도 한강공원</p>
              <div className="race-detail-dots" aria-hidden>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </section>

        <section className="race-detail-info-grid">
          {infoCards.map((card) => (
            <article className="race-detail-info" key={card.label}>
              <p>{card.label}</p>
              <strong>{card.value}</strong>
              <span>{card.note}</span>
            </article>
          ))}
        </section>

        <section className="race-detail-section">
          <h2>일정과 코스</h2>
          <p className="race-detail-section__desc">
            한강을 따라 가볍게 출발하고, 야경이 켜지는 시간에 완주하는 저녁 러닝 코스예요.
          </p>
          <div className="race-detail-timeline">
            {timeline.map((item) => (
              <div className="race-detail-timeline__row" key={item.time}>
                <time className={item.active ? "race-detail-timeline__time--active" : ""}>{item.time}</time>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="race-detail-route">
          <div>
            <h2>코스 안내</h2>
            <p>
              여의도 이벤트 광장에서 출발해 한강공원 산책로를 따라 반환하는 평지 중심 코스입니다.
              급격한 오르막이 적어서 첫 대회 참가자도 부담 없이 달릴 수 있어요.
            </p>
          </div>
          <RouteMiniMap />
        </section>

        <p className="race-detail-note">기록칩 · 완주 메달 · 물품보관 · 현장 포토존 제공</p>

        <button className="race-detail-cta" type="button">
          참가하기
        </button>
      </main>

    </div>
  );
}
