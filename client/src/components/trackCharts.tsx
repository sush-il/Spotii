import 'chart.js';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { trackFeatures } from '../utils/dataProps';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip
);

const ChartComponent: React.FC<{ id: string }> = ({ id }) => {
  const [chartData, setChartData] = useState<trackFeatures | null>(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    try {
      const response = await fetch(
        `${apiBaseUrl}/getTrackFeatures?accessToken=${accessToken}&songId=${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setChartData(data);
      }
    } catch (error) {
      console.log("Couldn't get the audio features.");
    }
  };

  return (
    <Bar
      data={{
        labels: [
          'acousticness',
          'danceability',
          'energy',
          'instrumentalness',
          'liveness',
          'speechiness',
          'valence'
        ],
        datasets: [
          {
            data: chartData
              ? [
                  chartData.acousticness,
                  chartData.danceability,
                  chartData.energy,
                  chartData.instrumentalness,
                  chartData.liveness,
                  chartData.speechiness,
                  chartData.valence
                ]
              : [],
            backgroundColor: [
              'rgba(0,255,212,0.3)',
              'rgba(255,0,114,0.3)',
              'rgba(221,0,255,0.3)'
            ],
            borderColor: ['rgb(0,255,212)', 'rgb(255,0,114)', 'rgb(221,0,255)'],
            borderWidth: 2
          }
        ]
      }}
      options={{
        indexAxis: 'y', // horizontal bar
        scales: {
          y: {
            beginAtZero: true
          },
          x: { display: false }
        },

        plugins: {
          legend: { display: false },
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
