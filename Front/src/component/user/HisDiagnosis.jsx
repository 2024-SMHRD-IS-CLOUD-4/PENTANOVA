import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AppData } from '../../function/AuthContext';
import '../../css/all.css'
import '../../css/user.css'
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
        console.error(error)
      }
    };
    diagList();
  }, []);

  return (
    <div id="hdMAinBox">
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
        <div className='hdConBox'>
          <p>
            <span className='hdTitle'>AI 진단</span>
            <span className='hdDate'>2024.01.12</span>
          </p>
          <p className='hdName'>작물 명 : 감</p>
          <p className='hdResult'>검은점무늬병 : 82%</p>
          <span className='hdDetail'>상세보기</span>
        </div>
        <div className='hdConBox'>
          <p>
            <span className='hdTitle'>AI 진단</span>
            <span className='hdDate'>2024.01.12</span>
          </p>
          <p className='hdName'>작물 명 : 감</p>
          <p className='hdResult'>검은점무늬병 : 82%</p>
          <span className='hdDetail'>상세보기</span>
        </div>
        <div className='hdConBox'>
          <p>
            <span className='hdTitle'>AI 진단</span>
            <span className='hdDate'>2024.01.12</span>
          </p>
          <p className='hdName'>작물 명 : 감</p>
          <p className='hdResult'>검은점무늬병 : 82%</p>
          <span className='hdDetail'>상세보기</span>
        </div>
        <div className='hdConBox'>
          <p>
            <span className='hdTitle'>AI 진단</span>
            <span className='hdDate'>2024.01.12</span>
          </p>
          <p className='hdName'>작물 명 : 감</p>
          <p className='hdResult'>검은점무늬병 : 82%</p>
          <span className='hdDetail'>상세보기</span>
        </div>
        <div className='hdConBox'>
          <p>
            <span className='hdTitle'>AI 진단</span>
            <span className='hdDate'>2024.01.12</span>
          </p>
          <p className='hdName'>작물 명 : 감</p>
          <p className='hdResult'>검은점무늬병 : 82%</p>
          <span className='hdDetail'>상세보기</span>
        </div>
        <div className='hdConBox'>
          <p>
            <span className='hdTitle'>AI 진단</span>
            <span className='hdDate'>2024.01.12</span>
          </p>
          <p className='hdName'>작물 명 : 감</p>
          <p className='hdResult'>검은점무늬병 : 82%</p>
          <span className='hdDetail'>상세보기</span>
        </div>
      </div>
      <ul>
        {diags.map(diag => (
          <li key={diag.diag_num} onClick={() => {
            navigate(`/diagDetail?id=${diag.diag_num}`)
          }}>
            {diag.diag_content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HisDiagnosis