import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "../css/jip.css"
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
        console.log(formData)
    };

    const UserIdCheck = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_connect}/user/idCheck/${formData.id}`);
            console.log(response.data);
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
    const [parentZonecode, setParentZonecode] = useState('');
    const [parentSido, setParentSido] = useState('');
    const handleAddressChange = (address, zonecode, sido) => {
        setParentAddress(address);
        setParentZonecode(zonecode);
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
            <div class="joinText">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>아이디</label>
                        <input
                            type="text"
                            name="id"
                            onChange={handleChange}
                            required
                            placeholder='예시. e-mail@gmail.com'
                        />
                        <button type="button" onClick={UserIdCheck}>중복 확인</button>
                        {idCheck && <p>{idCheck}</p>}
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <input
                            type="password"
                            name="pw"
                            ref={pwRef}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>비밀번호 확인</label>
                        <input
                            type="password"
                            name="pwCheck"
                            onChange={pwChecking}
                            required
                        /><br />
                        {pwRef.current ? (pwCheck != pwRef.current.value ? '불일치' : null) : null}
                    </div>
                    <div>
                        <label>닉네임</label>
                        <input
                            type="text"
                            name="nick"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>전화번호</label>
                        <input
                            type="text"
                            name="phone"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Address onAddressChange={handleAddressChange} />
                        <input value={parentSido} /><br />
                        주소 : <input name="address" value={parentAddress} onChange={handleChange} ref={addressRef} required /><br />
                        상세 주소 : <input name='addressDetail' onChange={handleChange} ref={addressDetailRef} required />
                    </div>
                    <div>
                        <label>알람여부를 선택해주세요</label>
                    </div>
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </div>
    );
};

export default Join;