import React, { useState } from 'react';
import '../css/jip.css';
import '../css/all.css';
import Join from './Join'
import IdFind from './IdFind';
import PwFind from './PwFind';

function JipJoinPage() {
    const [showJoin, setShowJoin] = useState(true);
    const [showIdFind, setShowIdFind] = useState(false);
    const [showPwFind, setShowPwFind] = useState(false);
    const join = () => {
        setShowJoin(true);
        setShowIdFind(false);
        setShowPwFind(false);
    }
    const idFind = () => {
        setShowJoin(false);
        setShowIdFind(true);
        setShowPwFind(false);
    }

    const pwFind = () => {
        setShowJoin(false);
        setShowIdFind(false);
        setShowPwFind(true);
    }

    return (
        <div>
            <div id="jipBody">
                <div id="jipMainBox">
                    <div class="jipleftBox">
                        <ul>
                            <li><button onClick={join}>회원가입</button></li>
                            <li><button onClick={idFind}>아이디찾기</button></li>
                            <li><button onClick={pwFind}>비밀번호 찾기</button></li>
                        </ul>
                    </div>
                    <div class="jipRightBox">
                        {showJoin && <Join />}
                        {showIdFind && <IdFind />}
                        {showPwFind && <PwFind />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JipJoinPage;