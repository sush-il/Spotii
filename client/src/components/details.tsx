import { useEffect, useState } from 'react';
import { trackProps } from '../utils/dataProps';
import ArtistDetails from './artistDetails';
import PlaylistDetails from './playlistDetails';
import TrackDetails from './trackDetails';

const DetailsPage = () => {
  const [allTracks, setAllTracks] = useState<trackProps[]>([]);
  const [itemName, setItemName] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [artistPopularity, setArtistPopularity] = useState('');
  const [artistGenres, setArtistGenres] = useState('');
  const [dataType, setDataType] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const accessToken = sessionStorage.getItem('accessToken');
  const apiBaseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const itemName =
      new URLSearchParams(window.location.search).get('itemName') || '';
    const coverImage =
      new URLSearchParams(window.location.search).get('imageLink') || '';
    const itemLink =
      new URLSearchParams(window.location.search).get('itemLink') || '';
    const type = new URLSearchParams(window.location.search).get('type') || '';
    const popularity =
      new URLSearchParams(window.location.search).get('popularity') || '';
    const genres =
      new URLSearchParams(window.location.search).get('genres') || '';
    const preview =
      new URLSearchParams(window.location.search).get('preview') || '';

    setDataType(type);
    setArtistPopularity(popularity);
    setArtistGenres(genres);
    setPreviewURL(preview);

    if (accessToken && itemLink) {
      fetchData(itemLink);
    }

    if (itemName && coverImage) {
      setItemName(itemName);
      setCoverImage(coverImage);
      //window.history.pushState({}, "" , "/details")
    }
  }, []);

  const fetchData = async (itemLink: string) => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/getTracksFromPlaylist?accessToken=${accessToken}&playlistLink=${itemLink}`
      );
      if (response.ok) {
        const data = await response.json();
        setAllTracks(data);
      }
    } catch (error) {
      console.log("Details couldn't be accessed");
    }
  };

  if (dataType === 'playlist') {
    return (
      <PlaylistDetails
        itemName={itemName}
        coverImage={coverImage}
        allTracks={allTracks}
      />
    );
  } else if (dataType === 'artist') {
    return (
      <ArtistDetails
        data={{
          name: itemName,
          coverImage: coverImage,
          popularity: artistPopularity,
          genres: artistGenres
        }}
      />
    );
  } else {
    return (
      <TrackDetails
        data={{ name: itemName, coverImage: coverImage, preview: previewURL }}
      />
    );
  }
};

export default DetailsPage;
