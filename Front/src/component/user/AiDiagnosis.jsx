import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppData } from '../../function/AuthContext';

const AiDiagnosis = () => {
    const shareData = useContext(AppData);
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [formData2, setFormData2] = useState({
        dp_num: {
            dp_num: 1,
        },
        diag_content: '',
        diag_region: shareData.data.location.split('/')[0],
        diag_img: '',
        id:{
            id: shareData.data.id
        }

    });

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

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

            const data = response.data;
            setResponseMessage(data.message);

            if (data.image) {
                setImageBase64(data.image);
                setPredictions(data.predictions);
                setStartTime(data.start_time);
                setEndTime(data.end_time);
                setFormData2({ ...formData2, diag_img: '..', diag_content: data.predictions[0].confidence.toFixed(2) });
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
        console.log(predictions[0].confidence.toFixed(2));
        console.log(formData2);
        try {
            await axios.post(`${process.env.REACT_APP_connect}/diag/addDiag`, formData2, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            navigate('/hisDiagnosis');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>이미지 업로드 및 분석</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept="image/*" />
                <button type="submit">업로드 및 분석</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
            {imageBase64 && (
                <div>
                    <h2>분석 결과:</h2>
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
                                {/* <p>입력 시간: {new Date(startTime * 1000).toLocaleString()}</p>
                                <p>출력 시간: {new Date(endTime * 1000).toLocaleString()}</p> */}
                                <p>소요 시간: {(endTime - startTime).toFixed(2)}초</p>
                            </li>
                        ))}
                    </ul>
                    <button onClick={saveData}>저장하기</button>
                </div>
            )}
        </div>
    );
}

export default AiDiagnosis;