function Toast({ children, visible = true, error = false, className = "" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={className}
      data-visible={visible}
      data-error={error}
    >
      {children}
    </div>
  );
}

export default Toast;
