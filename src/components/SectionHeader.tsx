import { ChevronRight } from "./Icons";
import GuideDot from "./GuideDot";
import "./SectionHeader.css";

type Props = {
  title: string;
  action?: string;
  onAction?: () => void;
  guideDot?: boolean;
};

export default function SectionHeader({ title, action = "전체보기", onAction, guideDot = true }: Props) {
  return (
    <div className="section-header">
      <h2 className="section-header__title">{title}</h2>
      {action && (
        <button
          className={`relative section-header__action${onAction ? "" : " section-header__action--static"}`}
          type="button"
          onClick={onAction}
        >
          <span>{action}</span>
          <ChevronRight size={14} />
          {guideDot && <GuideDot style={{ top: "-2px", right: "-2px" }} />}
        </button>
      )}
    </div>
  );
}
