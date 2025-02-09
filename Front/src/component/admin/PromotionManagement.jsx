// pages/Dashboard.js
import React from 'react';
import { AppData } from '../../function/AuthContext';
import { useContext } from 'react';

const PromotionManagement = () => {
  const shareData = useContext(AppData);
  console.log(shareData);
  return (
    <div>
      <h1>홍보문구 관리 페이지입니다.</h1>
      {/* <h1>{shareData.data.id}</h1> */}
    </div>
  );
};

export default PromotionManagement;