import React, { useEffect, useState } from 'react'
import '../../css/all.css'
import '../../css/user.css'
import React from 'react'
import logo from '../../assets/logo.png'
import axios from 'axios'

const SelfDiagnosis = () => {
  // const [dps, setDps] = useState([]);
  const dps = [
    {
      name: "사과",
      crop: {
        crop_num: 1
      }
    },
    {
      name: "배",
      crop: {
        crop_num: 2
      }
    },
    {
      name: "감",
      crop: {
        crop_num: 3
      }
    }
  ];
  useEffect(() => {
    const dpList = async () => {
      const response = await axios.get(`${process.env.REACT_APP_connect}/dp/dpList`);
      // setDps(response.data);

    }
    dpList();
    console.log(dps)
  }, [])

  return (
    <div id='sdMainBox'>
      <img className='smallLogo' src={logo} alt="GROWELL" />
      <ul>
        <li>
          <p>작물 선택 <span style={{ color: 'red' }}>(필수)</span></p>
          <select name="crops">
            {dps.map(dp => {
              <option key={dp.crop} value="choiseNone">{dp.crop.name}</option>
            })}
          </select>
        </li>
        <li>
          <p>발병 시기 <span>(선택)</span></p>
          <select name="crops">
            <option value="choiseNone">월 선택</option>
          </select>
        </li>
        <li>
          <p>피해 위치 <span style={{ color: 'red' }} >(필수)</span></p>
          <select name="part">
            <option value="choiseNone">작물 피해 위치 선택</option>
          </select>
        </li>
        <li>
          <p>피해 특징 <span>(선택)</span></p>
          <select name="period" id="">
            <option value="choiseNone">작물 피해 특징 선택</option>
          </select>
        </li>
      </ul>
      <button className="userButton">
        <h2>검색하기</h2>
      </button>
    </div>
  )
}

export default SelfDiagnosis