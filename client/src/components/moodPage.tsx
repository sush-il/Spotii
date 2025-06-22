import { useEffect, useState } from 'react';
import { itemProp, trackFeatures } from '../utils/dataProps';

const MoodPage: React.FC<{ trackData: itemProp }> = ({ trackData }) => {
  const [trackFeatures, setTrackFeatures] = useState<trackFeatures | null>(null);
  const [trackMood, setTrackMood] = useState<{ mood: string; message: string }>({ mood: '', message: '' });
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchData = async () => {
      await getTrackFeatures();
    };
    fetchData();
  }, []); // Only run this on component mount

  useEffect(() => {
    if (trackFeatures) {
      getMood();
    }
  }, [trackFeatures]); // Only run this when trackFeatures changes

  const getTrackFeatures = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    try {
      const response = await fetch(
        `${apiBaseUrl}/getTrackFeatures?accessToken=${accessToken}&songId=${trackData.id}`
      );

      if (response.ok) {
        const features = await response.json();
        setTrackFeatures(features);
      }
    } catch (error) {
      console.error(
        'Error getting features of current playing track: ' + error
      );
    }
  };
  
  // ############ Deprecated ############
  const getMood = async () => {
    try {
      const moodResponse = await fetch('http://127.0.0.1:8000/mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trackFeatures)
      });

      const data = await moodResponse.json();
      setTrackMood(data);
    } catch (error) {
      console.error("Couldn't get mood for given track: " + error);
    }
  };

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h3>
        {' '}
        Currently Playing <br />
        <span
          style={{
            backgroundImage: `url("https://media.giphy.com/media/26BROrSHlmyzzHf3i/giphy.gif")`,
            backgroundSize: 'cover',
            color: 'transparent',
            backgroundClip: 'text', // Standard property
            WebkitBackgroundClip: 'text', // Vendor prefix for WebKit browsers
            MozBackgroundClip: 'text', // Vendor prefix for Mozilla browsers
            textTransform: 'uppercase',
            fontSize: '3em',
            fontWeight: '900',
            textAlign: 'center'
          }}
        >
          {trackMood.mood}
        </span>
        <h6> {trackMood.message} </h6>
      </h3>
      <img
        alt="Cover"
        src={trackData.coverImage}
        style={{
          width: '30rem',
          borderRadius: '3rem',
          paddingTop: '5%'
        }}
      />
      <h1> {trackData.name} </h1>
    </div>
  );
};

export default MoodPage;
