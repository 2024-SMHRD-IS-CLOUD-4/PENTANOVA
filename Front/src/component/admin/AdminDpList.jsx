import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDpList = ({ cropNum, searchQuery }) => {
    const [dps, setDps] = useState([]); // 병해충 목록 저장
    const [loading, setLoading] = useState(false);

    console.log("현재 검색어:", searchQuery);

    useEffect(() => {
        if (!searchQuery) return; // 검색어가 없으면 실행 안 함

        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_connect}/dp/search?query=${searchQuery}`);
                setDps(response.data);
                setLoading(true);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, [searchQuery]); // 검색어가 변경될 때 실행

    return (
        <div>
            <h2>병해충 검색 결과</h2>
            {loading ? (
                dps.length > 0 ? (
                    dps.map((dp, idx) => (
                        <div key={dp.dp_num}>
                            <h3>{dp.name}</h3>
                        </div>
                    ))
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )
            ) : (
                <p>로딩 중...</p>
            )}
        </div>
    );
};

export default AdminDpList;
