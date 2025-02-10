import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppData } from '../../function/AuthContext';
import axios from 'axios';

const UserDetail = ({ user }) => { // `props.user`를 받음
  const shareData = useContext(AppData);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = user?.id || searchParams.get('id'); // `props.user.id`가 있으면 사용하고, 없으면 URL에서 가져옴
  const [userData, setUserData] = useState(user || null); // 초기값을 `props.user`로 설정

  useEffect(() => {
    if (!userId) return; // `userId`가 없으면 요청 안 함

    const fetchUserDetail = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_connect}/user/selectOne`, null, {
          params: { id: userId },
        });
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // `props.user`가 없을 때만 API 요청 실행
    if (!user) {
      fetchUserDetail();
    }
  }, [userId, user]); // `userId`나 `user`가 변경될 때 실행

  const authorization = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_connect}/user/authorization`, null, {
        params: { id: userId },
      });
      alert('갱신 완료!');
      navigate('/users');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id='udMainBox'>
      {userData ? (
        <>
          <div id='udConBoxL'>
            <p><span>비밀번호</span><span>{userData.pw}</span><span>전화번호</span><span>{userData.phone}</span></p>
            <p><span>거주지역</span><span>{userData.location}</span></p>
            {shareData.data.role === "관리자" && userData.requestAuth && (
              <button onClick={authorization}>권한 부여</button>
            )}
          </div>
          <div id='udConBoxR'>
            <div>
              <button className='sBtn'> 병충해 등록 데이터 확인</button><br />
              <button className='sBtn'> 회원정보 수정</button>
              <button className='sBtn'> 권한 {user.role === '일반사용자' ? (user.requestAuth ? "요청" : "미요청") : null}</button>
            </div>
          </div>
        </>
        
      ) : (
        <p>사용자 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default UserDetail;
