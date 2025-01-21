import React, { useState } from 'react';
import '../css/jip.css';
import '../css/all.css';
import Join from '../../../react05/src/component/Join';

function JipJoinPage() {
const [showJoin, setShowJoin] = useState(false);
const [showIdFind, setShowIdFind] = useState(false);
const [showPwFind, setShowPwFind] = useState(false);
const join = () =>{
    setShowJoin(!showJoin);
}
const idFind = () =>{
    setShowIdFind(!showIdFind);
}
const pwFind = () =>{
    setShowPwFind(!showPwFind);
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
                        {showJoin&&<Join/>}
                    </div>
                </div>
            </div>
            
    </div>
  )
}

export default JipJoinPage;