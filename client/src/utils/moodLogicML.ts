import { trackFeatures } from "./dataProps";

const getSongMood = (trackFeatures: trackFeatures | null): string => {
  if (trackFeatures === null) return "";
  return "What's up";
};

export default getSongMood;
