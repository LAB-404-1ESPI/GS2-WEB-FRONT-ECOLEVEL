function GreenButton({ children, className, onClick, type = "button", disabled, autoFocus, title }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className || "w-full rounded-full border-[1.5px] border-[#1f6b34] bg-[#3fe45a] py-2.5 text-sm font-semibold"}
      disabled={disabled}
      autoFocus={autoFocus}
      title={title}
    >
      {children}
    </button>
  );
}

export default GreenButton;
