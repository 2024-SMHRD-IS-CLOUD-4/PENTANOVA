import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import arrow from '../../assets/right_arrow_black.png'

function Fumigator() {

  const[isOpen, setIsOpen]=useState(false);
  const toggleList = () => {
    setIsOpen(!isOpen);
  }

  return (
    // 방제 정보
    <div id='fumMainBox'>
      <img className='smallLogo' src={logo} alt="GROWELL" />
      <div id="fumConBox">
        <select name="fumDate" id="fumDate">
            <option value="01">병해충발생정보 제 12호 (2024.09)</option>
          </select>
        <div className='fumConBox'>
          <ul>
            <li>
              <p className='fumBtnTogle'>경보 0건</p>
            </li>
            <li>
              <p className='fumBtnTogle' onClick={toggleList}>주의보 03건</p>
              <ul className={`fumList ${isOpen ? 'open' : ''}`}>
                {/* 반복문구 시작 */}
                <li>
                  <p>애플망고 <img src={arrow} alt="arrow" /> 질병</p>
                  <p>그을음병<button className='fumButton'>상세보기</button></p>
                </li>
                {/* 반복문구 종료 */}
                <li>
                  <p>애플망고 <img src={arrow} alt="arrow" /> 해충</p>
                  <p>총채벌레<button className='fumButton'>상세보기</button></p>
                </li>
                <li>
                  <p>망고스틴 <img src={arrow} alt="arrow" /> 질병</p>
                  <p>줄기마름병<button className='fumButton'>상세보기</button></p>
                </li>
              </ul>
            </li>
            <li>
              <p className='fumBtnTogle' onClick={toggleList} >예보 01건</p>
                <ul className={`fumList ${isOpen ? 'open' : ''}`}>
                  {/* 반복문구 시작 */}
                  <li>
                    <p>망고스틴 <img src={arrow} alt="arrow" /> 질병</p>
                    <p>반점병<button className='fumButton'>상세보기</button></p>
                  </li>
                  {/* 반복문구 종료 */}
                </ul>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Fumigator