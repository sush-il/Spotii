import { useState } from "react";
import AudioPreview from "./audioPreview";
import ChartComponent from "./trackCharts";

interface trackProps {
    id? : string,
    name: string,
    coverImage: string,
    preview: string
}

const TrackDetails: React.FC<{data: trackProps}> = ({data}) => {
    const id = new URLSearchParams(window.location.search).get("id");
    const baseUrl = data.preview

    return (
        <div  style={{
            display: "flex",
            flexDirection:"column",
            margin:"1em",
            width:"100%",
        }}>
            <div className="row" style={{
                display:"flex", 
                width:"100%",
                }}>
                <div className="eight columns"  style={{  
                    display:"flex", 
                    justifyContent:"center",
                    alignItems:"center",
                    margin:"0",
                    }}>
                    <ChartComponent id={id || ""} />    
                <div>
                

            </div>


                </div>

                <div className="four columns" style={{
                        display:"flex", 
                        justifyContent:"center", 
                        flexDirection:"column", 
                        alignItems:"center",
                        margin:"0"
                    }}>
                    
                        <img src={data.coverImage} style={{
                            width: "30rem",
                            borderRadius: "3rem",
                            paddingTop: "5%",
                        }} alt="Cover" />
                        <h2 style={{textAlign:"center"}}>{data.name}</h2>

                </div>
                
            </div>
            <div style={{
                display:"flex",
                justifyContent:"flex-start",
                flexDirection:"column",
                alignItems:"center",
                width:"100%", 
                height:"100%"
            }}>
            
            <h1> Audio Preview </h1>
            {baseUrl && (
                <div>
                    {baseUrl != "null" ? <AudioPreview previewURL={baseUrl} /> : <h4 style={{textAlign:"center", paddingRight:"1.5em"}}> Not Available </h4> }
                </div>
                )}
            </div>
        </div>
    )
}

export default TrackDetails;