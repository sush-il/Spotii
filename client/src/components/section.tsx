import React from 'react';
import { Link } from 'react-router-dom';

interface SectionProps {
    title: string;
    dataType: string;
    items: JSX.Element;
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
                        <Link to={"/"+props.dataType}>
                            <button name="extras" style={{
                                padding: "0 10%",
                                margin: "1.5rem"
                            }}>View More</button>
                        </Link>
                    </div>
                </div>

                {props.items}

            </div>
    )
}

export default Section;
