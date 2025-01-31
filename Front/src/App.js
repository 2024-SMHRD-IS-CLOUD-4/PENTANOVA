import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/NavBar';
import Dashboard from './component/Dashboard'; // 각 페이지 컴포넌트 import
import PestManagement from './component/PestManagement';
import PromotionManagement from './component/PromotionManagement';
import UserManagement from './component/UserManagement';
import Login from './component/Login';
import Join from './component/jip/Join';
import Diagnosis from './component/Diagnosis';
import DpDetail from './component/DpDetail';
import DpList from './component/DpList';
import HisDiagnosis from './component/HisDiagnosis';
import SelfDiagnosis from './component/SelfDiagnosis';
import FieldGuide from './component/FieldGuide';
import UserDetail from './component/UserDetail';
import DiagDetail from './component/DiagDetail';
import FumigatorPesticides from './component/FumigatorPesticides';
import MyProfile from './component/MyProfile';
import { AppData } from './function/AuthContext';
import Uploader from './component/Uploader';
import IdFind from './component/jip/IdFind';
import PwFind from './component/jip/PwFind';
import ChangeProfile from './component/ChangeProfile';
import RequestAuth from './component/RequestAuth';
import JipJoinPage from './component/JipJoinPage';
import CropList from './component/CropList';
import Address from './component/jip/Address';

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
            <Route path="/uploader" element={<Uploader />} />
            <Route path="/promotion" element={<PromotionManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/diagnosis" element={<Diagnosis />}></Route>
            <Route path="/dpDetail" element={<DpDetail />}></Route>
            <Route path="/dpList" element={<DpList />}></Route>
            <Route path="/userDetail" element={<UserDetail />}></Route>
            <Route path="/diagDetail" element={<DiagDetail />}></Route>
            <Route path="/hisDiagnosis" element={<HisDiagnosis />}></Route>
            <Route path="/selfDiagnosis" element={<SelfDiagnosis />}></Route>
            <Route path="/fieldGuide" element={<FieldGuide />}></Route>
            <Route path="/myProfile" element={<MyProfile />}></Route>
            <Route path="/changeProfile" element={<ChangeProfile />}></Route>
            <Route path="/fumigatorPesticides" element={<FumigatorPesticides />}></Route>
            <Route path="/crops" element={<CropList />}></Route>
            <Route path="/address" element={<Address />}></Route>
          </Routes>
        </AppData>
      </div>
    </Router>
  );
}
export default App;