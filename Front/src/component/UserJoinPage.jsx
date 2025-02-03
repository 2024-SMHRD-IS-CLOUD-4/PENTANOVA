import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
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

const UserJoinPage = () => {
    const [searchParams] = useSearchParams();
    const [selectedButton, setSelectedButton] = useState('Diagnosis');// 현재 선택된 버튼 추적
    const [showDiagnosis, setShowDiagnosis] = useState(false);
    const [showMyProfile, setShowMyProfile] = useState(false);
    const [showAiDiagnosis, setShowAiDiagnosis] = useState(false);
    const [showSelfDiagnosis, setShowSelfDiagnosis] = useState(false);
    const [showHisDiagnosis, setShowHisDiagnosis] = useState(false);
    const [showDpList, setShowDpList] = useState(false);
    const [showFumigatorPesticides, setShowFumigatorPesticides] = useState(false);

    const navigate = useNavigate();

    const buttonStyle = (button) => {
        return selectedButton === button ? {fontWeight: '700', color: '#333', fontSize:'22px'} : {} ;
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
    <div id='userBody'>
        <div id="userMainBox">
            <div id="userLeftBox">
                <h2>농부01님</h2>
                <ul>
                    <li>
                        <p><button onClick={diagnosis} style={buttonStyle('Diagnosis')}>병해충 진단</button></p>
                        <ul>
                            <li><button onClick={aiDiagnosis} style={buttonStyle('AiDiagnosis')}>AI 진단</button></li>
                            <li><button onClick={selfDiagnosis} style={buttonStyle('SelfDiagnosis')}>자가진단</button></li>
                            <li><button onClick={hisDiagnosis} style={buttonStyle('HisDiagnosis')}>진단 이력 관리</button></li>
                        </ul>
                    </li>
                    <li>
                        <button onClick={dpList} style={buttonStyle('DpList')}>병해충 도감</button>
                    </li>
                    <li>
                        농약 및 방제 정보
                        <ul>
                            <li><button onClick={fumigatorPesticides} style={buttonStyle('FumigatorPesticides')}>농약 정보</button></li>
                            <li>방제 정보</li>
                        </ul>
                    </li>
                    <li>
                        <button onClick={myProfile} style={buttonStyle('MyProfile')}>내정보 확인하기</button>
                        
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