import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios'

const DpList = () => {

    const navigate = useNavigate();
    const [dps, setDps] = useState([]);
    const [searchParams] = useSearchParams();
    const crop_num = searchParams.get('crop_num');
    useEffect(() => {
        const dpList = async () => {
            try {
                const response = await axios.get(`http://localhost:8093/PTNV/dp/dpList`);
                console.log(response.data);
                response.data.map(dp => (
                    console.log(dp),
                    setDps(dps => [...dps,dp])
                ))
            } catch (error) {
                console.error('Error:', error);
            }
        };
        dpList();
    }, []);
    console.log(dps);
    return (
        <div>
            <h2>DpList</h2>

            <ul>
                {dps.map(dp => (
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