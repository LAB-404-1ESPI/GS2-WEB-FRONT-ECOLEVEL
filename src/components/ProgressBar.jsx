function ProgressBar({
  percent,
  className = "h-3 w-full overflow-hidden rounded-full bg-[#9ad3a8]",
  fillClassName = "h-full rounded-full bg-[#1f9d3f]",
  role,
  valueNow,
  valueMin = 0,
  valueMax = 100,
  label,
}) {
  return (
    <div
      className={className}
      role={role}
      aria-valuenow={role === "progressbar" ? valueNow ?? percent : undefined}
      aria-valuemin={role === "progressbar" ? valueMin : undefined}
      aria-valuemax={role === "progressbar" ? valueMax : undefined}
      aria-label={label}
    >
      <div className={fillClassName} style={{ width: `${percent}%` }} />
    </div>
  );
}

export default ProgressBar;
