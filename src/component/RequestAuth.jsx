import React, { useContext } from 'react'
import axios from 'axios'
import { AppData } from '../function/AuthContext'

const RequestAuth = () => {
    const shareData = useContext(AppData);
    const sendAuth = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8093/PTNV/user/sendAuth', null, {
                params: {
                    id : shareData.data.id,
                    requestAuth: 1
                }
            });
            console.log(response.data);
            if(response.data){
                alert('권한 요청 성공!')
            }else{
                alert('권한 요청 실패!')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <h1>RequestAuth</h1>
            <form onSubmit={sendAuth}>
                <input type="text" placeholder='소속 기관을 기입하세요.' requored/><br/>
                <button type='submit'>권한 요청하기</button>
            </form>
        </div>
    )
}

export default RequestAuth