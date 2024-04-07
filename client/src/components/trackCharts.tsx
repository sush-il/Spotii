import React, { useEffect, useState } from 'react';
import 'chart.js';
import { Bar } from 'react-chartjs-2';
import { trackFeatures } from '../utils/dataProps';
import {  Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title, Legend, Tooltip} from 'chart.js';
ChartJS.register(   CategoryScale,   LinearScale,   BarElement,   Title, Legend, Tooltip );

const ChartComponent: React.FC<{id:string}> = ({id}) => {
  const [chartData, setChartData] = useState<trackFeatures | null>(null);

  useEffect(() => {
    getData();
  },[])

  const getData = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    try{
      const response = await fetch(`http://localhost:5000/getTrackFeatures?accessToken=${accessToken}&songId=${id}`)
      if(response.ok){
        const data = await response.json()
        setChartData(data);
      } 
    }catch(error){
      console.log("Couldn't get the audio features.")
    }
  }

  return (
    <Bar data={{
        labels: ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence'],
        datasets: [{
          data: chartData? [
            chartData.acousticness, 
            chartData.danceability, 
            chartData.energy, 
            chartData.instrumentalness, 
            chartData.liveness, 
            chartData.speechiness, 
            chartData.valence
          ]: [],
          backgroundColor: ['rgba(0,255,212,0.3)', 'rgba(255,0,114,0.3)', 'rgba(221,0,255,0.3)'],
          borderColor: ['rgb(0,255,212)', 'rgb(255,0,114)', 'rgb(221,0,255)'],
          borderWidth: 2,
        }]
      }}
      options={{
        indexAxis: 'y', // horizontal bar
        scales: {
          y: {
            beginAtZero: true
          },
          x:{display:false}
        },

        plugins: {
          legend : {display: false},
          title: {
            display: true,
            text: 'Audio Features'
          }
        }
      }}
    />
  );
};

export default ChartComponent;