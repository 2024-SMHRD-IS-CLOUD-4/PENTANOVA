import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../css/all.css';
import '../css/user.css';
import MyProfile from './user/MyProfile.jsx';
import Diagnosis from './user/Diagnosis.jsx';
import Uploader from './user/AiDiagnosis.jsx'
import SelfDiagnosis from './user/SelfDiagnosis';
import HisDiagnosis from './user/HisDiagnosis';
import DpList from './user/DpList';
import DpDetail from './user/DpDetail.jsx';
import FumigatorPesticides from './user/FumigatorPesticides';

const UserJoinPage = () => {
    const [searchParams] = useSearchParams();
    const [selectedButton, setSelectedButton] = useState('join');
    const [showJoin, setShowJoin] = useState(false);
    const [showIdFind, setShowIdFind] = useState(false);
    const [showPwFind, setShowPwFind] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let type = searchParams.get('type');
        if (type === 'id') {
            setShowIdFind(true);
            setSelectedButton('idFind');
        } else {
            setShowJoin(true);
            setSelectedButton('join');
        }
    }, []);

    const setActiveState = (buttonType) => {
        setSelectedButton(buttonType);
        setShowJoin(buttonType === 'join');
        setShowIdFind(buttonType === 'idFind');
        setShowPwFind(buttonType === 'pwFind');
    };

    const join = () => setActiveState('join');
    const idFind = () => setActiveState('idFind');
    const pwFind = () => setActiveState('pwFind');

    function loginClick() {
        navigate('/');
    }
    return (
    <div id='userBody'>
        <div id="userMainBox">
            <div id="userLeftBox">
                <h2>농부01님</h2>
                <ul>
                    <li>
                        <p>병해충 진단</p>
                        <ul>
                            <li>AI 진단</li>
                            <li>자가진단</li>
                            <li>진단 이력 관리</li>
                        </ul>
                    </li>
                    <li>
                        병해충 도감
                    </li>
                    <li>
                        농약 및 방제 정보
                        <ul>
                            <li>농약 정보</li>
                            <li>방제 정보</li>
                        </ul>
                    </li>
                    <li>
                        내정보 확인하기
                    </li>
                </ul>
            </div>
            <div id="userRightBox">

            </div>
        </div>
    </div>
  )
}

export default UserJoinPage;