// pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import DpList from './DpList';
import axios from 'axios'

const PestManagement = () => {

  const [crops, setCrops] = useState([]);

  useEffect(() => {
    const cropList = async () => {
      try {
        const response = await axios.get('http://localhost:8093/PTNV/crop/cropList');
        setCrops(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    cropList();
  }, []);
  return (
    <div>
      <h1>병해충 정보 관리 페이지입니다.</h1>
      <div>

      </div>
      <DpList></DpList>
    </div>
  );
};

export default PestManagement;