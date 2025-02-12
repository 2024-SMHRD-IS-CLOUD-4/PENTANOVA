import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "../../css/jip.css"
import Address from '../api/Address';

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
    const [pwCheck, setPwCheck] = useState('');
    const [idCheck, setIdCheck] = useState(null);
    const addressRef = useRef();
    const addressDetailRef = useRef();
    const navigate = useNavigate();
    const pwChecking = (e) => {
        setPwCheck(e.target.value);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'address') {
            let location = parentSido + "/" + parentAddress;
            console.log(location);
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
    const [isOpen, setIsOpen] = useState(false);
    const handleAddressChange = (address, sido, isOpen) => {
        setParentAddress(address);
        const regionMap = {
            '서울': '경기도',
            '인천': '경기도',
            '경기': '경기도',
            '강원': '강원특별자치도',
            '충북': '충청도',
            '충남': '충청도',
            '대전': '충청도',
            '세종특별자치시': '충청도',
            '전북특별자치도': '전라도',
            '전남': '전라도',
            '제주특별자치도': '전라도',
            '광주': '전라도',
            '경북': '경상도',
            '경남': '경상도',
            '대구': '경상도',
            '울산': '경상도',
            '부산': '경상도',
        };
        if (isOpen) {
            if (addressRef) {
                let location = parentSido + "/" + parentAddress;
                setFormData({ ...formData, location: location });
            }
        }
        setParentSido(regionMap[sido] || '');  // Default to empty string if no match
    };
    return (
        <div id="joinBox">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <ul className="joinText">
                    <li>
                        <p><b>아이디</b><span>(이메일형식)</span>를 작성해주세요.</p>
                        <input
                            className='jipInput'
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder='예시. e-mail@gmail.com'
                            required
                        />
                        <button className="sBtn" type="button" onClick={UserIdCheck}>중복 확인</button>
                        {idCheck && <p>{idCheck}</p>}
                    </li>
                    <li>
                        <p><b>비밀번호</b>를 작성해주세요.</p>
                        <input
                            className='jipInput'
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
                            className='jipInput'
                            type="password"
                            name="pwCheck"
                            onChange={pwChecking}
                            placeholder='동일한 비밀번호로 다시한번 작성해주세요.'
                            required
                        />
                        <p style={{ color: 'red', fontWeight: '700', float: 'right' }}>
                            {pwCheck.length > 0 && pwCheck !== formData.pw && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}
                        </p>
                    </li>
                    <li>
                        <p><b>닉네임</b>을 작성해주세요.</p>
                        <input
                            className='jipInput'
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
                            className='jipInput'
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
                        <input className='jipInput' value={parentSido} />
                    </li>
                    <li>
                        <p>
                            <b>알람여부</b>를 선택해주세요.
                            <span className='toggleSlider'>
                                <input type="checkbox" id='toggleSlider' />
                                <label htmlFor="toggleSlider">on/of</label>
                            </span>
                        </p>

                    </li>
                </ul>
                <button className="button01" type="submit">회원가입</button>
            </form>
        </div>
    );
};
export default Join;