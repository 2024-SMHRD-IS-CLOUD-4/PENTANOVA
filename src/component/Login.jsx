import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppData } from '../function/AuthContext';
import axios from 'axios'
import logo from "../assets/logo.png";
import rightArrow from "../assets/right_arrow.png";
import "../css/login.css";
import "../css/all.css";
const Login = () => {
  const shareData = useContext(AppData);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isTrue2, setIsTrue2] = useState(true);
  const [formData, setFormData] = useState({
    userId: '',
    userPw: ''
  });
  const today = new Date();
  let year = today.getFullYear();
  let month = ('0' + today.getMonth()+1).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);

  useEffect(() => {
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
        isTrue: true,
        isTrue2: isTrue2
      };

      sessionStorage.setItem("user", JSON.stringify(user));
      if (user.role === '일반사용자') {
        navigate('/diagnosis')
      } else {
        navigate('/dashboard');
      }
    }
  }, [data, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8093/PTNV/user/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.status === 200) {
        setData(response.data);
        shareData.setData(data);
        console.log(response.data);
        if (response.data.role === '일반사용자') {
          setIsTrue2(false);
        } else {
          setIsTrue2(true);
        }
        alert('로그인 성공!');
      }
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
    //로그인박스, 공지사항 보기, 날씨 총 3개 박스 가운데 정렬하는 div
    <div id="loginMainBox">
      {/* 로그인 페이지 오른쪽 날씨 박스 */}
      <div id="loginWeatherBox">
        
      </div>
      {/* 로그인 페이지 왼쪽 상단 로그인 박스 */}
      <div id="loginBox">
        <img class="logo" src={logo} alt="GROWELL Logo" />
        <div class="loginBox">
          <form className="login-form" onSubmit={handleSubmit}>
        
            <div class="loginIdPwBox">
                <label htmlFor="id">ID</label>
                <input type="text" name="id" id="id" placeholder='e-mail@gmail.com' onChange={handleChange} required />
            </div>

            <div class="loginIdPwBox">
              <label htmlFor="password">PW</label>
              <input type="password" name="pw" id="password" onChange={handleChange} required/>
            </div>
            <button type="submit">로그인</button>
            <button type="button">간편 로그인</button>
          </form>
          <div class="loginBoxBt">
            <button>아이디/비밀번호 찾기</button>
            <button> 회원가입 </button>
          </div>
        </div>
      </div>
      {/* 로그인 페이지 왼쪽 하단 최근 공지사항 바로보기 박스 */}
      <div id="loginNoticeBox"> {/*div 외부 링크로 이동시키는 방법 적용하기*/}
          <img src={rightArrow} alt="공지사항 바로가기"/>
          <p>{year}.{month}.{day}</p>
          <h1>최근 공지사항 <br />바로보기</h1>
          <p>한국농촌진흥청</p>
      </div>
      
    </div>
  );
};
export default Login;