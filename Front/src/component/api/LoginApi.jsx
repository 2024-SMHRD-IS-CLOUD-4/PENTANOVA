import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginApi = () => {
  const clientId = '22192e7a34b82d69230ba35d1b252067';
  const redirectUri = 'http://localhost:3000/kakao/callback';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isTrue2, setIsTrue2] = useState(true);
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_connect}/kakao/login`, null, {
          params: {
            code: code
          }
        })
        setData(response.data.user);
        if (response.data.user.role == '일반사용자') {
          setIsTrue2(false);
        } else {
          setIsTrue2(true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    kakaoLogin();

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

  }, [data]);
  const loginButton = () => {
    window.location.href = kakaoURL
  }

  return (
    <div>
      <button onClick={loginButton} className='button01'>카카오 로그인</button>
    </div>
  )
}

export default LoginApi