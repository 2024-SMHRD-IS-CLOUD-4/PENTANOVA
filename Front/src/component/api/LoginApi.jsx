import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppData } from '../../function/AuthContext';


const LoginApi = () => {
 
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isTrue2, setIsTrue2] = useState(true);
  const code = new URL(window.location.href).searchParams.get("code");
  const shareData = useContext(AppData);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      shareData.setData(parsedUser);
      setIsLoggedIn(true);
    }

  const kakaoLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_connect}/kakao/login`, null, {
        params: {
          code: code
        }
      })
      console.log(response.data);
      const userData = response.data.user;
      const user = {
        id: userData.id,
        pw: userData.pw,
        role: userData.role,
        nick: userData.nick,
        phone: userData.phone,
        location: userData.location,
        institute: userData.institute,
        createdAt: userData.createdAt,
        requsetAuth: userData.rerequsetAuth,
        isTrue: true,
        isTrue2: userData.role === '일반사용자' ? false : true
      };

      sessionStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      shareData.setData(user);
      setIsLoggedIn(true);
      alert('로그인 성공!');
    } catch (error) {
      if (error.response) {
        alert('로그인 실패 ');
      } else if (error.request) {
        alert('서버로부터 응답이 없습니다. 서버 상태를 확인해주세요.');
      } else {
        alert('서버와 연결할 수 없습니다.');
      }
    }
  }

    if (data) {
      const user = {
        id: data.id,
        pw: data.pw,
        role: data.role,
        nick: data.nick,
        phone: data.phone,
        location: data.location,
        institute: data.institute,
        createdAt: data.createdAt,
        requsetAuth: data.rerequsetAuth,
        isTrue: true,
        isTrue2: isTrue2
      };
      console.log(data)
      sessionStorage.setItem("user", JSON.stringify(user));
      if (data.pw) {
        navigate('/diagnosis')
      } else {
        navigate('/dashboard')
      }
    }
    kakaoLogin();
  }, [data]);

  useEffect(() => {
    // 로그인 상태에 따라 페이지 이동
    if (isLoggedIn) {
      if (user.role === '일반사용자') {
        navigate('/UserJoinPage');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isLoggedIn, navigate, user]);
  

  return (
    <div>
    </div>
  )
}

export default LoginApi