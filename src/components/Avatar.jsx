function Avatar({ src, alt = "", className = "h-10 w-10" }) {
  return <img src={src} alt={alt} className={`${className} flex-none rounded-full`} />;
}

export default Avatar;
