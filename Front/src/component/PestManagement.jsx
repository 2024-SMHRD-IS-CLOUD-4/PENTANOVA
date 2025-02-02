// pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import DpList from './user/DpList';
import axios from 'axios'
import CropList from './CropList';

const PestManagement = () => {


  


  return (
    <div>
      <h1>병해충 정보 관리 페이지입니다.</h1>
      <div>
        <ul>
          <li>과수</li>
          <li>식량작물</li>
          <li>채소</li>
          <li>화훼</li>
          <li>특용작물</li>
          <li>잡초</li>
        </ul>
      </div>
      <CropList></CropList>
    </div>
  );
};
export default PestManagement;