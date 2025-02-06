import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppData } from '../../function/AuthContext'
import useConfirm from '../../function/UseConfirm';
import axios from 'axios'
import logo from '../../assets/logo.png'

const MyProfile = () => {
    const confirm = useConfirm();
    const shareData = useContext(AppData);
    const navigate = useNavigate();
    const DeleteUser = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_connect}/user/deleteUser/${shareData.data.id}`);
            console.log(response.data);
            alert("회원 탈퇴가 완료되었습니다.");
            shareData.setData(null);
            sessionStorage.clear();
            navigate('/');
        } catch (error) {
            console.error("회원 탈퇴 실패:", error);
            if (error.response) {
                alert(error.response.data);
            } else {
                alert("회원 탈퇴 중 오류가 발생했습니다.");
            }
        }
    };
    const deleteUser = () =>{
        const result = confirm('탈퇴?')
        if(result){
            DeleteUser();
        }
    }
    return (
        // 내 정보 확인하기
        <div id='myMainBox'>
            <img className='smallLogo' src={logo} alt="GROWELL" />

            <div id='myConBox'>
                <p>반갑습니다!<span></span></p>
                <h3>{shareData.data.nick}<span> 님</span></h3>
                <ul>
                    <li>
                        <p>아이디<span>(이메일형식)</span></p>
                        <p>{shareData.data ? shareData.data.id: null}</p>
                    </li>
                    <li>
                        <p>비밀번호</p>
                        <p>{shareData.data ? shareData.data.pw: null}</p>
                    </li>
                    <li>
                        <p>회원 등급<button onClick={()=>{navigate('/requestAuth')}}>권한 요청</button></p>
                        <p>{shareData.data ? shareData.data.role : null}</p>
                    </li>
                    <li>
                        <p>연락처</p>
                        <p>{shareData.data ? shareData.data.phone : null}</p>
                    </li>
                    <li>
                        <p>지역</p>
                        <p>{shareData.data ? shareData.data.location : null}</p>
                    </li>
                    <li> 
                        <p>{shareData.data ? shareData.data.institue : null}</p>
                    </li>
                </ul>
                <button>AI, 자가 진단 이력 관리</button>
                <button onClick={()=>{navigate('/changeProfile')}}>회원정보 수정</button>
                <button onClick={deleteUser}>회원탈퇴</button>             
            </div>
        </div>
    )
}

export default MyProfile