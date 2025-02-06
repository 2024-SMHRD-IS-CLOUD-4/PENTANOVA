import React, { useContext, useEffect, useState } from 'react'
import '../../css/all.css'
import '../../css/user.css'
import logo from '../../assets/logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { DpData } from '../../function/AuthContext'

const SelfDiagnosis = ({setActiveState}) => {

  const navigate = useNavigate();
  const dpData = useContext(DpData);
  const [dps, setDps] = useState([]);
  const [crops, setCrops] = useState([]);
  const [selected, setSelected] = useState("토픽 선택");
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const sites = ['잎', '과실', '가지']
  const [formData, setFormData] = useState({})
  useEffect(() => {
    const dpList = async () => {
      const response = await axios.get(`${process.env.REACT_APP_connect}/dp/dpList`);
      setDps(response.data);
    }
    const cropList = async () => {
      const response = await axios.get(`${process.env.REACT_APP_connect}/crop/cropList`);
      setCrops(response.data);
    }
    dpList();
    cropList();
  }, [])
  const handleSelect = (e) => {
    setSelected(e.target.value);
    const { name, value } = e.target;
    if (name == 'time') {
      switch (value) {
        case '3':
        case '4':
        case '5':
          setFormData({ ...formData, season: '봄' })
          break;
        case '6':
        case '7':
        case '8':
          setFormData({ ...formData, season: '여름' })
          break;
        case '9':
        case '10':
        case '11':
          setFormData({ ...formData, season: '가을' })
          break;
        case '12':
        case '1':
        case '2':
          setFormData({ ...formData, season: '겨울' })
          break;
      }
    } else {
      if (name == 'crop') {
        setFormData({ ...formData, crop: { crop_num: Number(value) } })
      }else{
        setFormData({ ...formData, [name]: value })
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_connect}/dp/selfCheck`, formData, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(response.data);
      dpData.setData(response.data)
      if(!formData["crop"]||!formData["site"]){
        alert('필수 정보를 입력해 주세요');
        return;
      }
      if(response.data[0]){
        setActiveState('DpList');
      }else{
        alert("일치하는 정보가 없습니다.")
      }
    } catch (error) {
      console.error(error);
      alert("정보를 입력하세요!")
    }
  }
  
  return (
    <div id='sdMainBox'>
      <img className='smallLogo' src={logo} alt="GROWELL" />
      <ul>
        <li>
          <p>작물 선택 <span style={{ color: 'red' }}>(필수)</span></p>
          <select name="crop" onChange={handleSelect}>
            <option>작물 선택</option>
            {crops.map((crop, idx) => {
              return <option key={idx} value={crop.crop_num}>
                {crop.name}
              </option>;
            })}
          </select>
        </li>
        <li>
          <p>피해 위치 <span style={{ color: 'red' }} >(필수)</span></p>
          <select name="site" onChange={handleSelect}>
            <option>작물 피해 위치 선택</option>
            {sites.map(site => {
              return <option value={site}>{site}</option>
            })}
          </select>
        </li>
        <li>
          <p>발병 시기 <span>(선택)</span></p>
          <select name="time" onChange={handleSelect}>
            <option>월 선택</option>
            {months.map((month, idx) => {
              return <option value={month}>{month}월</option>
            })}
          </select>
        </li>
        
        <li>
          <p>피해 특징 <span>(선택)</span></p>
          <select name="argu" onChange={handleSelect}>
            <option>작물 피해 특징 선택</option>
            {dps.map(dp => {
              return <option>{dp.argu}</option>
            })}
          </select>
        </li>
      </ul>
      <button className="userButton" onClick={handleSubmit}>
        <h2>검색하기</h2>
      </button>
    </div>
  )
}
export default SelfDiagnosis