// pages/Dashboard.js
import React, { useRef, useState } from 'react';
import { AppData } from '../../function/AuthContext';
import { useContext } from 'react';
import axios from 'axios';

const PromotionManagement = () => {
  const [inputText, setInputText] = useState(""); // 사용자가 입력하는 텍스트
  const [responseText, setResponseText] = useState(""); // API 응답 결과


  const callClovaAPI = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_connect}/api/clovaApi`,
        { query: inputText },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("스프링 응답:", response.data);
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  return (
    // 병해충 AI 검색

    // 병해충 AI 검색
    <div id='pmMainBox'>
      <div className='pmConBox'>
        <div className='pmConBoxR'>
          <div className='pmConChatR'>  
            <p>{responseText}</p>
          </div>
          <div className='pmConChat'>
            <input 
              type="text"  
              onChange={(e) => setInputText(e.target.value)}
              placeholder="질문을 입력하세요..."
            />
            {/* API 호출 */}
            <button className='sBtn' onClick={callClovaAPI}>확인하기</button> 
          </div>
        </div>
        <div className='pmConBoxL'>
          <p>이전 질문 목록</p>
          <ul>
            <li>
              <p>망고를 키우고 있는데 자꾸 잎이 말라가고 있어</p>
              <p>2025.02.01</p>
            </li>
            <li>
              <p>하우스 안. 온도 38도. 습도 37. 잎이 흐물흐물해지고 있음.</p>
              <p>2025.01.17</p>
            </li>
            <li>
              <p>모종을 가져왔는데 잎에 작고 검은 반점이 있어</p>
              <p>2024.08.24</p>
            </li>
          </ul>
          <button className='sBtn'>더보기</button>
        </div>
      </div>
    </div>    
  );
};

export default PromotionManagement;