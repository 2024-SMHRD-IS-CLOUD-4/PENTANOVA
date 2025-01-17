import React, { useRef, useState } from 'react'
import axios from 'axios'
const PwFind = () => {
  let phoneRef = useRef();
  let idRef = useRef();
  let pwRef = useRef();
  const [isTure, setIsTrue] = useState(false);
  const pwFind = async (e) => {
    e.preventDefault();
    let id = idRef.current.value;
    let phone = phoneRef.current.value;
    try {
      const response = await axios.post(`http://localhost:8093/PTNV/user/pwFind`, null, {
        params: {
          phone: phone,
          id: id
        },
      });
      console.log(response.data);
      if (response.data == '일치') {
        setIsTrue(true);
      } else {
        setIsTrue(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const setPw = async (e) => {
    e.preventDefault();
    let pw = pwRef.current.value;
    try {
      const response = await axios.post(`http://localhost:8093/PTNV/user/pwFind`, null, {
        params: {
          pw : pw
        },
      });
      console.log(response.data);
      if (response.data == '일치') {
        setIsTrue(true);
      } else {
        setIsTrue(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <h1>PwFind</h1>
      <form onSubmit={pwFind}>
        <input type="text" ref={idRef} placeholder='아이디(이메일)를 입력해주세요.' required /><br />
        <input type="text" ref={phoneRef} placeholder='전화번호를 입력해주세요.' required /><br />
        <button type='submit'>비밀번호 찾기</button>
      </form>
      <form onSubmit={setPw}>
        <input type="text" ref={pwRef} placeholder='수정할 비밀번호 작성' required />
        <button type='submit'>비밀번호 수정</button>
      </form>
    </div>
  )
}

export default PwFind