import React from 'react'


const LoginApi = () => {
  const clientId = '22192e7a34b82d69230ba35d1b252067';
  const redirectUri = 'http://localhost:3000/kakao/callback';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
  const handleLogin = () => {
    window.location.href = kakaoURL
  }



  return (
    <div>
      <button onClick={handleLogin}>카카오 로그인</button> <br />
      {kakaoURL}
    </div>
  )
}

export default LoginApi