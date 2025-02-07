import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Join from './component/jip/Join';
import IdFind from './component/jip/IdFind';
import PwFind from './component/jip/PwFind';
import Diagnosis from './component/user/Diagnosis';
import AiDiagnosis from './component/user/AiDiagnosis';
import SelfDiagnosis from './component/user/SelfDiagnosis';
import HisDiagnosis from './component/user/HisDiagnosis';
import DpDetail from './component/user/DpDetail';
import DpList from './component/user/DpList';
import MyProfile from './component/user/MyProfile';
import FumigatorPesticides from './component/user/FumigatorPesticides';
import Fumigator from './component/user/Fumigator'
import Pesticides from './component/user/Pesticides'
import Navbar from './component/NavBar';
import Dashboard from './component/Dashboard'; // 각 페이지 컴포넌트 import
import PestManagement from './component/PestManagement';
import PromotionManagement from './component/PromotionManagement';
import UserManagement from './component/UserManagement';
import FieldGuide from './component/FieldGuide';
import UserDetail from './component/UserDetail';
import DiagDetail from './component/DiagDetail';
import ChangeProfile from './component/user/ChangeProfile';
import RequestAuth from './component/user/RequestAuth';
import JipJoinPage from './component/JipJoinPage';
import CropList from './component/CropList';
import LoginApi from './component/api/LoginApi'
import UserJoinPage from './component/UserJoinPage';
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
              <Route path="/diagnosis" element={<Diagnosis />}></Route>
              <Route path="/dpDetail" element={<DpDetail />}></Route>
              <Route path="/dpList" element={<DpList />}></Route>
              <Route path="/selfDiagnosis" element={<SelfDiagnosis />}></Route>
              <Route path="/userDetail" element={<UserDetail />}></Route>
              <Route path="/diagDetail" element={<DiagDetail />}></Route>
              <Route path="/hisDiagnosis" element={<HisDiagnosis />}></Route>
              <Route path="/fieldGuide" element={<FieldGuide />}></Route>
              <Route path="/myProfile" element={<MyProfile />}></Route>
              <Route path="/changeProfile" element={<ChangeProfile />}></Route>
              <Route path="/fumigatorPesticides" element={<FumigatorPesticides />}></Route>
              <Route path="/kakao/callback" element={<LoginApi />}></Route>
              <Route path="/crops" element={<CropList />}></Route>
              <Route path="/UserJoinPage" element={<UserJoinPage />}></Route>
              <Route path="/alarm" element={<KakaoAlarm />} />
              <Route path="/test" element={<Test />}></Route>
              <Route path="/test2" element={<Test2 />}></Route>
            </Routes>
          </DpData>
        </AppData>
      </div>
    </Router>
  );
}
export default App;