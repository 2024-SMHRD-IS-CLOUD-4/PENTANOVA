import React, { useContext, useRef } from 'react'
import axios from 'axios'
import { AppData } from '../../function/AuthContext';
import logo from '../../assets/logo.png'

const RequestAuth = () => {
    const shareData = useContext(AppData);
    const instituteRef = useRef();
    const sendAuth = async (e) => {
        const institute = instituteRef.current.value;
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_connect}/user/sendAuth`, null, {
                params: {
                    id : shareData.data.id,
                    requestAuth: 1,
                    institute : institute
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
        <div id='raMainBox'>
            <img className='smallLogo' src={logo} alt="GROWELL" />
            <div id='raConBox'>
                <h3>관리자(연구자)로 <br />권한을 요청합니다. </h3>
                {shareData && <form onSubmit={sendAuth}>
                    <input type="text" ref={instituteRef} placeholder='소속 기관을 기입하세요.' required/><br/>
                    <button type='submit'>권한 요청하기</button>
                </form>}
            </div>
           
        </div>
    )
}

export default RequestAuth