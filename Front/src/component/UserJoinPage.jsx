import React, { useContext, useEffect, useState } from 'react'
import '../css/user.css';
import RightArrow from '../assets/right_arrow_black.png'
import Diagnosis from './user/Diagnosis.jsx';
import AiDiagnosis from './user/AiDiagnosis.jsx'
import SelfDiagnosis from './user/SelfDiagnosis.jsx';
import HisDiagnosis from './user/HisDiagnosis.jsx';
import DpList from './user/DpList.jsx';
import DpDetail from './user/DpDetail.jsx';
import FumigatorPesticides from './user/FumigatorPesticides';
import Fumigator from './user/Fumigator.jsx'
import Pesticides from './user/Pesticides.jsx'
// import PesticidesDetail from './user/PesticidesDetail.jsx'
import MyProfile from './user/MyProfile.jsx';
import HoverArrow from './user/HoverArrow.jsx'
import ChangeProfile from './user/ChangeProfile.jsx';
import RequestAuth from './user/RequestAuth.jsx';
import { AppData } from '../function/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

import Di from '../assets/userNavDi.png';
import Dp from '../assets/userNavDp.png';
import Fp from '../assets/userNavFP.png';
import My from '../assets/userNavMy.png';

const UserJoinPage = () => {
    const [selectedButton, setSelectedButton] = useState('Diagnosis');// 현재 선택된 버튼 추적
    const [showDiagnosis, setShowDiagnosis] = useState(true); // 페이지 처음 로딩 시 Diagnosis 메뉴 활성화
    const [showAiDiagnosis, setShowAiDiagnosis] = useState(false);
    const [showSelfDiagnosis, setShowSelfDiagnosis] = useState(false);
    const [showHisDiagnosis, setShowHisDiagnosis] = useState(false);
    const [showDpList, setShowDpList] = useState(false);
    const [showDpDetail, setShowDpDetail] = useState(false);
    const [showFumigatorPesticides, setShowFumigatorPesticides] = useState(false);
    const [showFumigator, setShowFumigator] = useState(false);
    const [showPesticides, setShowPesticides] = useState(false);
    // const [showPesticidesDetail, setShowPesticidesDetail] = useState(false);
    const [showMyProfile, setShowMyProfile] = useState(false);
    const [showChangeProfile, setShowChangeProfile] = useState(false);
    const [showRequestAuth, setShowRequestAuth] = useState(false);
    
    const userData = useContext(AppData);
    const navigate = useNavigate();
    const [dpNum, setDpNum] = useState();
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
        setShowDiagnosis(buttonType === 'Diagnosis');
        setShowAiDiagnosis(buttonType === 'AiDiagnosis');
        setShowSelfDiagnosis(buttonType === 'SelfDiagnosis');
        setShowHisDiagnosis(buttonType === 'HisDiagnosis')
        setShowDpList(buttonType === 'DpList')
        setShowDpDetail(buttonType === 'DpDetail')
        setShowFumigatorPesticides(buttonType === 'FumigatorPesticides')
        setShowFumigator(buttonType === 'Fumigator')
        setShowPesticides(buttonType === 'Pesticides')
        // setShowPesticidesDetail(buttonType === 'PesticidesDetail')
        setShowMyProfile(buttonType === 'MyProfile');
        setShowChangeProfile(buttonType === 'ChangeProfile');
        setShowRequestAuth(buttonType === 'RequestAuth');
    };

    const diagnosis = () => setActiveState('Diagnosis');
    const aiDiagnosis = () => setActiveState('AiDiagnosis');
    const myProfile = () => setActiveState('MyProfile');
    const selfDiagnosis = () => setActiveState('SelfDiagnosis');
    const hisDiagnosis = () => setActiveState('HisDiagnosis');
    const dpList = () => setActiveState('DpList');
    const dpDetail = () => setActiveState('DpDetail');
    const fumigatorPesticides = () => setActiveState('FumigatorPesticides');
    const fumigator = () => setActiveState('Fumigator');
    const pesticides = () => setActiveState('Pesticides');
    // const pesticidesDetail = () => setActiveState('PesticidesDetail');

    const navChangeImages = {
        Diagnosis: Di,
        AiDiagnosis: Di,
        SelfDiagnosis: Di,
        HisDiagnosis: Di,
        DpList: Dp,
        DpDetail: Dp,
        FumigatorPesticides: Fp,
        Fumigator: Fp,
        Pesticides: Fp,
        MyProfile: My,
        RequestAuth: My,
        ChangeProfile: My
      };


    const logout = () => {
        sessionStorage.clear();
        userData.setData(null);
        navigate('/');
    }
    


    return (
        <div id="userBody">
            <div id="userMainBox">
                <div id="userLeftBox">
                    <h3>{userData.data?userData.data.nick:'비회원'}<span> 님</span></h3>
                    <ul id="userMenuBox">
                        <li>
                            <HoverArrow>
                                <button onClick={diagnosis} style={buttonStyle('Diagnosis')}>병해충 진단</button>
                            </HoverArrow>
                            <ul className='togle'>
                                <li>
                                    <HoverArrow>
                                        <button onClick={aiDiagnosis} style={buttonStyle('AiDiagnosis')}>AI 진단</button>
                                    </HoverArrow>
                                </li>
                                <li>
                                    <HoverArrow>
                                        <button onClick={selfDiagnosis} style={buttonStyle('SelfDiagnosis')}>자가진단</button>
                                    </HoverArrow>
                                </li>
                                <li>
                                    <HoverArrow>
                                        <button onClick={hisDiagnosis} style={buttonStyle('HisDiagnosis')}>진단 이력 관리</button>
                                    </HoverArrow>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <HoverArrow>
                                <button onClick={dpList} style={buttonStyle('DpList')}>병해충 도감</button>
                            </HoverArrow>
                        </li>
                        <li>
                            <HoverArrow>
                                <button onClick={fumigatorPesticides} style={buttonStyle('FumigatorPesticides')}>농약 및 방제 정보</button>
                            </HoverArrow>
                            <ul className='togle'>
                                <li>
                                    <HoverArrow>
                                        <button onClick={pesticides} style={buttonStyle('Pesticides')}>농약 정보</button>
                                    </HoverArrow>
                                </li>
                                <li>
                                    <HoverArrow>
                                        <button onClick={fumigator} style={buttonStyle('Fumigator')}>방제 정보</button>
                                    </HoverArrow>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <HoverArrow><button onClick={myProfile} style={buttonStyle('MyProfile')}>내정보 확인하기</button></HoverArrow>
                        </li>
                    </ul>
                    <button id="logoutButton" onClick={logout}>로그아웃</button>
                </div>
                <div id="userRightBox">
                    {showDiagnosis && <Diagnosis setActiveState={setActiveState} />}
                    {showAiDiagnosis && <AiDiagnosis setActiveState={setActiveState} />}
                    {showSelfDiagnosis && <SelfDiagnosis setActiveState={setActiveState} setDpNums={setDpNums}/>}
                    {showHisDiagnosis && <HisDiagnosis setActiveState={setActiveState} dpNum={dpNum} setDpNum={setDpNum} />}
                    {showDpList && <DpList setActiveState={setActiveState} setDpNum={setDpNum} dpNums={dpNums} setDpNums={setDpNums}/>}
                    {showDpDetail && <DpDetail dpNum={dpNum} />}
                    {showFumigatorPesticides && <FumigatorPesticides setActiveState={setActiveState} />}
                    {showFumigator && <Fumigator />}
                    {showPesticides && <Pesticides />}
                    {showMyProfile && <MyProfile  setActiveState={setActiveState} />}
                    {showChangeProfile&&<ChangeProfile/>}
                    {showRequestAuth&&<RequestAuth/>}
                    {/* {showPesticidesDetail && <PesticidesDetail />} */}
                    <nav id='userBtnNav'>
                        {/* 선택된 페이지에 따라 해당하는 이미지가 표시됩니다. */}
                        <button id='userNavChange'>
                            <img 
                            src={navChangeImages[selectedButton] /* || defaultImage */} 
                            alt={selectedButton} 
                            />
                        </button>
                        <button id='userNavDi'>
                            <img src={Di} alt="병해충 진단" onClick={diagnosis} />
                        </button>
                        <button id='userNavDp'>
                            <img src={Dp} alt="병해충 도감" onClick={dpList} />
                        </button>
                        <button id='userNavFP'>
                            <img src={Fp} alt="농약 및 방제 정보" onClick={fumigatorPesticides} />
                        </button>
                        <button id='userNavMy'>
                            <img src={My} alt="내정보 확인하기"  onClick={myProfile} />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default UserJoinPage;