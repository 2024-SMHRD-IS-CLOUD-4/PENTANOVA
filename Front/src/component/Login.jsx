import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppData } from '../function/AuthContext';
import axios from 'axios'
import logo from "../assets/logo.png";
import rightArrow from "../assets/right_arrow.png";
import farmer from "../assets/farmerFit.png"
import appleM from "../assets/appleM.png"
import LoginApi from './api/LoginApi';
import "../css/login.css";
import "../css/all.css";

const Login = () => {
  const shareData = useContext(AppData);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    userPw: ''
  });
  const today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      shareData.setData(parsedUser);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // 로그인 상태에 따라 페이지 이동
    if (isLoggedIn) {
      if (user.role === '일반사용자') {
        navigate('/UserJoinPage');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isLoggedIn, navigate, user]); // isLoggedIn 의존성 추가

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  function joinClick() {
    navigate('/jip');
  }
  function idPWClick() {
    navigate('/jip?type=id')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_connect}/user/login`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const userData = response.data;
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
      setUser(user); // user state 업데이트
      shareData.setData(user); // AppData context 업데이트
      setIsLoggedIn(true);
      alert('로그인 성공!');

    } catch (error) {
      if (error.response) {
        alert('로그인 실패 : 아이디와 비밀번호를 확인하세요');
      } else if (error.request) {
        alert('서버로부터 응답이 없습니다. 서버 상태를 확인해주세요.');
      } else {
        alert('서버와 연결할 수 없습니다.');
      }
    }
  };

  return (
    <div id='loginBody'>
      {/* 로그인박스, 공지사항 보기, 날씨 총 3개 박스 가운데 정렬하는 div */}
      <div id="loginMainBox">
        {/* 로그인 페이지 오른쪽 날씨 박스 */}
        <div id="loginWeatherBox">

        </div>
        {/* 로그인 페이지 왼쪽 상단 로그인 박스 */}
        <div id="loginBox">
          <img className="logo" src={logo} alt="GROWELL Logo" />
          <div className="loginBox">
            <form className="login-form" onSubmit={handleSubmit}>

              <div className="loginIdPwBox">
                <label htmlFor="id">ID</label>
                <input type="text" name="id" id="id" placeholder='e-mail@gmail.com' onChange={handleChange} required />
              </div>

              <div className="loginIdPwBox">
                <label htmlFor="password">PW</label>
                <input type="password" name="pw" id="password" onChange={handleChange} required />
              </div>
              <button className='button01' type="submit">로그인</button>
              <button className='button01' type="button" onClick={() => navigate('/kakao/callback')}>간편 로그인</button>
            </form>
            <div className="loginBoxBt">
              <button onClick={idPWClick}>아이디/비밀번호 찾기</button>
              <button onClick={joinClick}>회원가입</button>
            </div>
          </div>
        </div>
        {/* 로그인 페이지 왼쪽 하단 최근 공지사항 바로보기 박스 */}
        <div id="loginNoticeBox"> {/*div 외부 링크로 이동시키는 방법 적용하기*/}
          <img src={rightArrow} alt="공지사항 바로가기" />
          <p>{year}.{month}.{day}</p>
          <h1>최근 공지사항 <br />바로보기</h1>
          <p>한국농촌진흥청</p>
        </div>

      </div>
      {/* 배경 이미지 */}
      <img className="bgimgFarmer" src={farmer} alt="farmer" />
      <img className="bgimgAppleM" src={appleM} alt="appleM" />
    </div>
  );
};
export default Login;