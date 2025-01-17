import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
    const [file, setFile] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

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
                                <p>입력 시간: {new Date(startTime * 1000).toLocaleString()}</p>
                                <p>출력 시간: {new Date(endTime * 1000).toLocaleString()}</p>
                                <p>소요 시간: {(endTime - startTime).toFixed(2)}초</p>
                            </li>
                        ))}
                    </ul>

                </div>
            )}
        </div>
    );
}

export default ImageUploader;