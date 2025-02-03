import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import '../css/all.css';
import '../css/user.css';
import MyProfile from './user/MyProfile.jsx';
import Diagnosis from './user/Diagnosis.jsx';
import AiDiagnosis from './user/AiDiagnosis.jsx'
import SelfDiagnosis from './user/SelfDiagnosis.jsx';
import HisDiagnosis from './user/HisDiagnosis.jsx';
import DpList from './user/DpList.jsx';
import DpDetail from './user/DpDetail.jsx';
import FumigatorPesticides from './user/FumigatorPesticides';
import HoverArrow from './user/HoverArrow.jsx'
import RightArrow from '../assets/right_arrow_black.png'

const UserJoinPage = () => {
    const [searchParams, SetSearchParams] = useSearchParams();
    const [selectedButton, setSelectedButton] = useState('Diagnosis');// 현재 선택된 버튼 추적
    const [showDiagnosis, setShowDiagnosis] = useState(false);
    const [showMyProfile, setShowMyProfile] = useState(false);
    const [showAiDiagnosis, setShowAiDiagnosis] = useState(false);
    const [showSelfDiagnosis, setShowSelfDiagnosis] = useState(false);
    const [showHisDiagnosis, setShowHisDiagnosis] = useState(false);
    const [showDpList, setShowDpList] = useState(false);
    const [showFumigatorPesticides, setShowFumigatorPesticides] = useState(false);

    const buttonStyle = (button) => {
        return selectedButton === button ? {
            fontWeight: '700', 
            color: '#333', 
            fontSize: '22px',
            backgroundImage: 'url('+RightArrow+')',  // 배경 이미지 추가
            backgroundRepeat: 'no-repeat',  // 이미지 반복 방지
            backgroundPosition: 'right center',  // 이미지 위치
            backgroundSize: '13px auto'  // 이미지 크기 조정
        } : {} ;
    };

    const setActiveState = (buttonType) => {
        setSelectedButton(buttonType);
        setShowDiagnosis(buttonType === 'Diagnosis');
        setShowAiDiagnosis(buttonType === 'AiDiagnosis');
        setShowSelfDiagnosis(buttonType === 'SelfDiagnosis');
        setShowMyProfile(buttonType === 'MyProfile');
        setShowHisDiagnosis(buttonType ==='HisDiagnosis')
        setShowDpList(buttonType === 'DpList')
        setShowFumigatorPesticides(buttonType === 'FumigatorPesticides')
    };

    const diagnosis = () => setActiveState('Diagnosis');
    const aiDiagnosis = () => setActiveState('AiDiagnosis');
    const myProfile = () => setActiveState('MyProfile');
    const selfDiagnosis = () => setActiveState('SelfDiagnosis');
    const hisDiagnosis = () => setActiveState('HisDiagnosis');
    const dpList = () => setActiveState('DpList');
    const fumigatorPesticides = () => setActiveState('FumigatorPesticides');
    
    return (
    <div id="userBody">
        <div id="userMainBox">
            <div id="userLeftBox">
                <h3>농부01<span>님</span></h3>
                <ul id="userMenuBox">
                    <li>
                        <HoverArrow>
                            <button onClick={diagnosis} style={buttonStyle('Diagnosis')}>병해충 진단</button>
                        </HoverArrow>
                        <ul className='togle'>
                            <li><HoverArrow><button onClick={aiDiagnosis} style={buttonStyle('AiDiagnosis')}>AI 진단</button></HoverArrow></li>
                            <li><HoverArrow><button onClick={selfDiagnosis} style={buttonStyle('SelfDiagnosis')}>자가진단</button></HoverArrow></li>
                            <li><HoverArrow><button onClick={hisDiagnosis} style={buttonStyle('HisDiagnosis')}>진단 이력 관리</button></HoverArrow></li>
                        </ul>
                    </li>
                    <li>
                        <HoverArrow><button onClick={dpList} style={buttonStyle('DpList')}>병해충 도감</button></HoverArrow>
                    </li>
                    <li>
                        <HoverArrow><button>농약 및 방제 정보</button></HoverArrow>
                        <ul className='togle'>
                            <li><HoverArrow><button onClick={fumigatorPesticides} style={buttonStyle('FumigatorPesticides')}>농약 정보</button></HoverArrow></li>
                            <li><HoverArrow><button>방제 정보</button></HoverArrow></li>
                        </ul>
                    </li>
                    <li>
                        <HoverArrow><button onClick={myProfile} style={buttonStyle('MyProfile')}>내정보 확인하기</button></HoverArrow>
                    </li>
                </ul>
            </div>
            <div id="userRightBox">
                {showDiagnosis && <Diagnosis />}
                {showMyProfile && <MyProfile />}
                {showAiDiagnosis && <AiDiagnosis />}
                {showSelfDiagnosis && <SelfDiagnosis />}
                {showHisDiagnosis && <HisDiagnosis />}
                {showDpList && <DpList />}
                {showFumigatorPesticides && <FumigatorPesticides />}
            </div>
        </div>
    </div>
  )
}

export default UserJoinPage;