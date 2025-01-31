import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AppData } from '../function/AuthContext';
import Address from './Address';

const ChangeProfile = () => {

    const shareData = useContext(AppData);
    const [formData, setFormData] = useState({
        id: shareData.data.id,
        pw: '',
        phone: '',
        nick: '',
        location: '',
        role: shareData.data.role,
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
            <label>소속 기관 : </label><input type="text" name="institute" value={formData.institute} onChange={handleChange} placeholder={shareData.data.institute} readOnly/>
        </li>
    );

    return (

        <div>
            <h1>ChangeProfile</h1>
            <form onSubmit={updateData}>
                <ul>
                    <li><label>아이디 : </label><input type="text" value={shareData.data.id} readOnly /></li>
                    <li><label>비밀번호 : </label><input type="password" name="pw" value={formData.pw} onChange={handleChange} /></li>
                    <li><label>전화번호 : </label><input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder={shareData.data.phone} /></li>
                    <li><label>닉네임 : </label><input type="text" name="nick" value={formData.nick} onChange={handleChange} placeholder={shareData.data.nick} /></li>
                    <Address></Address>
                    {formData.role === '관리자' ? { institute } : null}
                </ul>
                <button type='submit' onClick={updateData}>수정하기</button>
            </form>
        </div>
    )
}
export default ChangeProfile