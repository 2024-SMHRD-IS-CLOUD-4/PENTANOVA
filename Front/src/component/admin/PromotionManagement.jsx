// pages/Dashboard.js
import React, { useState } from 'react';
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
    <div>
      
      <h1></h1>
      {/* <h1>{shareData.data.id}</h1> */}
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="질문을 입력하세요..."
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={callClovaAPI}>API 호출</button><br />
      <h3>응답:</h3>
      <p>{responseText}</p>
    </div>
  );
};

export default PromotionManagement;