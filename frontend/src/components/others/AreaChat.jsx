import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


const AreaChart = ({title, dataset, ...option}) => {

 console.log(dataset);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: true
    },
    title: {
      display: true,
      text: title,
    },
   },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const data = {
  labels: dataset.labels,
  datasets: [
    {
      // fill: 'end',
      tension: .1,
      label: 'Early Comers',
      data: dataset.values ? dataset.values.early : Array(12).fill(0),
      borderColor: '#2B6112',
      backgroundColor: 'rgba(11, 100, 22, .3)',
      ...option
    },
    {
     // fill: 'start',
     tension: .1,
     label: 'Late Comers',
     data: dataset.values ? dataset.values.late : Array(12).fill(0),
     borderColor: '#D70900',
     backgroundColor: 'rgba(100,11,22,.5)',
     ...option
   },
  ],
};

  return <Line options={options} data={data} />;
}

export default AreaChart;
