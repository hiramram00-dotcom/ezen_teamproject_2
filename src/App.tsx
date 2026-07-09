import { useEffect } from "react";
import { initDragScroll } from "./dragScroll";
import { AppHeader } from "./components/TopBars";
import HeroSection from "./components/HeroSection";
import CourseSection from "./components/CourseSection";
import RunnerSection from "./components/RunnerSection";
import ScheduleSection from "./components/ScheduleSection";
import RaceSection from "./components/RaceSection";
import ChallengeSection from "./components/ChallengeSection";
import MagazineSection from "./components/MagazineSection";
import BottomNav from "./components/BottomNav";
import "./App.css";

export default function App() {
  // Make every horizontal carousel draggable with the mouse (finger-swipe feel).
  useEffect(() => initDragScroll(), []);

  return (
    <div className="phone">
      <AppHeader />

      <main className="home">
        <HeroSection />
        <CourseSection />
        <RunnerSection />
        <ScheduleSection />
        <RaceSection />
        <ChallengeSection />
        <MagazineSection />
      </main>

      <BottomNav />
    </div>
  );
}
