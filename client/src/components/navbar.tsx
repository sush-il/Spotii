import spotifyLogo from '../utils/spotify-logo.png';
import homeImage from '../utils/home.png';
import moodImage from '../utils/mood.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function Navbar () {

    const [isHomeHovered, setIsHomeHovered] = useState(false);
    const [isMoodHovered, setIsMoodHovered] = useState(false);

    const homeMouseEnter = () => { setIsHomeHovered(true); };
    const homeMouseLeave = () => { setIsHomeHovered(false);};
    const moodMouseEnter = () => { setIsMoodHovered(true); };
    const moodMouseLeave = () => { setIsMoodHovered(false);};
    
    

    const imageStyles = {
        width:"3vw",
        padding:"2rem 5rem 5rem 5rem",
    }

    return (
        <div style={{
            display:"flex", 
            justifyContent:"center", 
            alignItems:"center", 
            height:"100vh",
            width:"5em"}}>
            
            <div style={{
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                position:"fixed",
                backgroundColor: "black",
                width: "5vw",
                borderRadius:"0 3em 3em 0",  
            }}>
                <img src={spotifyLogo} style={imageStyles} alt="Spotify Logo" />
                <Link to="/"> 
                    <img src={homeImage} style={{...imageStyles, transform: isHomeHovered ? "scale(1.1) translate(5%)":"none"}} alt="Home Image" 
                            onMouseEnter={homeMouseEnter}
                            onMouseLeave={homeMouseLeave}
                    />
                </Link>
                <img src={moodImage} style={{...imageStyles, transform: isMoodHovered ? "scale(1.1) translate(5%)":"none"}}
                            onMouseEnter={moodMouseEnter}
                            onMouseLeave={moodMouseLeave} alt="Mood Image" />
            </div>
        </div>
    )
}