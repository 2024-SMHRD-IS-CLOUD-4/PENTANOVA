// pages/Dashboard.js
import React from 'react';
import { useContext } from 'react'
import { AppData } from '../function/AuthContext';
import { Grid, Paper } from '@mui/material';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, BarElement, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'chart.js/auto';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const today = new Date();
const lastSixMonths = [];
let monthNames = [];
for (let i = 5; i >= 0; i--) {
  const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
  const year = month.getFullYear();
  const monthNumber = month.getMonth() + 1;
  const monthName = month.toLocaleString('default', { month: 'long' });
  lastSixMonths.push({
    year,
    month: monthNumber,
    monthName: monthName,
    startDate: new Date(year, monthNumber - 1, 1),
    endDate: new Date(year, monthNumber, 0)
  });
  monthNames.push(monthName);
}

const data1 = {
  labels: monthNames,
  datasets: [
    {
      label: '가입자',
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: 'rgba(53, 10, 207, 0.5)',
    }
  ]
};

const data2 = {
  labels: monthNames,
  datasets: [
    {
      label: '이용 횟수',
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: 'rgba(68, 11, 201, 0.5)',
    }
  ]
}

const data3 = {
  labels: ['경기도', '강원도', '충청도', '전라도', '경상도'],
  datasets: [
    {
      label: '병해충 분포',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1
    }],
}


const options = { // options 분리
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20
      }
    }
  }
};

const Dashboard = () => {
  console.log(monthNames);
  const shareData = useContext(AppData);
  const storedUser = sessionStorage.getItem("user");
  const user = JSON.parse(storedUser);
  return (
    <div>
      <h1>대시보드 페이지입니다.</h1>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <h2>가입 현황</h2>
            <Bar data={data1} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <h2>이용 현황</h2>
            <Line data={data2}></Line>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <h2>병해충 진단 분포</h2>
            <Pie data={data3} />
          </Paper>
        </Grid>
      </Grid>
      
    </div>
  );
};
export default Dashboard;