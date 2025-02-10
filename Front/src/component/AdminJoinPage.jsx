
import React, { useContext, useEffect, useState } from 'react'

import '../css/admin.css';
import Dashboard from './admin/Dashboard.jsx';
import DiagDetail from './admin/DiagDetail.jsx';
import PromotionManagement from './admin/PromotionManagement.jsx';
import UserManagement from './admin/UserManagement.jsx';
import PestManagement from './admin/PestManagement.jsx';
import AdminDpList from './admin/AdminDpList.jsx';

import { AppData } from '../function/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

import Logo from '../assets/logo.png'
import navBar from '../assets/navBar.png'
import adminLogout from '../assets/logout.png'
import home from '../assets/userNanHome.png'

import Db from '../assets/userNavDb.png'; // 대시보드
import Um from '../assets/userNavUM.png'; // AI 문답
import Dp from '../assets/userNavDp.png'; // 도감
import My from '../assets/userNavMy.png'; // 사용자관리

function AdminJoinPage() {
    const [selectedButton, setSelectedButton] = useState('Diagnosis');// 현재 선택된 버튼 추적
    const [showDashboard, setShowDashboard] = useState(true); // 페이지 처음 로딩 시 Diagnosis 메뉴 활성화
    const [showDiagDetail, setShowDiagDetail] = useState(false);
    const [showPromotionManagement, setShowPromotionManagement] = useState(false);
    const [showUserManagement, setShowUserManagement] = useState(false);
    const [showPestManagement, setShowPestManagement] = useState(false);
    const [showAdminDpList, setShowAdminDpList] = useState(false);

    const shareData = useContext(AppData);
    const navigate = useNavigate();
    const [cropNum, setCropNum] = useState();
    const [dpNums, setDpNums] = useState([]);
    const [userNum, setUserNum] = useState();

    const menuBtnStyle = (button) => {
        return selectedButton === button ? {
            backgroundImage: 'url(' + navBar + ')',  // 배경 이미지 추가
            backgroundRepeat: 'no-repeat',  // 이미지 반복 방지
            backgroundPosition: '93% center',  // 이미지 위치
            backgroundSize: '5px auto'  // 이미지 크기 조정
        } : {};
    };

    const setActiveState = (menuBtnStyle) => {
        setSelectedButton(menuBtnStyle);
        setShowDashboard(menuBtnStyle === 'Dashboard');
        setShowDiagDetail(menuBtnStyle === 'DiagDetail');
        setShowPromotionManagement(menuBtnStyle === 'PromotionManagement');
        setShowUserManagement(menuBtnStyle === 'UserManagement');
        setShowPestManagement(menuBtnStyle === 'PestManagement');
        setShowAdminDpList(menuBtnStyle === 'AdminDpList');

    };

    const dashboard = () => setActiveState('Dashboard');
    const diagDetail = () => setActiveState('DiagDetail');
    const pestManagement = () => setActiveState('PestManagement');
    const promotionManagement = () => setActiveState('PromotionManagement');
    const userManagement = () => setActiveState('UserManagement');
    const adminDpList = () => setActiveState('AdminDpList');
    // const pesticidesDetail = () => setActiveState('PesticidesDetail');

    const logout = () => {
        sessionStorage.clear();
        shareData.setData(null);
        navigate('/');
    }

    const menuTextMapping = {
        Dashboard: "대시보드",
        PromotionManagement: "병해충 AI 검색",
        PestManagement: "병해충 도감",
        UserManagement: "사용자 관리",
        UserDetail:"사용자 관리"
      };

    return (
        <div id="adminBody">
            <div id="adminMainBox">
                <div id="adminLeftBox">
                    <ul id="adminMenuBox">
                        <li>
                            <button onClick={dashboard} style={menuBtnStyle('Dashboard')}>
                                <img src={Db} alt="대시보드" />
                            </button>
                        </li>
                        <li>
                            <button onClick={pestManagement} style={menuBtnStyle('PestManagement')}>
                                <img src={Dp} alt="병해충 도감" />
                            </button>
                        </li>
                        <li>
                            <button onClick={promotionManagement} style={menuBtnStyle('PromotionManagement')}>
                                <img src={Um} alt="병해충 AI 검색" />
                            </button>
                        </li>
                        <li>
                            <button onClick={userManagement} style={menuBtnStyle('UserManagement')}>
                                <img src={My} alt="사용자 관리" />
                            </button>
                        </li>
                    </ul>
                    <button id="adminLogoutButton" onClick={logout}>
                        <img src={adminLogout} alt="logout" />
                    </button>
                </div>
                <div id="adminRightBox">
                    <header>
                        <img src={Logo} className='adminLogo' alt="GROWELLLogo" />
                        {/* 선택된 메뉴에 따라 헤더 텍스트가 변경됩니다 */}
                        <span>{menuTextMapping[selectedButton]}</span>
                        <span>
                            <button id="homeBtn" onClick={dashboard} style={menuBtnStyle('Dashboard')}>
                                <img src={home} alt="" />
                            </button>
                            <input type="text" />
                        </span>
                    </header>
                    <div id='adminRightCon'>
                        {showDashboard && <Dashboard />}
                        {showDiagDetail && <DiagDetail />}
                        {showPestManagement && <PestManagement setActiveState={setActiveState} setCropNum={setCropNum} cropNum={cropNum}/>}
                        {showPromotionManagement && <PromotionManagement />}
                        {showUserManagement && <UserManagement/>}
                        {showAdminDpList && <AdminDpList setActiveState={setActiveState} cropNum={cropNum}/>}
                        {/* {showAiDiagnosis && <AiDiagnosis setActiveState={setActiveState} />}
                        {showSelfDiagnosis && <SelfDiagnosis setActiveState={setActiveState} setDpNums={setDpNums}/>}
                        {showHisDiagnosis && <HisDiagnosis setActiveState={setActiveState} dpNum={dpNum} setDpNum={setDpNum} />}
                        {showDpList && <DpList setActiveState={setActiveState} setDpNum={setDpNum} dpNums={dpNums} setDpNums={setDpNums}/>}
                        {showDpDetail && <DpDetail dpNum={dpNum} />}
                        {showFumigatorPesticides && <FumigatorPesticides setActiveState={setActiveState} />}
                        {showMyProfile && <MyProfile  setActiveState={setActiveState} />}*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminJoinPage