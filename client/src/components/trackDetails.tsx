import ChartComponent from "./trackCharts";

interface trackProps {
    id? : string,
    name: string,
    coverImage: string,
}

const TrackDetails: React.FC<{data: trackProps}> = ({data}) => {
    const id = new URLSearchParams(window.location.search).get("id");
    return (
        <div className="container" id="details-main"  style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div className="row" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <img src={data.coverImage} style={{
                    width: "30rem",
                    borderRadius: "3rem",
                    paddingTop: "5%",
                    justifyContent: "center",
                }} alt="Cover" />
                <h2 style={{textAlign:"center"}}>{data.name}</h2>
            </div>

            <div style={{width:"100%", height:"40%", display:"flex", justifyContent:"center"}}>
                <ChartComponent id={id || ""} />    
                <audio controls>
                    <source src="https://p.scdn.co/mp3-preview/85c0881cd84557b942b0c1ac96c7403344cbc502?cid=cfe923b2d660439caf2b557b21f31221" type="audio/mpeg" />
                </audio>
            </div>
        </div>
    )
}

export default TrackDetails;