import circuloImg from "../assets/imgs/circulo.png";

function IconCircle({
  src,
  size = "h-11 w-11",
  iconSize = "h-6 w-6",
  children,
  className = "",
}) {
  return (
    <span className={`relative grid flex-none place-items-center ${size} ${className}`}>
      <img src={circuloImg} alt="" className="absolute inset-0 h-full w-full object-contain" />
      {children ? (
        <span className={`relative block ${iconSize}`}>{children}</span>
      ) : (
        <img src={src} alt="" className={iconSize} />
      )}
    </span>
  );
}

export default IconCircle;
