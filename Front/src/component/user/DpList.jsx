import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios'
import { DpData } from '../../function/AuthContext';

const DpList = () => {
    const dpData = useContext(DpData);
    const navigate = useNavigate();
    const [dps, setDps] = useState([]);
    const [searchParams] = useSearchParams();
    const crop_num = searchParams.get('crop_num');
    let [asd, setAsd] = useState([]);
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
            } catch (error) {
                console.error('Error:', error);
            }
            setAsd(dpData);
        };
        dpList();
    }, []);
    console.log(dpData.data[0]);
    if (dpData.data[0]) {
        console.log("qweqdas");
    } else {
        console.log("없음");
    }
    return (
        <div>
            <h2>병해충 도감</h2>

            <ul>
                {dps.map((dp, idx) => (
                    <li key={dp.dp_num} onClick={() => {
                        navigate(`/dpDetail?id=${dp.dp_num}`)
                    }}>
                        {dp.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DpList