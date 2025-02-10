// pages/Dashboard.js
import React, { useState } from 'react';
import { AppData } from '../../function/AuthContext';
import { useContext } from 'react';
import axios from 'axios';

const PromotionManagement = () => {

  const [messages, setMessages] = useState([]); // 채팅 메시지 저장

  const clovaApi = async () => {
    try{
      const response = await axios.post(`https://clovastudio.stream.ntruss.com/`, null, {
      headers: {
        'Content-Type': 'application/json'
        },
        params: {
          Authorization: 'nv-d5ad0526ad2b4faaa9a4b8b6e2ae10b9N6l5'
        }
      });

      console.log(response.data); //디버깅용 확인 콘솔

      setMessages(prevMessages => [
        ...prevMessages,
        { text: response.data.message || '새로운 메시지', timestamp: new Date().toLocaleTimeString() }
      ]);
    } catch (error) {
      console.error(error);
    }

  };

  return (
    // 병해충 AI 검색
    <div id='pmMainBox'>
      <div className='pmConBox'>
        <div className='pmConBoxR'>
          <div className='pmConChatR'>
            {/* 메시지 출력 */}
            {messages.map((msg, index) => (
              <div key={index} className="chatMessage">
                <p>{msg.text}</p>
                <span>{msg.timestamp}</span>
              </div>
            ))}
          </div>
          <div className='pmConChat'>
          <input 
              type="text" 
              placeholder="메시지를 입력하세요..."
            />
            <button className='sBtn' onClick={clovaApi}>확인하기</button>
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