import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import createURL from '../utils/detailsURLLogic';
import { itemProp } from '../utils/dataProps';

const DisplayAll: React.FC<{title: string; data: itemProp[]}> = ({title, data }) => {
  const url = new URL(window.location.href).pathname;
  const dataTypeToGet = url==="/artists" ? "getTopArtists" : "getTopTracks"
  const [dataUsed, setDataUsed] = useState<itemProp[]>(data);
  const [timeframe, setTimeFrame] = useState("medium_term");
  
  const changeTimeFrame = (range:string) => {
    setTimeFrame(range);
  }
  
  useEffect(()=>{
    if(url !== "/playlists"){
      getData();
    }
  },[timeframe])
  
  const getData = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    try{
      const getDatabyTimeFrame = await fetch(`http://localhost:5000/${dataTypeToGet}/?code=${accessToken}&timeframe=${timeframe}`);
      if(getDatabyTimeFrame.ok){
        const requiredData = await getDatabyTimeFrame.json();
        setDataUsed(requiredData);
      }

    }catch(error){
      console.log("Couldn't get the detailed data.")
    }
  }

  return (

    <div className="container">
      <h1> {title} </h1>
      <div className="row" style={{
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "flex-start",
        paddingTop: "1.5rem"
      }}>
        <button type="submit" onClick={() => {changeTimeFrame("short_term")}} style={{ border: "none" }}>1 Month</button>
        <button type="submit" onClick={() => {changeTimeFrame("medium_term")}} style={{ border: "none" }}>6 Months</button>
        <button type="submit" onClick={() => {changeTimeFrame("long_term")}} style={{ border: "none" }}>All Time</button>
        <br />
      </div>

      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        {dataUsed.map((singleData, index) => {
          const urlToDirect = createURL(singleData);
          return (
            <div key={index} className="three columns" style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              margin: "0.5rem" 
            }}>
              

              <Link to={urlToDirect}>
                <img src={singleData.coverImage} style={{ width: "7rem", marginBottom: "0.5rem" }} alt="Cover" />
              </Link>

              <button style={{
                width: "15em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                border: "none" 
              }}> {singleData.name} </button>
            </div>
          )
        })}
      </div>
    </div>

  )
}

export default DisplayAll;
