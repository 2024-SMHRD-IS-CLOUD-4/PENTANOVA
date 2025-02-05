import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Test = () => {
    const navigate = useNavigate();
    const [imageUrls, setImageUrls] = useState([{}]);
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const cropList = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_connect}/crop/cropList`);
                setCrops(response.data);

                const imagePromises = response.data.map(crop =>
                    fetch(`${process.env.REACT_APP_connect}/bucket/getImages/Crops/${crop.img}`)
                        .then(response => response.blob())
                        .then(blob => ({
                            [crop.name]: URL.createObjectURL(blob)
                        }))
                );
                Promise.all(imagePromises)
                    .then(images => {
                        const newImageUrls = images.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                        setImageUrls(newImageUrls);
                        setLoading(false);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        cropList();
    }, []);

    return (
        <div>
            <br />
            <br />
            <h1>테스트</h1>
            {Object.keys(imageUrls).map((key, idx) => (
                <img key={key} src={imageUrls[key]} alt={key} onClick={() => navigate('/dpList?')} />
            ))}

        </div>
    )
}

export default Test