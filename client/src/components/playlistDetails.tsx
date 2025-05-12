import { Link } from 'react-router-dom';
import createURL from '../utils/detailsURLLogic';
import { playlistDetailProps } from '../utils/dataProps';

const PlaylistDetails: React.FC<playlistDetailProps> = ({
  itemName,
  coverImage,
  allTracks
}) => {
  return (
    <div
      className="row"
      style={{
        width: '100vw',
        margin: '2em'
      }}
    >
      <div className="four columns">
        <img
          src={coverImage}
          style={{
            width: '30rem',
            borderRadius: '3rem',
            paddingTop: '5%',
            alignContent: 'center'
          }}
          alt="Cover"
        />
        <h2>{itemName}</h2>
        <p>{allTracks.length} Tracks </p>
      </div>

      <div className="eight columns">
        {allTracks.map((track) => {
          const urlToDirect = createURL(track);
          return (
            <div
              className="container"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              <img
                src={track.coverImage}
                style={{
                  width: '7rem',
                  padding: '1.5% 3% 1.5% 1.5%',
                  borderRadius: '1.5rem'
                }}
                alt="Cover"
              />

              <Link to={urlToDirect}>
                <button
                  style={{
                    border: 'none',
                    textDecoration: 'none',
                    color: 'white',
                    padding: '3%',
                    fontFamily: 'Montserrat, sans-serif',
                    overflow: 'hidden',
                    textAlign: 'center'
                  }}
                >
                  {' '}
                  {track.name}{' '}
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistDetails;
