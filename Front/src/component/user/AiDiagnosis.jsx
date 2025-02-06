import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppData } from '../../function/AuthContext';
import logo from '../../assets/logo.png'
import '../../css/all.css'
import '../../css/user.css'
import arrow from '../../assets/right_arrow_black.png'

const AiDiagnosis = ({ setActiveState }) => {
    const shareData = useContext(AppData);
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [image, setImage] = useState();
    const [imageSrc, setImageSrc] = useState(null);
    const [dpName, setDpName] = useState(null);
    const [formData2, setFormData2] = useState({
        dp_num: {
            dp_num: 1,
        },
        diag_content: '',
        diag_region: shareData.data.location.split('/')[0],
        diag_img: '',
        user: {
            id: shareData.data.id
        }

    });
    const today = new Date();
    const date = (JSON.stringify(today));
    const filename = date.split('.')[0] + '-appleMango';
    const reviseFilename = filename.replace(/"/g, "");
    const uploadFile = new FormData();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);  // 파일 읽은 후, 이미지 URL을 상태에 저장
            };
            reader.readAsDataURL(file);  // 파일을 데이터 URL로 읽기
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const today = new Date();
        const date = (JSON.stringify(today));
        const filename = date.split('.')[0] + '-appleMango';
        const reviseFilename = filename.replace(/"/g, "");

        if (!file) {
            alert('이미지를 선택해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            // const response = await axios.post('http://192.168.219.68:8000/upload_image', formData, {
            const response = await axios.post('http://112.217.124.195:30333/upload_image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setImage(response.data);
            console.log(response.data);
            if (response.data.detected_classes[0] == 1) {
                setDpName("총채벌레")
                uploadFile.append('dp_num', { dp_num: 2 });
            } else if (response.data.detected_classes[0] == 2) {
                setDpName("그을음병")
                uploadFile.append('dp_num', { dp_num: 1 });
            } else {
                setDpName("정상")
            }
            const data = response.data;
            uploadFile.append('img', imageBase64);
            uploadFile.append('filename', reviseFilename);
            setResponseMessage(data.message);

            if (data.image) {
                setImageBase64(data.image);
                setPredictions(data.predictions);
                setStartTime(data.start_time);
                setEndTime(data.end_time);
                setFormData2({ ...formData2, diag_img: reviseFilename + ".png", diag_content: data.predictions[0].confidence.toFixed(2) });
                setImageSrc(
                    `data:image/png;base64,${data.image}`
                )
            } else {
                setImageBase64('');
                setPredictions([]);
                setStartTime(null);
                setEndTime(null);
            }

        } catch (error) {
            console.error(error);
            setResponseMessage(error.response?.data?.error || '이미지 업로드 실패');
        }
    };

    const saveData = async () => {


        try {
            const response = await axios.post(`${process.env.REACT_APP_connect}/bucket/upload`, uploadFile, {
                headers: {
                    'Content-Type': "multipart/form-data"
                },
            });
        } catch (error) {
            console.error(error);
        }
        try {
            await axios.post(`${process.env.REACT_APP_connect}/diag/addDiag`, formData2, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setActiveState('HisDiagnosis');
        } catch (error) {
            console.error(error);
        }


    }

    const repeat = () => {
        setImageBase64(null);
        setImageSrc(null)
    }
    
    /*숫자에 맞춰 텍스트 반영하여 표시하기*/
    const classMapping = {
        0: "정상",
        999: "정상",
        7: "그을음병",
        15: "총채벌레"
    };


    return (
        <div id='adMainBox'>
            <img className='smallLogo' src={logo} alt="GROWELL" />
            <div id='adConBox'>
                {imageBase64 ? (
                    <div className='adConBox'>
                        <img
                            src={`data:image/jpeg;base64,${imageBase64}`}
                            alt="Analyzed Result"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                        <ul>
                            {predictions.slice(0, 3).map((prediction, index) => (
                                <li key={index}>
                                    <p className='adResult'><span>{dpName || "알 수 없음"}</span> <span>{(prediction.confidence * 100).toFixed(0)}%</span></p>
                                    {/* <li key={index}>
                                        <p>클래스: {prediction.class}</p>
                                        <p>신뢰도: {prediction.confidence.toFixed(2)}</p>
                                        <p>소요 시간: {(endTime - startTime).toFixed(2)}초</p>
                                    </li> */}
                                </li>
                            ))}
                        </ul>
                        {dpName != "정상" ? <button className="userButton" onClick={saveData}><h2>저장하기</h2></button> : null}
                        <button className="userButton" onClick={repeat}><h2>재진단</h2></button>
                    </div>
                ) : (
                    <div className='adConBox'>
                        {/* 선택된 이미지 미리보기 */}
                        {imageSrc ? (
                            <div style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    src={imageSrc}
                                    alt="Selected"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            </div>
                        ) : (
                            <div style={{ backgroundColor: '#d3d3d3', width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <p>이미지를 <br />업로드해주세요.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <label htmlFor="adFileUp" >
                                <div className="userButtonDiv" type="submit"><h2>이미지 업로드</h2></div>
                            </label>
                            <input type="file" name='adFileUp' id='adFileUp' onChange={handleFileChange} accept="image/*" />
                            <button className="userButton" type="submit"><h2>AI 분석 시작</h2></button>
                        </form>
                        {responseMessage === "예측값이 너무 낮아 탐지할 수 없습니다." && (
                            <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
                                {responseMessage}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AiDiagnosis;