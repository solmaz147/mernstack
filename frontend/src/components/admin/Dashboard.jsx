import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

// Chart.js bileşenlerini kaydedin
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const pieData = {
  labels: ['Electronics', 'Headphones', 'Cameras'],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};



const Dashboard = () => {
  return(
    <div className='h-[270px] flex flex-col justify-center pt-10'>

        <h2 className="text-2xl font-semibold text-gray-700 m-4">Product Categories:</h2>
      
          <Pie data={pieData} />

          </div>
         
      
    
    
  );
}

export default Dashboard;

