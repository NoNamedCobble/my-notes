import chroma from "chroma-js";

export const getBestColor = (bgColor: string) => {
  const contrastWithBlack = chroma.contrast(bgColor, "black");
  const contrastWithWhite = chroma.contrast(bgColor, "white");

  return contrastWithBlack > contrastWithWhite ? "black" : "white";
};
