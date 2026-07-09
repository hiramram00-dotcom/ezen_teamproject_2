import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarDays, FileText, Home, MapPin, Play, Running, User } from 'lucide-react';
import './styles.css';

function StatCard({ label, value, description }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{description}</p>
    </article>
  );
}

function EventCard({ tag, title, meta }) {
  return (
    <article className="event-card">
      <div>
        <span className="tag">{tag}</span>
        <h3>{title}</h3>
        <p>{meta}</p>
      </div>
      <button type="button" aria-label={`${title} 상세 보기`}>
        <Play size={18} fill="currentColor" />
      </button>
    </article>
  );
}

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      <a className="active" href="#">
        <Home size={23} fill="currentColor" />
        <span>홈</span>
      </a>
      <a href="#">
        <FileText size={23} />
        <span>피드</span>
      </a>
      <a href="#">
        <Running size={24} />
        <span>기록</span>
      </a>
      <a href="#">
        <User size={23} />
        <span>마이페이지</span>
      </a>
    </nav>
  );
}

function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-top">
          <p>오늘의 러닝</p>
          <button type="button" aria-label="주변 러닝 장소 보기">
            <MapPin size={20} />
          </button>
        </div>
        <h1>가볍게 뛰고<br />기록은 선명하게</h1>
        <p className="hero-copy">챌린지, 대회 소식, 러닝 기록을 한 곳에서 확인해요.</p>
        <button className="primary-button" type="button">
          <Running size={20} />
          러닝 시작하기
        </button>
      </section>

      <section className="stats-grid" aria-label="오늘의 요약">
        <StatCard label="이번 주" value="12.4km" description="목표까지 7.6km" />
        <StatCard label="참여 중" value="3개" description="챌린지 진행" />
        <StatCard label="다가오는" value="D-3" description="한강 마라톤" />
      </section>

      <section className="section-block">
        <div className="section-title">
          <h2>추천 챌린지</h2>
          <a href="#">전체보기</a>
        </div>
        <EventCard tag="GPS 아트런" title="경복궁 댕댕런" meta="7.7km · 지도에 강아지 모양 만들기" />
        <EventCard tag="습관 만들기" title="30일 러닝 루틴" meta="매일 20분 · 꾸준히 달리기" />
      </section>

      <section className="section-block">
        <div className="section-title">
          <h2>대회 소식</h2>
          <a href="#">전체보기</a>
        </div>
        <article className="marathon-card">
          <span className="tag">서울</span>
          <h3>한강 마라톤</h3>
          <p><CalendarDays size={15} /> 2026.07.25 · 여의도 한강공원</p>
        </article>
      </section>

      <BottomNav />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
