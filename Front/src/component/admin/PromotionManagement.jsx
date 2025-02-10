// pages/Dashboard.js
import React, { useRef, useState } from 'react';

const PromotionManagement = () => {
  const [responseText, setResponseText] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showInputText, setShowInputTetxt] = useState([]);
  const textRef = useRef();


  const callClovaAPI = async () => {
    // setResponseText(""); // 초기화

    const eventSource = new EventSource(
      `${process.env.REACT_APP_connect}/api/clovaApi?query=${encodeURIComponent(inputText)}`
    );

    // eventSource.onerror = (error) => {
    //   console.error("SSE 오류 발생:", error);
    //   eventSource.close();
    // };

    eventSource.addEventListener("result", (event) => {
      const finalData = JSON.parse(event.data);
      console.log(event.data)
      setResponseText([...responseText, finalData.message.content]); // 최종 결과 저장
      eventSource.close();
    });
  };

  return (
    // 병해충 AI 검색
    <div id='pmMainBox'>
      <div className='pmConBox'>
        <div className='pmConBoxR'>
          <div className='pmConChatR'>
            {responseText.map((text, idx) => {
              { console.log(responseText) }
              { console.log(responseText.length) }
              { console.log(idx) }
              return (
                <div key={idx}>
                  {responseText[idx]}<br /><br />
                </div>
              )
            })}
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