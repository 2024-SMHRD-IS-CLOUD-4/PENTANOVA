import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'
import logo from '../../assets/logo.png'
import loadingImg from '../../assets/loading2.gif'

const DpList = ({ setActiveState, setDpNum, dpNums, setDpNums }) => {
    const [dps, setDps] = useState([]);
    const [tpDps, setTpDps] = useState([]);
    const [searchParams] = useSearchParams();
    const [imageUrls, setImageUrls] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const textRef = useRef();
    const typeRef = useRef();

    useEffect(() => {
        const dpList = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_connect}/dp/dpList`);
                response.data.map((dp, idx) => {
                    if (dpNums[0]) {
                        dpNums.map(dp_num => {
                            if (dp.dp_num === dp_num) {
                                setDps(dps => [...dps, dp])
                            }
                        })
                    } else {
                        setDps(dps => [...dps, dp])
                    }
                })
                const imagePromises = response.data.map(dp =>
                    fetch(`${process.env.REACT_APP_connect}/bucket/getImages/DiseasePests/${dp.crop.eng_name}/${dp.img}`)
                        .then(response => response.blob())
                        .then(blob => ({
                            [dp.dp_num]: URL.createObjectURL(blob)
                        }))
                );

                Promise.all(imagePromises)
                    .then(images => {
                        const newImageUrls = images.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                        setImageUrls(newImageUrls);
                        setLoading(true);
                    });

            } catch (error) {
                console.error('Error:', error);
            }
        };
        dpList();
    }, []);
    useEffect(() => {
        setDps(tpDps);
    }, [trigger])

    const findText = async () => {
        if (typeRef.current.value && textRef.current.value) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_connect}/dp/findText`, null, {
                    params: {
                        type: typeRef.current.value,
                        text: textRef.current.value
                    }
                })
                if (!response.data[0]) {
                    alert('일치하는 정보가 없습니다.')
                }
                if (response.data[0].dp_num) {
                    setDps(response.data);
                } else {
                    const dpResponse = await axios.get(`${process.env.REACT_APP_connect}/dp/dpList`);
                    dpResponse.data.map(dp => {
                        response.data.map(crop => {
                            if (crop.crop_num == dp.crop.crop_num) {
                                setTpDps(dps => [...dps, dp])
                            }
                        })
                    })
                    setTrigger(true);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('검색어를 입력하세요!')
        }
    }
    console.log(imageUrls)
    console.log(dps)
    return (
        /*병해충 도감*/
        <div id='dlMainBox'>
            <img className='smallLogo' src={logo} alt="GROWELL" />
            <div id="dlConBox">
                <div id='dlConBoxSearch'>
                    <select name="dl03" id="dlchose01" ref={typeRef}>
                        <option value="">전체</option>
                        <option value={false}>작물명</option>
                        <option value={true}>병명</option>
                    </select>
                    {/* <select name="dl03" id="dlchose02">
                        <option value="dl0301">작물 선택</option>
                        {crops.map((crop, idx)=>{

                        })}
                    </select>
                    <select name="dl03" id="dlchose03">
                        <option value={false}>병</option>
                        <option value={true}>해충</option>
                    </select> */}
                    <input type="text" ref={textRef} placeholder='검색어 입력' />
                    <button onClick={findText}>검색하기</button>
                </div>
                <div id='dlConBoxResult'>
                    {/* 반복 박스 */}
                    {loading ? <div>
                        {dps.length === 0 ? (
                            <div className='dlConBox' >
                                <p>검색 결과가 없습니다.</p>
                            </div>

                        ) : (
                            dps.map((dp, idx) => (
                                <div className='dlConBox' key={dp.dp_num} onClick={() => {
                                    setDpNum(dp.dp_num);
                                    setActiveState('DpDetail');
                                    setDpNums([]);
                                }}>
                                    <div className='dlConImg'>
                                        <img key={idx} src={imageUrls[dp.dp_num]} />
                                    </div>
                                    <div className='dlConTitle'>
                                        <p><span>{dp.crop.name}</span><span>{dp.category ? "해충" : "질병"}</span></p>
                                        <h3>{dp.name}</h3>
                                    </div>
                                </div>
                            ))
                        )}
                    </div> : <img className='loadingImg' src={loadingImg}/>}
                </div>
            </div>
        </div>
    )
}

export default DpList