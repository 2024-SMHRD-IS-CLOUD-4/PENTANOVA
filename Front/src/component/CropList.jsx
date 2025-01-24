import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const CropList = () => {
    const [crops, setCrops] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const cropList = async () => {
            try {
                const response = await axios.get('http://localhost:8093/PTNV/crop/cropList');
                console.log(response.data);
                setCrops(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        cropList();
    }, []);
    return (
        <div>
            <h1>CropList</h1>
            <div>
                <ul>
                    {crops.map(crop => (
                        <li key={crop.crop_num} onClick={() => { 
                            navigate('/')
                        }}>
                            {crop.name}
                            <img src={require('../assets/appleMango.jpg')} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CropList