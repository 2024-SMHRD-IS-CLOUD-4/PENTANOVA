import React from 'react'
import logo from '../../assets/logo.png'

const SelfDiagnosis = () => {

  return (
    <div id='sdMainBox'>
      <img className='smallLogo' src={logo} alt="GROWELL" />
      <ul>
        <li>
          <p>작물 선택 <span style={{color:'red'}}>(필수)</span></p>
          <select name="crops" id="">
            <option value="choiseNone">작물 선택</option>
          </select>
        </li>
        <li>
          <p>발병 시기 <span>(선택)</span></p>
          <select name="crops">
            <option value="choiseNone">월 선택</option>
          </select>
        </li>
        <li>
          <p>피해 위치 <span style={{color:'red'}} >(필수)</span></p>
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