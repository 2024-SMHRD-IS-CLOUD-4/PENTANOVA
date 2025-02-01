import React from 'react'

const LoginApi = () => {
  const Rest_api_key = '27ea55845cbe29c957aa49b07e296a18'
  const redirect_uri = 'http://localhost:3000/auth'
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  const handleLogin = () => {
    window.location.href = kakaoURL
  }
  return (
    <div>
      <button onClick={handleLogin}>카카오 로그인</button>
    </div>
  )
}

export default LoginApi