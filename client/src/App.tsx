import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import DetailsPage from './components/details';
import DisplayAll from './components/displayAll';
import Login from './components/login';
import MoodPage from './components/moodPage';
import NameCard from './components/nameCard';
import Navbar from './components/navbar';
import Section from './components/section';
import { itemProp } from './utils/dataProps';

function App() {
  const [playlistData, setPlaylistData] = useState<itemProp[]>([]);
  const [topArtistsData, setTopArtistsData] = useState<itemProp[]>([]);
  const [topTracksData, setTopTracksData] = useState<itemProp[]>([]);
  const [moodData, setMoodData] = useState<itemProp>({
    id: '',
    name: '',
    coverImage: ''
  });
  const [myaccessToken, setAccessToken] = useState('');
  const apiBaseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const authCode = new URLSearchParams(window.location.search).get('code');
    if (authCode) {
      fetchData(authCode);
      window.history.pushState({}, '', '/');
    }
    fetchCurrentTrack();
  }, []);

  const fetchData = async (authCode: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}?code=${authCode}`);
      if (response.ok) {
        const accessToken = await response.json();
        setAccessToken(accessToken);
        sessionStorage.setItem('accessToken', accessToken); // Set the access token to session so it can be accessed
        const [playlistResponse, topArtistsResponse, topTracksResponse] =
          await Promise.all([
            fetch(`${apiBaseUrl}/getPlaylistData/?code=${accessToken}`),
            fetch(
              `${apiBaseUrl}/getTopArtists/?code=${accessToken}&timeframe=medium_term`
            ),
            fetch(
              `${apiBaseUrl}/getTopTracks/?code=${accessToken}&timeframe=medium_term`
            )
          ]);

        if (playlistResponse.ok && topArtistsResponse.ok) {
          const playlistData = await playlistResponse.json();
          const topArtists = await topArtistsResponse.json();
          const topTracks = await topTracksResponse.json();
          setPlaylistData(playlistData);
          setTopArtistsData(topArtists);
          setTopTracksData(topTracks);
        }
      } else {
        console.log('Response not OK while fetching playlist, tracks and artists data.');
      }
    } catch (err) {
      console.error(`Error when fetching the data with status ${err?.status}. ${err.message}`);
    }
  };

  const fetchCurrentTrack = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const moodResponse = await fetch(
      `${apiBaseUrl}/getCurrentTrackMood/?code=${accessToken}`
    );

    if (moodResponse.ok) {
      const moodResponseData = await moodResponse.json();
      setMoodData(moodResponseData);
    }
  };

  if (!myaccessToken) return <Login />;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100vw'
      }}
    >
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '1em',
                flex: 1
              }}
            >
              <Section
                title="Your Playlists"
                dataType="playlists"
                items={<NameCard data={playlistData} />}
              />
              <Section
                title="Top Artists"
                dataType="artists"
                items={<NameCard data={topArtistsData} />}
              />
              <Section
                title="Top Tracks"
                dataType="tracks"
                items={<NameCard data={topTracksData} />}
              />
            </div>
          }
        />
        <Route
          path="/playlists"
          element={
            <DisplayAll title="All Your Playlists" data={playlistData} />
          }
        />
        <Route
          path="/artists"
          element={
            <DisplayAll title="All Your Top Artists" data={topArtistsData} />
          }
        />
        <Route
          path="/tracks"
          element={
            <DisplayAll title="All Your Top Tracks" data={topTracksData} />
          }
        />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/mood" element={<MoodPage trackData={moodData} />} />
      </Routes>
    </div>
  );
}

export default App;
