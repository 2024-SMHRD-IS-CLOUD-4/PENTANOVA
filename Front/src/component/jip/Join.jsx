import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "../../css/jip.css"
import Address from './Address';

const Join = () => {
    const [formData, setFormData] = useState({
        id: '',
        pw: '',
        phone: '',
        nick: '',
        location: '',
        role: '일반사용자',
        institute: ''
    });
    const pwRef = useRef();
    const [pwCheck, setPwCheck] = useState(null);
    const [idCheck, setIdCheck] = useState(null);
    const addressRef = useRef();
    const addressDetailRef = useRef();
    const navigate = useNavigate();
    const pwChecking = (e) => {
        setPwCheck(e.target.value);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'addressDetail') {
            let location = parentSido + "/" + parentAddress + "/" + addressDetailRef.current.value;
            setFormData({ ...formData, location: location });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const UserIdCheck = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_connect}/user/idCheck/${formData.id}`);
            if (response.ok) {
                setIdCheck(response.data);
            } else {
                const errorMessage = await response.data;
                setIdCheck(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            setIdCheck("서버와 연결할 수 없습니다.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_connect}/user/join`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                alert('회원가입 성공!');
                setFormData({ id: '', pw: '', nick: '', phone: '', rank: 0, location: '', institute: '' });
                navigate('/');
            } else {
                const errorMessage = await response.data;
                alert(`회원가입 실패!: ${errorMessage} `);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버와 연결할 수 없습니다.');
        }
    };
    const [parentAddress, setParentAddress] = useState('');
    const [parentSido, setParentSido] = useState('');
    const handleAddressChange = (address, sido) => {
        setParentAddress(address);
        switch (sido) {
            case '서울':
            case '인천':
            case '경기':
                setParentSido('경기도')
                break;
            case '강원':
                setParentSido('강원특별자치도')
                break;
            case '충북':
            case '충남':
            case '대전':
            case '세종특별자치시':
                setParentSido('충청도')
                break;
            case '전북특별자치도':
            case '전남':
            case '제주특별자치도':
            case '광주':
                setParentSido('전라도')
                break;
            case '경북':
            case '경남':
            case '대구':
            case '울산':
            case '부산':
                setParentSido('경상도')
                break;
        }
    };
    return (
        <div id="joinBox">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <ul className="joinText">
                    <li>
                        <p><b>아이디</b><span>(이메일형식)</span>를 작성해주세요.</p>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder='예시. e-mail@gmail.com'
                            required
                        />
                        <button type="button" onClick={UserIdCheck}>중복 확인</button>
                        {idCheck && <p>{idCheck}</p>}
                    </li>
                    <li>
                        <p><b>비밀번호</b>를 작성해주세요.</p>
		                <input
                            type="password"
                            name="pw"
                            ref={pwRef}
                            value={formData.pw}
                            onChange={handleChange}
		                    placeholder='8자 이상 작성해주세요.'
                            required
                        />
                    </li>
                    <li>
                        <p><b>비밀번호</b>를 다시한번 작성해주세요.</p>
                        <input
                        type="password"
                        name="pwCheck"
                        onChange={pwChecking}
                        placeholder='동일한 비밀번호로 다시한번 작성해주세요.'
                        required
                        />
                        {pwRef.current?(pwCheck!=pwRef.current.value?'불일치':null):null}
                    </li>
                    <li>
                        <p><b>닉네임</b>을 작성해주세요.</p>
                        <input
                        type="text"
                        name="nick"
                        value={formData.nick}
                        onChange={handleChange}
                        placeholder='2글자 이상 작성해주세요.'
                        required
                        />
                    </li>
                    <li>
                        <p><b>연락처</b>를 작성해주세요.</p>
                        <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder='예시. 01012345678'
                        required
                        />
                    </li>
                    <li>
                        <p><b>지역</b>을 선택해주세요.</p>
                        <Address onAddressChange={handleAddressChange} />
                        <input value={parentSido} /><br />
                        주소 : <input name="address" value={parentAddress} onChange={handleChange} ref={addressRef} required /><br />
                        상세 주소 : <input name='addressDetail' onChange={handleChange} ref={addressDetailRef} required />F
                    </li>
                    <li>
                        <p><b>알람여부</b>를 선택해주세요.</p>
                    </li>
                </ul>
                <button className="button01" type="submit">회원가입</button>
            </form>  
        </div>
    );
};
export default Join;