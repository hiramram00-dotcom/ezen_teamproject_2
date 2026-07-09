import navHome from "../assets/icons/nav-home.svg";
import navFeed from "../assets/icons/nav-feed.svg";
import navRecord from "../assets/icons/nav-record.svg";
import navUser from "../assets/icons/nav-user.svg";
import "./BottomNav.css";

const tabs = [
  { key: "home", label: "홈", icon: navHome },
  { key: "feed", label: "피드", icon: navFeed },
  { key: "record", label: "기록", icon: navRecord },
  { key: "my", label: "마이페이지", icon: navUser },
];

export default function BottomNav() {
  return (
    <div className="nav-dock">
      <nav className="bottomnav">
        <ul className="bottomnav__list">
          {tabs.map((t, i) => (
            <li key={t.key}>
              <button
                type="button"
                className={`bottomnav__tab${i === 0 ? " bottomnav__tab--active" : ""}`}
              >
                <img className="bottomnav__icon" src={t.icon} alt="" />
                <span>{t.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
