import SectionHeader from "./SectionHeader";
import { courses } from "../data";
import "./CourseSection.css";

export default function CourseSection() {
  return (
    <section className="courses">
      <SectionHeader title="이번주 추천코스" />
      <div className="courses__row no-scrollbar">
        {courses.map((c) => (
          <article key={c.name} className="course-card">
            <div className="course-card__img">
              <img src={c.image} alt={c.name} />
            </div>
            <div className="course-card__body">
              <p className="course-card__title">
                {c.name} <span className="course-card__rating">★ {c.rating}</span>
              </p>
              <p className="course-card__detail">{c.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
