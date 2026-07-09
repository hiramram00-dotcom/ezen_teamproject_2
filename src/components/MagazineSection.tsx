import SectionHeader from "./SectionHeader";
import { articles } from "../data";
import "./MagazineSection.css";

export default function MagazineSection() {
  return (
    <section className="magazine">
      <SectionHeader title="매거진" />
      <div className="magazine__row no-scrollbar">
        {articles.map((a) => (
          <article key={a.title.join("")} className="article-card">
            <img className="article-card__bg" src={a.image} alt="" style={a.imageBox} />
            <div className="article-card__scrim" />
            <div className="article-card__body">
              <h3 className="article-card__title">
                {a.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <p className="article-card__preview">
                {a.preview.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
