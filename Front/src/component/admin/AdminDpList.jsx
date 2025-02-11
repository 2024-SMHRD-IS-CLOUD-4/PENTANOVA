import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDpList = ({ cropNum, searchQuery }) => {
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
        <div>
            <h2>병해충 검색 결과</h2>
            {dps ? (
                dps.map((dp, idx) => (
                    <div>
                        {/* <div className='dlConImg' style={{ display: 'flex' }}>
                            <img key={idx} src={imageUrls[cropNum.dp_num]}  />
                        </div> */}
                        <div className='dlConTitle'>
                            <p><span>{dp.crop.name}</span><span>{dp.category ? "해충" : "질병"}</span></p>
                            <h3>{dp.name}</h3>
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
