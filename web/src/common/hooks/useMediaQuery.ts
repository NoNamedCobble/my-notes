import { useEffect, useState } from "react";

export const useMediaQuery = (minWidth: number) => {
  const [matches, setMatches] = useState(false);

  const handleChange = (event: MediaQueryListEvent) => {
    setMatches(event.matches);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);

    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [minWidth]);

  return matches;
};
