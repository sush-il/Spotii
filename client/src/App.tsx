import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import NameCard from './components/nameCard';

interface playlist{
  id: string,
  playlistLink: string,
  name: string,
  coverImage: string,
  totalTracks: number
}

function App() {
  const [playlistData, setPlaylistData] = useState<playlist [] >([]);

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
        
        if (playlistResponse.ok){
          const playlistData = await playlistResponse.json()
          setPlaylistData(playlistData);
        }

      }else{
        console.log("Response not OK");
      }
    
    } catch (e) {
      console.log("Error when fetching the data");
  };
  };

    return (
      <div>
        <Navbar />
        <NameCard data = {playlistData} />
        <a href='http://localhost:5000/login'> Get data </a>
          
      </div>
    );
}

export default App;
