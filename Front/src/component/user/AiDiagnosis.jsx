import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppData } from '../../function/AuthContext';
import logo from '../../assets/logo.png'
import '../../css/all.css'
import '../../css/user.css'

const AiDiagnosis = () => {
    const shareData = useContext(AppData);
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [image, setImage] = useState();
    const [imagescr, setImagescr] = useState();
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

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
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
            const response = await axios.post('http://192.168.219.68:8000/upload_image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setImage(response.data);
            const data = response.data;
            setResponseMessage(data.message);
            console.log(response.data)

            if (data.image) {
                setImageBase64(data.image);
                setPredictions(data.predictions);
                setStartTime(data.start_time);
                setEndTime(data.end_time);
                setFormData2({ ...formData2, diag_img: reviseFilename + ".png", diag_content: data.predictions[0].confidence.toFixed(2) });
                setImagescr(
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

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();  // 파일 선택 대화상자 트리거
    };

    const saveData = async () => {
        const uploadFile = new FormData();

        uploadFile.append('img', imageBase64);
        uploadFile.append('filename', reviseFilename);
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
            // navigate('/hisDiagnosis');
        } catch (error) {
            console.error(error);
        }


    }

    /*숫자에 맞춰 텍스트 반영하여 표시하기*/
    const classMapping = {
        14: "정상"
    };
    return (
        <div>
            {responseMessage && <p>{responseMessage}</p>}
            <div id='adMainBox'>
                <img className='smallLogo' src={logo} alt="GROWELL" />
                <div id='adConBox'>
                    {imageBase64 ? (
                        <div>
                            <img
                                src={`data:image/jpeg;base64,${imageBase64}`}
                                alt="Analyzed Result"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                            <ul>
                                {predictions.map((prediction, index) => (
                                    <li key={index}>
                                        <p>클래스: {prediction.class}</p>
                                        <p>신뢰도: {prediction.confidence.toFixed(2)}</p>
                                        <p>소요 시간: {(endTime - startTime).toFixed(2)}초</p>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={saveData}>저장하기</button>
                        </div>
                    ) : (
                        <div>
                            <div style={{ backgroundColor: '#d3d3d3', width: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <p>이미지를 업로드해주세요.</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <input type="file" onChange={handleFileChange} accept="image/*" />
                                <button type="submit">업로드 및 분석</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AiDiagnosis;