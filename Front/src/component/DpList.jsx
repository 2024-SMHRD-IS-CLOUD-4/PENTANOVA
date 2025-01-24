import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const DpList = () => {

    const navigate = useNavigate();
    const [dps, setDps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const dpList = async () => {
            try {
                const response = await axios.get('http://localhost:8093/PTNV/dp/dpList');
                console.log(response.data);
                setDps(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        dpList();
    }, []);

    return (
        <div>
            <h2>DpList</h2>
            
            <ul>
                {dps.map(dp => (
                    <li key={dp.dp_num} onClick={()=>{
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