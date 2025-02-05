import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AppData } from '../../function/AuthContext';
import logo from '../../assets/logo.png'

const HisDiagnosis = () => {
  const navigate = useNavigate();
  const [diags, setDiags] = useState([]);
  const userData = useContext(AppData);
  const [imageUrls, setImageUrls] = useState([{}]);
  useEffect(() => {
    const diagList = async () => {
      try {
        const response1 = await axios.get(`${process.env.REACT_APP_connect}/diag/myDiagList?id=${userData.data.id}`);
        console.log(response1.data);
        setDiags(response1.data);
        const imagePromises = response1.data.map(diag => {
          return axios.get(`${process.env.REACT_APP_connect}/bucket/getImages/HisDiagnosis/${diag.diag_img}`, {
            responseType: 'blob'
          }).then(response2 => {
            return {
              [diag.name]: URL.createObjectURL(response2.data)
            };
          });
        });

        Promise.all(imagePromises)
          .then(images => {
            const newImageUrls = images.reduce((acc, curr) => ({ ...acc, ...curr }), {});
            setImageUrls(newImageUrls);
          }).catch(error => {
            console.error("Error fetching images:", error);
          });

      } catch (error) {
        if (error.response) {
          // 서버가 응답을 했지만 오류가 발생한 경우
          console.error("Error response:", error.response);
          console.error("Status code:", error.response.status);
          console.error("Error details:", error.response.data);
        } else if (error.request) {
          // 서버로 요청은 했지만 응답이 없을 경우
          console.error("Error request:", error.request);
        } else {
          // 요청을 설정하는 과정에서 문제가 발생한 경우
          console.error("Error message:", error.message);
        }
      }
    };
    diagList();
  }, []);

  return (
    <div id="hdMainBox">
      <img className='smallLogo' src={logo} alt="GROWELL" />
      <div id='hdConBox'>
        {diags.length > 0 ? (
          diags
            .filter(diag => diag && diag.createdAt)  // 유효한 데이터만 필터링
            .map(diag => (
              <div className='hdConBox' key={diag.diag_num} onClick={() => {
                navigate(`/diagDetail?id=${diag.diag_num}`);
              }}>
                <p>
                  <span className='hdTitle'>AI 진단</span>
                  <span className='hdDate'>{diag.createdAt ? diag.createdAt.split('T')[0] : '날짜 없음'}</span>
                </p>
                <div>
                  <img src={imageUrls[diag.name]} alt='description'/>
                  <p className='hdName'>
                    <p>작물 명 : {diag.dp_num.crop.name}</p>
                    <p>진단병명 : {diag.dp_num.name}&emsp;{Number(diag.diag_content) * 100}%</p>
                  </p>
                </div>
              </div>
            ))
        ) : (
          <p>진단 기록이 없습니다.</p>
        )}
      </div>
    </div>
  )
}

export default HisDiagnosis