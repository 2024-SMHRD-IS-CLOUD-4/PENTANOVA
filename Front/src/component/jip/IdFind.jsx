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
    <div id="joinBox">
      <h2>아이디 찾기</h2>
      <form onSubmit={idFind}>
        <ul className='joinText'>
          <li>
              <p><b>닉네임</b>을 작성해주세요.</p>
              <input
                  className='jipInput'
                  type="text"
                  name="nick"
                  placeholder='회원가입 시 작성한 닉네임을 작성해주세요.'
                  required
              />
          </li>
          <li>
              <p><b>연락처</b>를 작성해주세요.</p>
              <input
                  className='jipInput'
                  type="text"
                  name="phone"
                  ref={phoneRef}
                  placeholder='회원가입 시 작성한 연락처를 작성해주세요.'
                  required
              />
          </li>
        </ul>
        <button className="button01" type='submit'>아이디 찾기</button>
      </form>
      {resultText}
    </div>
  )
}
export default IdFind