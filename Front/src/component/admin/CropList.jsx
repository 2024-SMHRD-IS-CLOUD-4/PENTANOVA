import React, { useEffect, useState } from 'react';
import axios from 'axios';
import rightArrow from '../../assets/right_arrow_black.png';

const CropList = ({ setActiveState, setDpNum }) => {
    const [imageUrls, setImageUrls] = useState({});
    const [crops, setCrops] = useState([]);
    const [dps, setDps] = useState([]);
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

    useEffect(() => {
        if (!selectedCrop) return;
        const dpList = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_connect}/dp/dpListByCrop?crop_num=${selectedCrop.crop_num}`);
                setDps(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        dpList();
    }, [selectedCrop])

    const handleCropClick = (crop) => {
        setSelectedCrop(crop); // 선택된 작물 저장
    };

    return (
        <div id='clMainBox'>
            {selectedCrop ? (
                <>
                    <div id='clConBoxL'>
                        <img src={imageUrls[selectedCrop.name]} />
                        <button type='button' className='sBtn clChose'>{selectedCrop.name}</button>
                        <button onClick={() => setSelectedCrop(null)} className='sBtn'>목록으로</button>
                    </div>
                    <div id='clConBoxR'>
                        <div className='clConBoxD'>
                            <p className='clSTitle'>병 피해</p>
                            <div className='scroll'>
                                {dps.map((dp, idx) => {
                                    if (dp.category == 0) {
                                        return <div className='clConS'>
                                            <p>주 발병 작물<img src={rightArrow} alt="rightArrow" />식량작물 <img src={rightArrow} alt="rightArrow" /> {selectedCrop.name}</p>
                                            <p>
                                                <span>병명<img src={rightArrow} alt="rightArrow" />{dp.name} / {dp.eng_name}</span>
                                                <button className='sBtn' onClick={() => {
                                                    setActiveState('DpDetail')
                                                    setDpNum(dp.dp_num)
                                                }}>상세보기</button>
                                            </p>
                                        </div>
                                    }
                                })}
                            </div>
                        </div>
                        <div className='clConBoxD'>
                            <p className='clSTitle'>해충 피해</p>
                            <div className='scroll'>
                                {dps.map((dp, idx) => {
                                    if (dp.category == 1) {
                                        return <div className='clConS'>
                                            <p>발병 작물<img src={rightArrow} alt="rightArrow" />{selectedCrop.name}</p>
                                            <p>
                                                <span>병명<img src={rightArrow} alt="rightArrow" />{dp.name} / {dp.eng_name}</span>
                                                <button className='sBtn' onClick={() => {
                                                    setActiveState('DpDetail')
                                                    setDpNum(dp.dp_num)
                                                }}>상세보기</button>
                                            </p>
                                        </div>
                                    }
                                })}

                            </div>
                        </div>
                    </div>
                </>
            ) : (
                crops.map((crop, idx) => (
                    <div className="mousePointer" key={idx} onClick={() => handleCropClick(crop)} >
                        <img src={imageUrls[crop.name]} />
                        <button type='button' className='sBtn'>{crop.name}</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default CropList;
