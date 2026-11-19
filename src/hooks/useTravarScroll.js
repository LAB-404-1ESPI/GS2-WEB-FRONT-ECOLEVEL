
import { useEffect } from "react";

function useTravarScroll() {
  useEffect(() => {
    const main = document.querySelector(".app-scroll");

    const bodyOriginal = document.body.style.overflow;
    const htmlOriginal = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    if (main) {
      main.style.overflowY = "auto";
      main.style.overflowX = "hidden";
    }

    return () => {
      document.body.style.overflow = bodyOriginal;
      document.documentElement.style.overflow = htmlOriginal;

      if (main) {
        main.style.overflowY = "";
        main.style.overflowX = "";
      }
    };
  }, []);
}

export default useTravarScroll;
