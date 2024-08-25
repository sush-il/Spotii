import { useEffect, useState } from "react";
import { itemProp, trackFeatures } from "../utils/dataProps";
import getSongMood from "../utils/moodLogicML";

const MoodPage: React.FC<{ trackData: itemProp }> = ({ trackData }) => {
  const [trackFeatures, setTrackFeatures] = useState<trackFeatures | null>(
    null
  );
  useEffect(() => {
    getTrackFeatures();
  }, []);

  const getTrackFeatures = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:5000/getTrackFeatures?accessToken=${accessToken}&songId=${trackData.id}`
      );

      if (response.ok) {
        const features = await response.json();
        setTrackFeatures(features);
      }
    } catch (error) {
      console.error(
        "Error getting features of current playing track: " + error
      );
    }
  };
  return (
    <div
      className='container'
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <img
        alt='Cover'
        src={trackData.coverImage}
        style={{
          width: "30rem",
          borderRadius: "3rem",
          paddingTop: "5%",
        }}
      />
      <h1> {trackData.name} </h1>
      <h3> Mood of the current Track is: </h3>
      <h2> {getSongMood(trackFeatures)} </h2>
    </div>
  );
};

export default MoodPage;
