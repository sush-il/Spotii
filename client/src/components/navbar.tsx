import spotifyLogo from '../utils/spotify-logo.png';
import homeImage from '../utils/home.png';
import moodImage from '../utils/mood.png';


export default function Navbar () {

    const imageStyles = {
        width:"5vw",
        padding:"2rem 5rem 5rem 5rem"
    }

    return (
        <div style={{
            height : "100vh",
            width: "10vw",
            display: "flex", 
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "black",
        }}>
            <img src={spotifyLogo} style={imageStyles} alt="Spotify Logo" />
            <img src={homeImage} style={imageStyles} alt="Home Image" />
            <img src={moodImage} style={imageStyles} alt="Mood Image" />
        </div>
    )
}


// .navbar img{
//     width:5vw;
//     padding:2rem 5rem 5rem 5rem;
// }