import { ChevronRight } from "./Icons";
import "./SectionHeader.css";

type Props = {
  title: string;
  action?: string;
};

export default function SectionHeader({ title, action = "전체보기" }: Props) {
  return (
    <div className="section-header">
      <h2 className="section-header__title">{title}</h2>
      {action && (
        <button className="section-header__action" type="button">
          <span>{action}</span>
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
