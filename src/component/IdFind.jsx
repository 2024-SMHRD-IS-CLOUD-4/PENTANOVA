import React, { useRef, useState } from 'react'
import axios from 'axios'
const IdFind = () => {
  let phoneRef = useRef();
  const [resultText, setResultText] = useState();
  const idFind = async (e) => {
    e.preventDefault(); 
    let userphone = phoneRef.current.value;
    try {
      const response = await axios.post(`http://localhost:8093/PTNV/user/idFind`, null, {
        params: {
          phone: userphone,
        },
      });
      setResultText(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div>
      <h1>IdFind</h1>
      <form onSubmit={idFind}>
        <input type="text" ref={phoneRef} placeholder='전화번호를 입력해주세요.' /><br />
        <button type='submit'>아이디 찾기</button>
      </form>
      {resultText}
    </div>
  )
}

export default IdFind