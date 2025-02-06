import React, { useState, useEffect, searchParams } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'
import logo from '../../assets/logo.png'
import testImg from '../../assets/loading2.gif'

const DpDetail = ({dpNum}) => {
  const [searchParams] = useSearchParams();
  const dp_num = searchParams.get('id');
  const [dp, setDp] = useState();

  useEffect(() => {
    const dpOne = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_connect}/dp/selectOne`, null, {
          params: {
            dp_num: dpNum
          },
        });
        setDp(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    dpOne();
  }, []);

  
  const tabList = document.querySelectorAll('.tab_menu .list li');
  const contents = document.querySelectorAll('.tab_menu .cont_area .cont')
  let activeCont = ''; // 현재 활성화 된 컨텐츠 (기본:#tab1 활성화)

  for(var i = 0; i < tabList.length; i++){
    tabList[i].querySelector('.btn').addEventListener('click', function(e){
      e.preventDefault();
      for(var j = 0; j < tabList.length; j++){
        // 나머지 버튼 클래스 제거
        tabList[j].classList.remove('is_on');

        // 나머지 컨텐츠 display:none 처리
        contents[j].style.display = 'none';
      }

      // 버튼 관련 이벤트
      this.parentNode.classList.add('is_on');

      // 버튼 클릭시 컨텐츠 전환
      activeCont = this.getAttribute('href');
      document.querySelector(activeCont).style.display = 'block';
    });
  }

  return (
    //사용자 병해충 도감 상세
    <div id='diMainBox'>
      <img className='smallLogo' src={logo} alt="GROWELL" />
      <div id='diConBox'>
        <div>
          <p>가지</p>
          <h2>갈색둥근무늬병</h2>
          <p>Cercospora leaf spot</p>
          <img src={testImg} alt="갈색둥근무늬병" />
          <div>
            <p>발병시기 : 7~9월</p>
            <p>주 발생 부위 : 잎</p>
            <p>황갈색 작은 반점으로 시작하여 5~6mm 큰 병반으로 확대</p>
          </div>
        </div>
        <div className="tab_menu">
          <ul className="list">
            <li className="is_on">
              <a href="#tab1" className="btn">발생 환경</a>
            </li>
            <li>
              <a href="#tab2" className="btn">농약 정보</a>
            </li>
            <li>
              <a href="#tab3" className="btn">방제 정보</a>
            </li>
          </ul>
          
          <div className="cont_area">
            <div id="tab1" className="cont">
            1차 전염원에 대하여 아직 정확한 연구결과는 없으나 병원균은 병든 잎의 잔재에서 분생포자나 균사의 형태로 겨울을 나는 것으로 생각된다.<br /><br /> 1차전염원에서 형성된 분생포자는 비산되어 전반되며, 8~9월 또는 초가을 비료가 부족하고, 비가 많은 해에 발생이 심하다.
            </div>
            <div id="tab2" className="cont">
              <p>아우라 <span>㈜한얼사이언스</span></p>
              <p>아우라 <span>㈜한얼사이언스</span></p>
            </div>
            <div id="tab3" className="cont">
              <p><span>주의보</span>2024.09.01~09.30</p>
              <p><span>예보</span>2024.07.01~08.30</p>
            </div>
          </div>
        </div>
        
        
        {dp ? dp.region : null}

      </div>
    </div>
  )
}

export default DpDetail