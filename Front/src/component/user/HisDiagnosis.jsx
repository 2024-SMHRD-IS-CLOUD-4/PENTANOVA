import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AppData } from '../../function/AuthContext';
import logo from '../../assets/logo.png'

const HisDiagnosis = () => {
  const navigate = useNavigate();
  const [diags, setDiags] = useState([]);
  const userData = useContext(AppData);

  useEffect(() => {
    const diagList = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_connect}/diag/myDiagList?id=${userData.data.id}`);
        console.log(response.data);
        setDiags(response.data);
      } catch (error) {
        if (error.response) {
        // 서버가 응답을 했지만 오류가 발생한 경우
        console.error("Error response:", error.response);
        console.error("Status code:", error.response.status);
        console.error("Error details:", error.response.data);
      } else if (error.request) {
        // 서버로 요청은 했지만 응답이 없을 경우
        console.error("Error request:", error.request);
      } else {
        // 요청을 설정하는 과정에서 문제가 발생한 경우
        console.error("Error message:", error.message);
      }
      }
    };
    diagList();
  }, [userData]);

  return (
    <div id="hdMainBox">
      <img className='smallLogo' src={logo} alt="GROWELL" />
      <div id='hdConBox'>
        <div className='hdConBox'>
          <p>
            <span className='hdTitle'>AI 진단</span>
            <span className='hdDate'>2024.01.12</span>
          </p>
          <p className='hdName'>작물 명 : 감</p>
          <p className='hdResult'>검은점무늬병 : 82%</p>
          <span className='hdDetail'>상세보기</span>
        </div>
        {diags.map(diag => (
            <div className='hdConBox' key={diag.diag_num} onClick={() => {
              navigate(`/diagDetail?id=${diag.diag_num}`)
              }}>
              <p>
              {diag.diag_content}
                <span className='hdTitle'>AI 진단</span>
                <span className='hdDate'>2024.01.12</span>
              </p>
              <p className='hdName'>작물 명 : 감</p>
              <p className='hdResult'>검은점무늬병 : 82%</p>
              <span className='hdDetail'>상세보기</span>
              
            </div>
        ))}
        {/* <ul>
          {diags.map(diag => (
            <li key={diag.diag_num} onClick={() => {
              navigate(`/diagDetail?id=${diag.diag_num}`)
            }}>
              {diag.diag_content}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  )
}

export default HisDiagnosis