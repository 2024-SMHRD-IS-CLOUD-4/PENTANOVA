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
    <div>
      <h1>UserDetail</h1>
      {userData ? (
        <>
          <p>닉네임: {userData.nick}</p>
          <p>아이디: {userData.id}</p>
          {shareData.data.role === "관리자" && userData.requestAuth && (
            <button onClick={authorization}>권한 부여</button>
          )}
        </>
      ) : (
        <p>사용자 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default UserDetail;
