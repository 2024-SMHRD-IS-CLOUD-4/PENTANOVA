import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './component/Login';

import JipJoinPage from './component/JipJoinPage';
import Join from './component/jip/Join';
import IdFind from './component/jip/IdFind';
import PwFind from './component/jip/PwFind';

import UserJoinPage from './component/UserJoinPage';
import Diagnosis from './component/user/Diagnosis';
import AiDiagnosis from './component/user/AiDiagnosis';
import SelfDiagnosis from './component/user/SelfDiagnosis';
import HisDiagnosis from './component/user/HisDiagnosis';
import DpDetail from './component/user/DpDetail';
import FumigatorPesticides from './component/user/FumigatorPesticides';
import Fumigator from './component/user/Fumigator'
import Pesticides from './component/user/Pesticides'
import MyProfile from './component/user/MyProfile';
import ChangeProfile from './component/user/ChangeProfile';
import RequestAuth from './component/user/RequestAuth';

import AdminJoinPage from './component/AdminJoinPage';
import Dashboard from './component/admin/Dashboard'; // 각 페이지 컴포넌트 import
import PestManagement from './component/admin/PestManagement';
import CropList from './component/admin/CropList';
import DiagDetail from './component/admin/DiagDetail'; // 이거 어떤 페이지 인지 작성해주세요~
import PromotionManagement from './component/admin/PromotionManagement';
import UserManagement from './component/admin/UserManagement';
import UserDetail from './component/admin/UserDetail';
import AdminDpList from './component/admin/AdminDpList';

import Navbar from './component/NavBar';
import FieldGuide from './component/FieldGuide'; // 이거 어떤 페이지 인지 작성해주세요~
import LoginApi from './component/api/LoginApi'
import AccessObjectStorage from './component/api/AccessObjectStorage';
import KakaoAlarm from './component/api/KakaoAlarm';
import Test from './test/Test';
import { AppData } from './function/AuthContext';
import { DpData } from './function/AuthContext';
import './css/all.css';

import Test2 from './test/Test2';

function App() {
  const storedUser = sessionStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const [userdata, setUserData] = useState();
  const [dpData, setDpData] = useState([]);
  return (
    <Router>
      <div id="body">
        <AppData value={{ data: user, setData: setUserData }}>
          <DpData value={{ data: dpData, setData: setDpData }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/jip" element={<JipJoinPage />} />
              <Route path="/join" element={<Join />} />
              <Route path="/idFind" element={<IdFind />} />
              <Route path="/pwFind" element={<PwFind />} />
              <Route path="/requestAuth" element={<RequestAuth />} />
              <Route path="/pest" element={<PestManagement />} />
              <Route path="/aiDiagnosis" element={<AiDiagnosis />} />
              <Route path="/promotion" element={<PromotionManagement />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/diagnosis" element={<Diagnosis />} />
              <Route path="/dpDetail" element={<DpDetail />} />
              <Route path="/dpList" element={<AdminDpList />}/>
              <Route path="/selfDiagnosis" element={<SelfDiagnosis />} />
              <Route path="/userDetail" element={<UserDetail />} />
              <Route path="/diagDetail" element={<DiagDetail />} />
              <Route path="/hisDiagnosis" element={<HisDiagnosis />} />
              <Route path="/fieldGuide" element={<FieldGuide />}/>
              <Route path="/myProfile" element={<MyProfile />} />
              <Route path="/changeProfile" element={<ChangeProfile />} />
              <Route path="/fumigatorPesticides" element={<FumigatorPesticides />} />
              <Route path="/kakao/callback" element={<LoginApi />} />
              <Route path="/crops" element={<CropList />} />
              <Route path="/UserJoinPage" element={<UserJoinPage />}/>
              <Route path="/AdminJoinPage" element={<AdminJoinPage />}/>
              <Route path="/alarm" element={<KakaoAlarm />} />
              <Route path="/test" element={<Test />} />
              <Route path="/test2" element={<Test2 />} />
            </Routes>
          </DpData>
        </AppData>
      </div>
    </Router>
  );
}
export default App;