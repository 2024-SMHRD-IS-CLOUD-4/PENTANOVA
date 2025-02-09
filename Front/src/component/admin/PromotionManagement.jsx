// pages/Dashboard.js
import React from 'react';
import { AppData } from '../../function/AuthContext';
import { useContext } from 'react';
import axios from 'axios';

const PromotionManagement = () => {
  const clovaApi = async () => {
    try{
      const response = await axios.post(`https://clovastudio.stream.ntruss.com/`, null, {
      headers: {
        'Content-Type': 'application/json'
        },
        params: {
          Authorization: 'nv-d5ad0526ad2b4faaa9a4b8b6e2ae10b9N6l5'
        }
      })
      console.log(response.data);
    }catch(error){
      console.error(error);
    }
  }

  return (
    <div>
      <h1>홍보문구 관리 페이지입니다.</h1>
      {/* <h1>{shareData.data.id}</h1> */}
      <button onClick={clovaApi}>확인하기</button>
    </div>
  );
};

export default PromotionManagement;