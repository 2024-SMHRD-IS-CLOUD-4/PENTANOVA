import React, { useState, useEffect, searchParams } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'
import logo from '../../assets/logo.png'
import testImg from '../../assets/loading2.gif'

const DpDetail = ({ dpNum }) => {
  const [searchParams] = useSearchParams();
  const dp_num = searchParams.get('id');
  const [dp, setDp] = useState();
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState({});

  useEffect(() => {
    const dpOne = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_connect}/dp/selectOne`, null, {
          params: {
            dp_num: dpNum
          },
        });
        setDp(response.data);
        const imagePromise = fetch(`${process.env.REACT_APP_connect}/bucket/getImages/DiseasePests/${response.data.crop.eng_name}/${response.data.img}`)
          .then(response => response.blob())
          .then(blob => ({
            [response.data.dp_num]: URL.createObjectURL(blob)
          }));

        imagePromise
          .then(image => {
            setImageUrl(image);
            setLoading(false);
          });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    dpOne();
  }, []);
  console.log(dp);

  const tabList = document.querySelectorAll('.tab_menu .list li');
  const contents = document.querySelectorAll('.tab_menu .cont_area .cont')
  let activeCont = ''; // 현재 활성화 된 컨텐츠 (기본:#tab1 활성화)

  for (var i = 0; i < tabList.length; i++) {
    tabList[i].querySelector('.btn').addEventListener('click', function (e) {
      e.preventDefault();
      for (var j = 0; j < tabList.length; j++) {
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
        {dp && <div>
          <p>{dp.crop.name}</p>
          <h2>{dp.name}</h2>
          <p>{dp.eng_name}</p>
          <img src={!loading ? imageUrl[dp.dp_num] : { testImg }} alt="갈색둥근무늬병" />
          <div>
            <p>발병시기 : {dp.season}</p>
            <p>주 발생 부위 : {dp.site}</p>
            <p>{dp.argu}</p>
          </div>
        </div>}
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
              {dp ? dp.content : null}
            </div>
            <div id="tab2" className="cont" style={{ display: 'none' }}>
              <p>아우라 <span>㈜한얼사이언스</span></p>
              <p>아우라 <span>㈜한얼사이언스</span></p>
            </div>
            <div id="tab3" className="cont" style={{ display: 'none' }}>
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