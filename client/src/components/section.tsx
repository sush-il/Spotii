import React from 'react';

interface SectionProps {
    title: string;
    playlists: JSX.Element;
}

const Section: React.FC<SectionProps> = (props) => {
    return (
        <div className="row" style={{  
            width: "100%",
            margin: "1rem",
        }}>
            <div className="row">
                <div className="ten columns">
                    <h1>{props.title}</h1>
                </div>
                <div className="two columns">
                    <button className="more-btn" name="extras" value="playlists,none" style={{
                        padding: "0 10%",
                        margin: "1.5rem"
                    }}>View More</button>
                </div>
            </div>

            {props.playlists}

        </div>
    )
}

export default Section;
