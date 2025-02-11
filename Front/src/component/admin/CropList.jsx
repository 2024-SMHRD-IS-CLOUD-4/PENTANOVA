import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const CropList = ({ setActiveState, setCropNum }) => {
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
        <div className="crop-container">
        <h1 className="title">병해충 도감</h1>
        <div className="crop-grid">
          {crops.map((crop, idx) => (
            <div
              key={idx}
              className="crop-card"
              onClick={() => {
                setActiveState("AdminDpList");
                setCropNum(crop.crop_num);
              }}
            >
              <img src={imageUrls[crop.name]} alt={crop.name} className="crop-image" />
              <div className="crop-name">{crop.name}</div>
            </div>
          ))}
        </div>
      </div>
    )
}

export default CropList