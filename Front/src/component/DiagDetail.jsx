import React, { useState, useEffect, searchParams } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'

const DiagDetail = () => {
    const [searchParams] = useSearchParams();
    const diag_num = searchParams.get('id');
    const [diag, setDiag] = useState();

    useEffect(() => {
        const diagOne = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_connect}/diag/selectOne`, null, {
                    params: {
                        diag_num : diag_num
                    },
                });
                console.log(response.data);
                setDiag(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        diagOne();
    }, []);
    return (
        <div>
            DiagDetail<br/>
            {diag?diag.diag_num:null}
        </div>
    )
}
export default DiagDetail