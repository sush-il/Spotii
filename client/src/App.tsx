import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import NameCard from './components/nameCard';
import Section from './components/section';

interface playlist{
  id: string,
  playlistLink: string,
  name: string,
  coverImage: string,
  totalTracks?: number, 
  popularity?: number,
  genres?: string[]

}

function App() {
  const [playlistData, setPlaylistData] = useState<playlist [] >([]);
  const [topArtistsData, setTopArtistsData] = useState<playlist []>([]);
  const [topTracksData, setTopTracksData] = useState<playlist []>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      const authCode = new URLSearchParams(window.location.search).get('code');
      const response = await fetch(`http://localhost:5000/?code=${authCode}`);

      if (response.ok) {
        const accessToken = await response.json();
        const playlistResponse = await fetch(`http://localhost:5000/getPlaylistData/?code=${accessToken}`);
        const topArtistsResponse = await fetch(`http://localhost:5000/getTopArtists/?code=${accessToken}`);
        const topTracksResponse = await fetch(`http://localhost:5000/getTopTracks/?code=${accessToken}`);
        
        if (playlistResponse.ok && topArtistsResponse.ok){
          const playlistData = await playlistResponse.json()
          const topArtists = await topArtistsResponse.json();
          const topTracks = await topTracksResponse.json();
          setPlaylistData(playlistData);
          setTopArtistsData(topArtists);
          setTopTracksData(topTracks);
        }

      }else{
        console.log("Response not OK");
      }
    
    } catch (e) {
      console.log("Error when fetching the data");
  };
  };

    return (
      <div style={{
        display: "flex",
        flexDirection: "row",
        width:"100vw",
        // backgroundColor:"red",
      }}>
        <Navbar />
        <div style={{
          display:"flex", 
          flexDirection:"column", 
          justifyContent:"center",
          width:"100%",
          // backgroundColor: "blue",
          }}>

          <Section title="Your Playlists" playlists={<NameCard data={playlistData}/>} />
          <Section title="Top Artists" playlists={<NameCard data={topArtistsData}/>} />
          <Section title="Top Tracks" playlists={<NameCard data={topTracksData}/>} />
        </div>
        <a href='http://localhost:5000/login'> Get data </a>
      </div>
    );
}

export default App;
