import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AppData } from '../../function/AuthContext';
import Address from '../api/Address';
import logo from '../../assets/logo.png'

const ChangeProfile = () => {

    const shareData = useContext(AppData);
    const [formData, setFormData] = useState({
        id: shareData.data?shareData.data.id:null,
        pw: '',
        phone: '',
        nick: '',
        location: '',
        role: shareData.data?shareData.data.role:null,
        institute: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const updateData = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);
            const response = await axios.patch(`${process.env.REACT_APP_connect}/user/update`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200) {
                shareData.setData(response.data);
                console.log(response.data);
                alert('갱신 성공!');
            }
        } catch (error) {
            if (error.response) {
                alert('갱신 실패');
            } else if (error.request) {
                alert('서버로부터 응답이 없습니다. 서버 상태를 확인해주세요.');
            } else {
                alert('서버와 연결할 수 없습니다.');
            }
        }
    }
    const institute = (
        <li>
            <label>소속 기관 : </label><input type="text" name="institute" value={formData.institute} onChange={handleChange} placeholder={shareData.data?shareData.data.institute:null} readOnly/>
        </li>
    );

    return (
        <div id='cpMainBox'>
            <img className='smallLogo' src={logo} alt="GROWELL" />
            <div id='cpConBox'>
                <h3>{shareData.data.nick}<span> 님</span></h3>
                <h4>수정이 필요한 항목을 기입해주세요.</h4>
                {shareData.data && <form onSubmit={updateData}>
                    <ul>
                        <li>
                            <p><span>비밀번호</span> {shareData.data.pw?<input type="password" name="pw" value={formData.pw} onChange={handleChange} placeholder={shareData.data.pw}/>:null}</p>
                        </li>
                        <li>
                            <p><span>연락처 </span><input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder={shareData.data.phone} /></p>
                        </li>
                        <li>
                            <p><span>닉네임 </span><input type="text" name="nick" value={formData.nick} onChange={handleChange} placeholder={shareData.data.nick} /></p>
                        </li>
                        <li>
                            <p><span>지역 </span><Address></Address></p>
                        </li>
                    </ul>
                    <button type='submit' onClick={updateData}>수정하기</button>
                </form>}
            </div>
        </div>
    )
}
export default ChangeProfile