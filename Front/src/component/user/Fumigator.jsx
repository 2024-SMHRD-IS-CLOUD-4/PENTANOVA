import React from 'react'
import logo from '../../assets/logo.png'
import arrow from '../../assets/right_arrow_black.png'

function Fumigator() {
  return (
    // 방제 정보
    <div id='fumMainBox'>
      <div id="fumConBox">
        <img className='smallLogo' src={logo} alt="GROWELL" />
        <div className='fumConBox'>
          <select name="fumDate" id="fumDate">
            <option value="01">병해충발생정보 제 12호 (2024.09)</option>
          </select>
          <ul>
            <li>
              <p className='fumBtnTogle'>주의보 00건</p>
              {/* 반복문구 시작 */}
              <div className='fumResult'>
                <div>
                  <p>감 <img src={arrow} alt="arrow" /> 꼭지나방</p>
                </div>
              </div>
              {/* 반복문구 종료 */}
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Fumigator