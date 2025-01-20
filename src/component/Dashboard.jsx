// pages/Dashboard.js
import React from 'react';
import { useContext } from 'react'
import { AppData } from '../function/AuthContext';

const Dashboard = () => {
  const shareData = useContext(AppData);
  const storedUser = sessionStorage.getItem("user");
  const user = JSON.parse(storedUser);
  return (
    <div>
      <h1>대시보드 페이지입니다.</h1>
    </div>
  );
};
export default Dashboard;