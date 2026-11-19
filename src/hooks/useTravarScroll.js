import { useEffect } from "react";

function useTravarScroll() {
  useEffect(() => {
    const bodyOriginal = document.body.style.overflow;
    const htmlOriginal = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOriginal;
      document.documentElement.style.overflow = htmlOriginal;
    };
  }, []);
}

export default useTravarScroll;