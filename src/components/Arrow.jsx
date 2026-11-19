function Arrow({ variant = "icon", className }) {
  if (variant === "text") {
    return <span className={className || "text-base"}>›</span>;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={className || "h-6 w-6 flex-none fill-none stroke-[#1d3a27] stroke-[2.5]"}
    >
      <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Arrow;
