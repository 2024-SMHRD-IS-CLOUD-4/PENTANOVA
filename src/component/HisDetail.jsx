import React, { useState, useEffect, searchParams } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'

const HisDetail = () => {
    const [searchParams] = useSearchParams();
    const his_num = searchParams.get('id');
    const [his, setHis] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const hisOne = async () => {
            try {
                const response = await axios.post('http://localhost:8093/PTNV/his/selectOne', null, {
                    params: {
                        id: his_num
                    },
                });
                console.log(response.data);
                setHis(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        hisOne();
    }, []);
    return (
        <div>
            HisDetail
        </div>
    )
}
export default HisDetail