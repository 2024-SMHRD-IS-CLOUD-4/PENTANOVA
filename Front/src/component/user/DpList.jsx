import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'
import logo from '../../assets/logo.png'
// import DpDetail from './DpDetail.jsx';
import { DpData } from '../../function/AuthContext';

const DpList = ({ setActiveState, setDpNum }) => {
    const dpData = useContext(DpData);
    const [dps, setDps] = useState([]);
    const [searchParams] = useSearchParams();
    const crop_num = searchParams.get('crop_num');
    const [imageUrls, setImageUrls] = useState([{}]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const dpList = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_connect}/dp/dpList`);
                console.log(response.data);
                response.data.map((dp, idx) => {
                    if (dpData.data[0]) {
                        dpData.data.map(dp_num => {
                            if (dp.dp_num == dp_num) {
                                setDps(dps => [...dps, dp])
                            }
                        })
                    } else {
                        setDps(dps => [...dps, dp])
                    }
                })
                const imagePromises = response.data.map(dp =>
                    fetch(`${process.env.REACT_APP_connect}/bucket/getImages/DiseasePests/${dp.crop.eng_name}/${dp.img}`,{
                        method: "GET",
                        headers:{
                            "Content-Type": "application/json; charset=utf-8"
                        }
                    })
                        .then(response => response.blob())
                        .then(blob => ({
                            [dp.name]: URL.createObjectURL(blob)
                        }))
                );

                Promise.all(imagePromises)
                    .then(images => {
                        const newImageUrls = images.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                        setImageUrls(newImageUrls);
                        setLoading(false);
                    });

            } catch (error) {
                console.error('Error:', error);
            }
        };
        dpList();
    }, []);
    // console.log(dps)
    return (
        /*병해충 도감*/
        <div id='dlMainBox'>
            <img className='smallLogo' src={logo} alt="GROWELL" />
            <div id="dlConBox">
                <div id='dlConBoxSearch'>
                    <select name="dl03" id="dlchose01">
                        <option value="dl0301">전체</option>
                    </select>
                    <select name="dl03" id="dlchose02">
                        <option value="dl0301">작물 선택</option>
                    </select>
                    <select name="dl03" id="dlchose03">
                        <option value={false}>병</option>
                        <option value={true}>해충</option>
                    </select>
                    <input type="text" placeholder='검색할 단어를 작성해주세요.' />
                    <button>검색하기</button>
                </div>
                <div id='dlConBoxResult'>
                    {/* 반복 박스 */}
                    {dps.length === 0 ? (
                        <div className='dlConBox' >
                            <p>검색 결과가 없습니다.</p>
                        </div>

                    ) : (
                        dps.map((dp, idx) => (
                            <div className='dlConBox' key={dp.dp_num} onClick={() => {
                                setDpNum(dp.dp_num);
                                setActiveState('DpDetail');
                            }}>
                                <div className='dlConImg'>
                                <img key={idx} src={imageUrls[dp.name]} />
                                </div>
                                <div className='dlConTitle'>
                                    <p><span>{dp.crop.name}</span><span>{dp.category ? "해충" : "질병"}</span></p>
                                    <h3>{dp.name}</h3>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default DpList