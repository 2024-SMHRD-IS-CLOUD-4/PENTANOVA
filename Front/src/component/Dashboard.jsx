// pages/Dashboard.js
import React from 'react';
import { useContext } from 'react'
import { AppData } from '../function/AuthContext';
import { Grid, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

const today = new Date();
const lastSixMonths = [];
for (let i = 5; i >= 0; i--) {
  const month = new Date(today.getFullYear(), today.getMonth() - i, 1); // 각 달의 1일로 설정
  const year = month.getFullYear();
  const monthNumber = month.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더함
  const monthName = month.toLocaleString('default', { month: 'long' }); // 월 이름 (예: January, February)
  lastSixMonths.push({
      year,
      month: monthNumber,
      monthName: monthName,
      startDate: new Date(year, monthNumber - 1, 1),
      endDate: new Date(year, monthNumber, 0) // 해당 달의 마지막 날
  });
}

const data = {
  labels: lastSixMonths,
  datasets: [
      {
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3, 7],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
  ],
};

const Dashboard = () => {
  console.log(lastSixMonths[1].monthName)
  const shareData = useContext(AppData);
  const storedUser = sessionStorage.getItem("user");
  const user = JSON.parse(storedUser);
  return (
    <div>
      <h1>대시보드 페이지입니다.</h1>
      <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: 16 }}>
                    <h2>Sales Chart</h2>
                    <Bar data={data} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: 16 }}>
                    <h2>Another Component</h2>
                    <p>This is another component in the dashboard.</p>
                </Paper>
            </Grid>
        </Grid>
    </div>
  );
};
export default Dashboard;