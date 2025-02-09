
import React, { useContext, useEffect, useState } from 'react'

import '../css/admin.css';
import RightArrow from '../assets/right_arrow_black.png'
import Dashboard from './admin/Dashboard.jsx';
import DiagDetail from './admin/DiagDetail.jsx';
import PromotionManagement from './admin/PromotionManagement.jsx';
import UserManagement from './admin/UserManagement.jsx';
import UserDetail from './admin/UserDetail.jsx';
import PestManagement from './admin/PestManagement.jsx';
import AdminDpList from './admin/AdminDpList.jsx';

import { AppData } from '../function/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

import Logo from '../assets/logo.png'
import adminLogout from '../assets/logout.png'

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
    const [showUserDetail, setShowUserDetail] = useState(false);
    const [showPestManagement, setShowPestManagement] = useState(false);
    const [showAdminDpList, setShowAdminDpList] = useState(false);
    const [showCropList, setShowCropList] = useState(false);

    const shareData = useContext(AppData);
    const navigate = useNavigate();
    const [cropNum, setCropNum] = useState();
    const [dpNums, setDpNums] = useState([]);

    const buttonStyle = (button) => {
        return selectedButton === button ? {
            fontWeight: '700',
            color: '#333',
            fontSize: '22px',
            backgroundImage: 'url(' + RightArrow + ')',  // 배경 이미지 추가
            backgroundRepeat: 'no-repeat',  // 이미지 반복 방지
            backgroundPosition: 'right center',  // 이미지 위치
            backgroundSize: '13px auto'  // 이미지 크기 조정
        } : {};
    };

    const setActiveState = (buttonType) => {
        setSelectedButton(buttonType);
        setShowDashboard(buttonType === 'Dashboard');
        setShowDiagDetail(buttonType === 'DiagDetail');
        setShowPromotionManagement(buttonType === 'PromotionManagement');
        setShowUserManagement(buttonType === 'UserManagement');
        setShowUserDetail(buttonType === 'UserDetail');
        setShowPestManagement(buttonType === 'PestManagement');
        setShowAdminDpList(buttonType === 'AdminDpList');

    };

    const dashboard = () => setActiveState('Dashboard');
    const diagDetail = () => setActiveState('DiagDetail');
    const pestManagement = () => setActiveState('PestManagement');
    const promotionManagement = () => setActiveState('PromotionManagement');
    const userManagement = () => setActiveState('UserManagement');
    const userDetail = () => setActiveState('UserDetail');
    const adminDpList = () => setActiveState('AdminDpList');
    // const pesticidesDetail = () => setActiveState('PesticidesDetail');

    const logout = () => {
        sessionStorage.clear();
        shareData.setData(null);
        navigate('/');
    }

    return (
        <div id="adminBody">
            <div id="adminMainBox">
                <div id="adminLeftBox">
                    <ul id="adminMenuBox">
                        <li>
                            <button onClick={dashboard} style={buttonStyle('Dashboard')}>
                                <img src={Db} alt="대시보드" />
                            </button>
                        </li>
                        <li>
                            <button onClick={promotionManagement} style={buttonStyle('PromotionManagement')}>
                                <img src={Um} alt="병해충 AI 검색" />
                            </button>
                        </li>
                        <li>
                            <button onClick={pestManagement} style={buttonStyle('PestManagement')}>
                                <img src={Dp} alt="병해충 도감" />
                            </button>
                        </li>
                        <li>
                            <button onClick={userManagement} style={buttonStyle('UserManagement')}>
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
                        <div>
                            <button>홈버튼</button>
                            <label htmlFor="">검색하는 곳</label>
                            <input type="text" />
                        </div>
                    </header>

                    {showDashboard && <Dashboard />}
                    {showDiagDetail && <DiagDetail />}
                    {showPestManagement && <PestManagement setActiveState={setActiveState} setCropNum={setCropNum} cropNum={cropNum}/>}
                    {showPromotionManagement && <PromotionManagement />}
                    {showUserManagement && <UserManagement />}
                    {showUserDetail && <UserDetail />}
                    {showAdminDpList && <AdminDpList cropNum={cropNum}/>}
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
    )
}

export default AdminJoinPage