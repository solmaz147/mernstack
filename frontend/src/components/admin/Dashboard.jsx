import React from 'react';
import {Link} from 'react-router-dom'
import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Регистрация компонентов Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LineElement,
  PointElement, // Регистрация элемента для точек
  CategoryScale,
  LinearScale
);

// Данные и настройки для кругового графика
const pieData = {
  labels: ['Electronics', 'Headphones', 'Cameras'],
  datasets: [{
    label: 'Мой первый набор данных',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const pieOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Product categories:',
      font: {
        size: 18,
        weight: 'bold'
      }
    },
    subtitle: {
      display: true,
      text: 'Sales rating in 2024',
      color: 'blue',
      font: {
        size: 12,
        family: 'Tahoma',
        weight: 'normal',
        style: 'italic'
      },
      padding: {
        bottom: 10
      }
    }
  }
};

// Данные и настройки для линейного графика
const lineData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [{
    label: 'chart 2024',
    data: [30, 45, 75, 60, 90],
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    fill: true,
  }]
};

const lineOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Sales ratings 2024',
      font: {
        size: 18,
        weight: 'bold'
      }
    },
    subtitle: {
      display: true,
      text: 'Подзаголовок линейного графика',
      color: 'blue',
      font: {
        size: 12,
        family: 'Tahoma',
        weight: 'normal',
        style: 'italic'
      },
      padding: {
        bottom: 10
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Months'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Sales'
      }
    }
  }
};

const Dashboard = () => {
  return (
    <>
    <div className=' flex justify-evenly py-12'> 
      <div className=''>
        <Pie data={pieData} options={pieOptions} key="pie-chart" />
      </div>
       <div className='w-2/5'>
        <Line data={lineData} options={lineOptions} key="line-chart" />
      </div>
    </div>
    <Link to="/admin/products" className='inline-block ms-12 mt-12 bg-blue-500 text-white p-2 border border-black'>View all products</Link>
    </>


  );
}

export default Dashboard;



