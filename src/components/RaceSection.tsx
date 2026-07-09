import { raceFilters, races } from "../data";
import chevronRight from "../assets/icons/chevron-right.svg";
import "./RaceSection.css";

export default function RaceSection() {
  return (
    <section className="race">
      <div className="race__head">
        <h2 className="race__title">대회 소식</h2>
        <div className="race__filters no-scrollbar">
          {raceFilters.map((f, i) => (
            <button
              key={f}
              type="button"
              className={`pill${i === 0 ? " pill--active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="race__row no-scrollbar">
        {races.map((r) => (
          <article key={r.title} className="race-card">
            <img
              className={`race-card__bg${r.bright ? " race-card__bg--bright" : ""}`}
              src={r.image}
              alt=""
              style={r.imageBox}
            />
            <div className="race-card__scrim" />
            <div className="race-card__body">
              <p className="race-card__dday">{r.dday}</p>
              <p className="race-card__name">{r.title}</p>
              <div className="race-card__meta">
                <span>{r.datetime}</span>
                <img className="race-card__arrow" src={chevronRight} alt="" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
