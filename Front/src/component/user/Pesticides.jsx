import React from 'react'
import logo from '../../assets/logo.png'
import arrow from '../../assets/right_arrow_black.png'

function Pesticides() {

  
  return (
    // 농약 검색 페이지
    <div id='pestMainBox'>
      <img className='smallLogo' src={logo} alt="GROWELL" />
      <div id = "pestContentBox">
        <div id='pestSerch'>
          <select name="pestCh01">
            <option value="chose01">작물 선택</option>
          </select>
          <select name="pestCh02">
            <option value="chose02">병/해충</option>
          </select>
          <input type="text" placeholder='검색할 단어를 작성해주세요.'/>
          <button>검색하기</button>
        </div>
        
        <div id='pestConBoxResult'>
          {/* 반복하는 곳 시작 */}
          <div className='pestResult'>
            <div>
              <p>감 <img src={arrow} alt="arrow" /> 꼭지나방</p>
              <h2>유원델타린<span>유원에코사이언스㈜</span></h2>
            </div>
          </div>
          {/* 반복하는 곳 종료 */}
        </div>
        {/* {dps.length === 0 ? (
              <div className='dlConBox' >
                  <p>검색 결과가 없습니다.</p>
              </div>
              
        ) : (
            dps.map(dp => (
                <div className='dlConBox' key={dp.dp_num} onClick={() => {
                    navigate(`/dpDetail?id=${dp.dp_num}`)
                }}>
                    <div className='dlConImg'>
                        <img src="" alt="dlimg" />
                    </div>
                    <div className='dlConTitle'>
                        <p><span>애플망고</span><span>병 / 해충</span></p>
                        <h3>{dp.name}</h3>
                    </div>
                </div>
            ))
          )} */}
      </div>
    </div>
  )
}

export default Pesticides