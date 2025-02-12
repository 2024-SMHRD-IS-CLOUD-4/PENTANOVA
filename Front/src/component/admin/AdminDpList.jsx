import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDpList = ({ searchQuery, setActiveState, setDpNum }) => {
    const [dps, setDps] = useState([]); // 병해충 목록 저장
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!searchQuery) return; // 검색어가 없으면 실행 안 함

        const fetchSearchResults = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_connect}/dp/findText?text=${searchQuery}&&type=${true}`);
                setDps(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, [searchQuery]); // 검색어가 변경될 때 실행

    return (
        <div id='adDlMainBox'>
            <h4>검색 결과</h4>
            {dps ? (
                dps.map((dp, idx) => (
                    <div className='borderB'>
                        <div className='AdDlConImg'>
                            <img src={dp.img}  alt={dp.crop.name}/>
                        </div>
                        <div className='AdDlConTitle'>
                            <p>
                                <span>{dp.crop.name}</span>
                                <span>{dp.category ? "해충" : "질병"}</span>
                                <span>{dp.name} / {dp.eng_name}</span>
                            </p>
                            <button className='sBtn' onClick={()=>{
                                setActiveState('DpDetail');
                                setDpNum(dp.dp_num);
                            }}>상세보기</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>검색 결과가 없습니다.</p>
            )}
        </div>
    );
};
export default AdminDpList;
