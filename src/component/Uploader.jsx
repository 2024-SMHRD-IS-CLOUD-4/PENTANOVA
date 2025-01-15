import React, { useState } from 'react';
import axios from 'axios';

function Uploader() {
    const [file, setFile] = useState(null);
    const [imageBase64, setImageBase64] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        console.log(selectedFile);
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
            } else {
                setImageBase64('');
                setPredictions([]);
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
                                클래스: {prediction.class}, 신뢰도: {prediction.confidence.toFixed(2)}, 
                                바운딩 박스: {JSON.stringify(prediction.bbox)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Uploader;