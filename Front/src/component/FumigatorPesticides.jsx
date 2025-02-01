import React from 'react'
import LoginApi from './api/LoginApi'

const FumigatorPesticides = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  return (
    <div>
      <br></br>
      <br></br>
      FumigatorPesticides <br />

      <LoginApi />
      {code}
    </div>
  )
}

export default FumigatorPesticides