import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CropList = ({ setActiveState }) => {
    const [imageUrls, setImageUrls] = useState({});
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCrop, setSelectedCrop] = useState(null); // 선택된 작물 저장

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

    const handleCropClick = (crop) => {
        setSelectedCrop(crop); // 선택된 작물 저장
    };

    return (
        <div id='clMainBox'>
            {selectedCrop ? (
                <div>
                    <img src={imageUrls[selectedCrop.name]} />
                    <button type='button' className='sBtn'>{selectedCrop.name}</button>
                    <button onClick={() => setSelectedCrop(null)} className='sBtn'>목록으로</button>
                </div>
            ) : (
                crops.map((crop, idx) => (
                    <div key={idx}>
                        <img 
                            src={imageUrls[crop.name]} 
                            onClick={() => handleCropClick(crop)} 
                        />
                        <button type='button' className='sBtn'>{crop.name}</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default CropList;
