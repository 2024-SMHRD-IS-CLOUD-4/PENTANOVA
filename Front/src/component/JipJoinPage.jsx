import React, { useState, useEffect } from 'react';
import '../css/jip.css';
import '../css/all.css';
import Join from './jip/Join'
import IdFind from './jip/IdFind';
import PwFind from './jip/PwFind';
import farmer from "../assets/farmer.png"
import appleM from "../assets/appleM.png"
import { useNavigate, useSearchParams } from 'react-router-dom';

function JipJoinPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showJoin, setShowJoin] = useState(false);
    const [showIdFind, setShowIdFind] = useState(false);
    const [showPwFind, setShowPwFind] = useState(false);
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState('join'); // 현재 선택된 버튼 추적
    useEffect(()=>{
        let type = searchParams.get('type');
        if(type==='id'){
            setShowIdFind(true);
            setSelectedButton('idFind')
        }else{
            setShowJoin(true);
            setSelectedButton('join');
        }
    },[])
    const join = () => {
        setSelectedButton('join');
        setShowJoin(true);
        setShowIdFind(false);
        setShowPwFind(false);
    }
    const idFind = () => {
        setSelectedButton('idFind')
        setShowJoin(false);
        setShowIdFind(true);
        setShowPwFind(false);
    }

    const pwFind = () => {
        setSelectedButton('pwFind')
        setShowJoin(false);
        setShowIdFind(false);
        setShowPwFind(true);
    }
    function loginClick(){
        navigate('/');
      }
    // 선택된 버튼에 스타일을 추가하는 함수
    const buttonStyle = (button) => {
        return selectedButton === button ? {fontWeight: '700', color: '#333', fontSize:'22px'} : {} ;
    };

    return (
        <div>
            <div id="jipBody">
                <div id="jipMainBox">
                    <div className="jipleftBox">
                        <ul>
                            <li><button onClick={join} style={buttonStyle('join')}>회원가입</button></li>
                            <li><button onClick={idFind} style={buttonStyle('idFind')}>아이디찾기</button></li>
                            <li><button onClick={pwFind} style={buttonStyle('pwFind')}>새 비밀번호 설정</button></li>
                            <li className='jipLiLast'><button onClick={loginClick} >로그인하러가기</button></li>
                        </ul>
                    </div>
                    <div class="jipRightBox">
                        {showJoin && <Join />}
                        {showIdFind && <IdFind />}
                        {showPwFind && <PwFind />}
                    </div>
                </div>
                <img class="bgimgFarmer" src={farmer} alt="farmer" />
                <img class="bgimgAppleM"src={appleM} alt="appleM" />
            </div>
        </div>
    )
}

export default JipJoinPage;