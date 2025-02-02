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
import Navbar from './component/NavBar';
import Dashboard from './component/Dashboard'; // 각 페이지 컴포넌트 import
import PestManagement from './component/PestManagement';
import PromotionManagement from './component/PromotionManagement';
import UserManagement from './component/UserManagement';
import FieldGuide from './component/FieldGuide';
import UserDetail from './component/UserDetail';
import DiagDetail from './component/DiagDetail';
import ChangeProfile from './component/ChangeProfile';
import RequestAuth from './component/RequestAuth';
import JipJoinPage from './component/JipJoinPage';
import CropList from './component/CropList';
import UserJoinPage from './component/UserJoinPage';
import { AppData } from './function/AuthContext';

function App() {
  const storedUser = sessionStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const [data, setData] = useState();
  return (
    <Router>
      <div id="body">
        <AppData value={{ data: user, setData: setData }}>
          <Navbar />
          <Routes>
            <Route path="/jip" element={<JipJoinPage />} />
            <Route path="/join" element={<Join />} />
            <Route path="/idFind" element={<IdFind />} />
            <Route path="/pwFind" element={<PwFind />} />
            <Route path="/requestAuth" element={<RequestAuth />} />
            <Route path="/pest" element={<PestManagement />} />
            <Route path="/aiDiagnosis" element={<AiDiagnosis />} />
            <Route path="/promotion" element={<PromotionManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/dpDetail" element={<DpDetail />} />
            <Route path="/dpList" element={<DpList />} />
            <Route path="/userDetail" element={<UserDetail />} />
            <Route path="/diagDetail" element={<DiagDetail />} />
            <Route path="/hisDiagnosis" element={<HisDiagnosis />} />
            <Route path="/selfDiagnosis" element={<SelfDiagnosis />} />
            <Route path="/fieldGuide" element={<FieldGuide />} />
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="/changeProfile" element={<ChangeProfile />} />
            <Route path="/fumigatorPesticides" element={<FumigatorPesticides />} />
            <Route path="/auth" element={<FumigatorPesticides />} />
            <Route path="/crops" element={<CropList />} />
            <Route path="/UserJoinPage" element={<UserJoinPage />} />
          </Routes>
        </AppData>
      </div>
    </Router>
  );
}
export default App;