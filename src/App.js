import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/NavBar';
import Dashboard from './component/Dashboard'; // 각 페이지 컴포넌트 import
import PestManagement from './component/PestManagement';
import PromotionManagement from './component/PromotionManagement';
import UserManagement from './component/UserManagement';
import Login from './component/Login';
import Join from './component/Join';
import Diagnosis from './component/Diagnosis';
import DpDetail from './component/DpDetail';
import HisDiagnosis from './component/HisDiagnosis';
import SelfDiagnosis from './component/SelfDiagnosis';
import FieldGuide from './component/FieldGuide';
import UserDetail from './component/UserDetail';
import HisDetail from './component/HisDetail';
import FumigatorPesticides from './component/FumigatorPesticides';
import MyProfile from './component/MyProfile';
import { AppData } from './function/AuthContext';
import Uploader from './component/Uploader';
import ChangeProfile from './component/ChangeProfile';

function App() {
  const storedUser = sessionStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const [data,setData] = useState();
  return (
    <Router>
      <div>
        <AppData value={{data : user, setData:setData}}>
        <Navbar />
          <Routes>
            <Route path="/pest" element={<PestManagement />} />
            <Route path="/uploader" element={<Uploader />} />
            <Route path="/promotion" element={<PromotionManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/diagnosis" element={<Diagnosis />}></Route>
            <Route path="/dpDetail" element={<DpDetail />}></Route>
            <Route path="/userDetail" element={<UserDetail />}></Route>
            <Route path="/hisDetail" element={<HisDetail />}></Route>
            <Route path="/hisDiagnosis" element={<HisDiagnosis />}></Route>
            <Route path="/selfDiagnosis" element={<SelfDiagnosis />}></Route>
            <Route path="/fieldGuide" element={<FieldGuide />}></Route>
            <Route path="/myProfile" element={<MyProfile />}></Route>
            <Route path="/changeProfile" element={<ChangeProfile />}></Route>
            <Route path="/fumigatorPesticides" element={<FumigatorPesticides />}></Route>
          </Routes>
        </AppData>
      </div>
    </Router>
  );
}
export default App;