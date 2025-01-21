import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppData } from '../function/AuthContext'
import useConfirm from '../function/UseConfirm';
import axios from 'axios'

const MyProfile = () => {
    const confirm = useConfirm();
    const shareData = useContext(AppData);
    const navigate = useNavigate();
    const DeleteUser = async () => {
        try {
            const response = await axios.delete(`http://localhost:8093/PTNV/user/deleteUser/${shareData.data.id}`);
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
        <div>
            <h1>MyProfile</h1>
            <ul>
                <li>
                    {shareData.data ? shareData.data.id: null}
                </li>
                <li>
                    {shareData.data ? shareData.data.nick : null}
                </li>
                <li>
                    {shareData.data ? (shareData.data.rank==0?'일반사용자':'관리자') : null}
                </li>
                <li>
                    {shareData.data ? shareData.data.tel : null}
                </li>
                <li>
                    {shareData.data ? shareData.data.location : null}
                </li>
                <li>
                    {shareData.data ? shareData.data.institue : null}
                </li>
            </ul>
            <button onClick={()=>{navigate('/changeProfile')}}>수정하기</button>
            <button onClick={deleteUser}>회원탈퇴</button>
            <button onClick={()=>{navigate('/requestAuth')}}>권한 요청</button>
        </div>
    )
}

export default MyProfile