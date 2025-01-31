import React, { useRef, useState } from 'react'
import axios from 'axios'
import "../../css/all.css"
import "../../css/jip.css"
const IdFind = () => {
  let phoneRef = useRef();
  const [resultText, setResultText] = useState();
  const idFind = async (e) => {
    e.preventDefault(); 
    let userphone = phoneRef.current.value;
    try {
      const response = await axios.post(`${process.env.connect}/user/idFind`, null, {
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
      <h2>아이디 찾기</h2>
      <form onSubmit={idFind}>
        <input className='jipInput' type="text" ref={phoneRef} placeholder='전화번호를 입력해주세요.' /><br />
        <button type='submit'>아이디 찾기</button>
      </form>
      {resultText}
    </div>
  )
}
export default IdFind