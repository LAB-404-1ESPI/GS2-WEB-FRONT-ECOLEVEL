function Modal({
  children,
  onClose,
  overlayClassName = "fixed inset-0 z-[100] flex items-center justify-center bg-[#0f2819]/60 p-4",
  contentClassName = "w-full max-w-md rounded-3xl bg-white px-4 pb-5 pt-5 shadow-2xl",
  role = "dialog",
  ariaModal = true,
  ariaLabelledBy,
  closeOnBackdrop = true,
}) {
  function handleBackdrop(event) {
    if (event.target === event.currentTarget && closeOnBackdrop) onClose?.();
  }

  return (
    <div
      className={overlayClassName}
      onClick={handleBackdrop}
      role={role}
      aria-modal={ariaModal}
      aria-labelledby={ariaLabelledBy}
    >
      <div className={contentClassName} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
