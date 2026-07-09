import SectionHeader from "./SectionHeader";
import { scheduleData } from "../data";
import "./ScheduleSection.css";

export default function ScheduleSection() {
  return (
    <section className="schedule">
      <SectionHeader title="내 일정" action="더보기" />
      <div className="schedule__card">
        <img className="schedule__bg" src={scheduleData.image} alt="" />
        <div className="schedule__scrim" />
        <div className="schedule__body">
          <p className="schedule__title">{scheduleData.title}</p>
          <div className="schedule__meta">
            <span>{scheduleData.date}</span>
            <span>{scheduleData.time}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
