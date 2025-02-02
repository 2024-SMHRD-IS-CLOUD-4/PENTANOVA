import React from 'react'
import LoginApi from './api/LoginApi'
import axios from 'axios'

const FumigatorPesticides = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const encodedCode = encodeURIComponent(code);
  console.log(encodedCode);
  const kakaoSignIn = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_connect}/kakao/callback`, null, {
        params: {
          code: encodedCode
        }

      })
      console.log(response.data)

    } catch (error) {

    }

  }

  return (
    <div>
      <br></br>
      <br></br>
      FumigatorPesticides <br />
      <LoginApi />
      <button onClick={kakaoSignIn}>연결확인</button>
    </div>
  )
}

export default FumigatorPesticides