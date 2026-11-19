import { Link } from "react-router-dom";

function MenuRow({
  to,
  onClick,
  className,
  children,
  icon,
  title,
  description,
  right,
  danger = false,
  variant = "custom",
}) {
  const classes = className || (variant === "card"
    ? `flex w-full items-center gap-3 rounded-2xl border py-1.5 pl-2 pr-3 text-left shadow-sm ${
        danger ? "border-[#e29a9a] bg-[#fbe3e3]" : "border-[#6fae7e] bg-[#e1f1e3]"
      }`
    : "");

  const content = children ?? (
    <>
      <img src={icon} alt="" className="h-10 w-10 flex-none object-contain" />
      <span className="min-w-0 flex-1 leading-tight">
        <strong className="block text-sm font-bold">{title}</strong>
        <span className="block truncate text-xs text-[#4d6a58]">{description}</span>
      </span>
      {right}
    </>
  );

  if (to) {
    return <Link to={to} className={classes}>{content}</Link>;
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

export default MenuRow;
