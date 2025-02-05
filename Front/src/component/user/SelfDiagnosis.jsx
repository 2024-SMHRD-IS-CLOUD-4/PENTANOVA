import React, { useEffect, useState } from 'react'
import '../../css/all.css'
import '../../css/user.css'
import logo from '../../assets/logo.png'
import axios from 'axios'

const SelfDiagnosis = () => {
  const [dps, setDps] = useState([]);
  const [crops, setCrops] = useState([]);
  const [selected, setSelected] = useState("토픽 선택");
  const months = [1,2,3,4,5,6,7,8,9,10,11,12];
  const sites = ['잎', '과실', '가지']
  useEffect(() => {
    const dpList = async () => {
      const response = await axios.get(`${process.env.REACT_APP_connect}/dp/dpList`);
      setDps(response.data);
      console.log(response.data)
    }
    const cropList = async () => {
      const response = await axios.get(`${process.env.REACT_APP_connect}/crop/cropList`);
      setCrops(response.data);
      console.log(response.data)
    }
    dpList();
    cropList();
  }, [])

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div id='sdMainBox'>
      <img className='smallLogo' src={logo} alt="GROWELL" />
      <ul>
        <li>
          <p>작물 선택 <span style={{ color: 'red' }}>(필수)</span></p>
          <select name="crops" onChange={handleSelect} value={selected}>
            <option>작물 선택</option>
            {crops.map((crop, idx) => {
              return <option key={idx} value={crop.crop_num}>
                {crop.name}
              </option>;
            })}
          </select>
        </li>
        <li>
          <p>발병 시기 <span>(선택)</span></p>
          <select name="crops">
            <option value="choiseNone">월 선택</option>
            {months.map(month=>{
              return <option value={month}>{month}월</option>
            })}
          </select>
        </li>
        <li>
          <p>피해 위치 <span style={{ color: 'red' }} >(필수)</span></p>
          <select name="part" onChange={handleSelect} value={selected}>
            <option value="choiseNone">작물 피해 위치 선택</option>
            {sites.map(site=>{
              return <option value={site}>{site}</option>
            })}
          </select>
        </li>
        <li>
          <p>피해 특징 <span>(선택)</span></p>
          <select name="period" onChange={handleSelect} value={selected}>
            <option value="choiseNone">작물 피해 특징 선택</option>
            {dps.map(dp=>{
              return <option>{dp.argu}</option>
            })}
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