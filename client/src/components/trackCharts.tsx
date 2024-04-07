import React from 'react';
import { Bar } from 'react-chartjs-2';

interface trackFeatures {
    danceability: number,
    energy: number,
    loudness: number
    speechiness: number, 
    acousticness: number,
    instrumentalness: number,
    liveness: number ,
    valence: number ,
}

interface chartData {
    lables: string[],
    values: trackFeatures[]
}

const ChartComponent: React.FC<{data: chartData}> = ({ data }) => {
  return (
    <div>
      <Bar
        type='bar'
        data={{
          labels: ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence'],
          datasets: [{
            label: 'Score',
            data: [data.acousticness, data.danceability, data.energy, data.instrumentalness, data.liveness, data.speechiness, data.valence],
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
            }
          },
          legend: { display: false },
          plugins: {
            title: {
              display: true,
              text: 'Audio Features'
            }
          }
        }}
      />
    </div>
  );
};

export default ChartComponent;
