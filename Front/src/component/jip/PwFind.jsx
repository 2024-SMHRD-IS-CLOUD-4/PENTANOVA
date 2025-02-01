import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../../css/all.css"
import "../../css/jip.css"

const PwFind = () => {
  const navigate = useNavigate();
  let phoneRef = useRef();
  let idRef = useRef();
  let pwRef = useRef();
  const [isTure, setIsTrue] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const [showChange, setShowChange] = useState(false);
  const pwFind = async (e) => {
    e.preventDefault();
    let id = idRef.current.value;
    let phone = phoneRef.current.value;
    try {
      const response = await axios.post(`${process.env.REACT_APP_connect}/user/pwFind`, null, {
        params: {
          phone: phone,
          id: id
        },
      });
      if (response.data) {
        setIsTrue(true);
        setShowChange(true);
        setShowAuth(false);
        console.log('qwe')
      } else {
        setIsTrue(false);
        setShowChange(false);
        setShowAuth(true);
        alert('재확인!')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const setPw = async (e) => {
    e.preventDefault();
    let pw = pwRef.current.value;
    let id = idRef.current.value;
    try {
      const response = await axios.post(`${process.env.REACT_APP_connect}/user/updatePw`, null, {
        params: {
          pw: pw
        },
      });
      console.log(response.data);
      if (response.data) {
        alert('변경 성공')
        navigate('/');
      } else {
        alert('변경 실패')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div  id="pwFBox">
      <h2>비밀번호 재설정</h2>
      {showAuth && <form onSubmit={pwFind}>
        <ul className="joinText">
          <li>
            <p><b>아이디</b><span>(이메일형식)</span>를 작성해주세요.</p>
            <input className='jipInput' type="text" ref={idRef} placeholder='아이디(이메일)를 입력해주세요.' required />
          </li>
          <li>
            <p><b>닉네임</b>을 작성해주세요.</p>
          </li>
          <li>
            <p><b>연락처</b>를 작성해주세요.</p>
            <input className='jipInput' type="text" ref={phoneRef} placeholder='전화번호를 입력해주세요.' required />
          </li>
        </ul>
        <button className='button01' type='submit'>회원 확인</button>
      </form>}
      {showChange && <form onSubmit={setPw}>
        <ul className="joinText">
          <li>
            <p><b>새로운 비밀번호</b>를 작성해주세요.</p>
            <input className='jipInput' type="text" ref={pwRef} placeholder='8자 이상 작성해주세요.' required />
          </li>
          <li>
          <p><b>비밀번호</b>를 다시한번 작성해주세요.</p>
          <input className='jipInput' type="text" placeholder='동일한 비밀번호로 다시한번 작성해주세요.' required />
          </li>
        </ul>
        <button className='button01' type='submit'>비밀번호 재설정</button>
      </form>}
    </div>
  )
}

export default PwFind