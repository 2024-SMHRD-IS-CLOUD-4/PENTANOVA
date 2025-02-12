import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppData } from '../function/AuthContext';
import axios from 'axios';
import logo from "../assets/logo.png";
import rightArrow from "../assets/right_arrow.png";
import farmer from "../assets/farmerFit.png";
import appleM from "../assets/appleM.png";
import "../css/login.css";
import "../css/all.css";

//날씨 아이콘 불러오기
import clear from "../assets/clear.png";
import clouds from "../assets/clouds.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import mist from "../assets/mist.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";

const Login = () => {
  const shareData = useContext(AppData);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    userPw: ''
  });

  // 🌟 새로운 날씨 상태 추가
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);

  // 🌟 날씨 설명 매핑
  const weatherDescriptionMap = {
    "clear sky": "맑은 하늘",
    "few clouds": "구름 조금",
    "scattered clouds": "흩어진 구름",
    "broken clouds": "조각 구름",
    "shower rain": "소나기",
    "rain": "비",
    "thunderstorm": "천둥번개",
    "snow": "눈",
    "mist": "안개",
  };

   // 🌟 날씨 아이콘 매핑
   const weatherIcons = {
    "Clear": clear,        // 맑음
    "Clouds": clouds,      // 구름 많음
    "Drizzle": drizzle,    // 이슬비
    "Humidity": humidity,  // 습도
    "Mist": mist,          // 안개
    "Rain": rain,          // 비
    "Snow": snow,          // 눈
  };

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
    if (isLoggedIn && user) {
      if (user.role === '일반사용자') {
        navigate('/UserJoinPage');
      } else {
        navigate('/AdminJoinPage');
      }
    }
  }, [isLoggedIn, navigate, user]);

  // 🌟 날씨 데이터 가져오기
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `${process.env.REACT_APP_connect}/api/weatherApi?city=GwangJu`
        );
        setWeather(response.data);
      } catch (error) {
        setError("날씨 정보를 불러오는 데 실패했습니다.");
      }
    };
    fetchWeather();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function joinClick() {
    navigate('/jip');
  }

  function idPWClick() {
    navigate('/jip?type=id');
  }

  const loginButton = () => {
    const clientId = `${process.env.REACT_APP_rest_api_key}`;
    const redirectUri = `${process.env.REACT_APP_redirect_uri}`;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoURL;
  };

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
      setUser(user);
      shareData.setData(user);
      setIsLoggedIn(true);
      alert('반갑습니다!' + user.nick + '님');

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
      <div id="loginMainBox">
         {/* 로그인 페이지 오른쪽 날씨 박스 */}
         <div id="loginWeatherBox">
          {error ? (
            <p style={{ color: "red", fontSize: "1.2rem" }}>{error}</p>
          ) : weather ? (
            <div className="wbAll">
              <h1 style={{ fontSize: "24px", marginTop:"25px", marginBottom: "25px" }}>오늘의 날씨</h1>
              <img
                src={weatherIcons[weather.weather[0].main] || mist} // 기본 아이콘 설정
                alt="날씨 아이콘"
                style={{ width: "203px", height: "auto" }}
              />
              <p style={{ fontSize: "3rem", fontWeight: "bold" }}>{weather.main.temp}°C</p>
              <p>{weatherDescriptionMap[weather.weather[0].description] || weather.weather[0].description}</p>
              <span style={{marginRight:"20px"}}>습도: {weather.main.humidity}%</span>
              <span>풍속: {weather.wind.speed} km/h</span>
            </div>
          ) : (
            null
          )}
        </div>

        {/* 로그인 박스 */}
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
              <button className='button01' type="button" onClick={loginButton}>카카오 로그인</button>
            </form>
            <div className="loginBoxBt">
              <button onClick={joinClick}>회원가입</button>
              <button onClick={idPWClick}>아이디/비밀번호 찾기</button>
            </div>
          </div>
        </div>

        {/* 공지사항 박스 */}
        <div id="loginNoticeBox" onClick={() => window.location.href = 'https://www.rda.go.kr/main/mainPage.do'}>
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