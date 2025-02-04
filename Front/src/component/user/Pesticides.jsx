import React from 'react'
import logo from '../../assets/logo.png'
import arrow from '../../assets/right_arrow_black.png'

function Pesticides() {
  return (
    // 농약 검색 페이지
    <div id='pestMainBox'>
      <img className='smallLogo' src={logo} alt="GROWELL" />
      <div id = "pestContentBox">
        <div className='pestSerch'>
            <select name="pestCh01">
              <option value="chose01">작물 선택</option>
            </select>
            <select name="pestCh02">
              <option value="chose02">병/해충</option>
            </select>
          <input type="text" /><button type='submit'>검색하기</button>
        </div>
        {/* 반복하는 곳 시작 */}
        <div className='pestResult'>
          <div>
            <p>감 <img src={arrow} alt="arrow" /> 꼭지나방</p>
            <h1>유원델타린<span>유원에코사이언스㈜</span></h1>
          </div>
        </div>
        {/* 반복하는 곳 종료 */}
        <div className='pestResult'>
          <div>
            <p>감 <img src={arrow} alt="arrow" /> 꼭지나방</p>
            <h1>유일메트린<span>㈜유일</span></h1>
          </div>
        </div>
        <div className='pestResult'>
          <div>
            <p>감 <img src={arrow} alt="arrow" /> 꼭지나방</p>
            <h1>신농팜델타린<span>㈜신농팜케미컬</span></h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pesticides