import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "../css/jip.css"

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
    const [idCheck, setIdCheck] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const UserIdCheck = async () => {
        try {
            const response = await axios.get(`http://localhost:8093/PTNV/user/idCheck/${formData.id}`);
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
            const response = await axios.post('http://localhost:8093/PTNV/user/join', formData,{ 
                headers: {                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                alert('회원가입 성공!');
                setFormData({id: '', pw: '', nick: '', phone: '', rank : 0, location: '', institute: '' });
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

    return (
        <div id="jipBody">
            <div id="jipMainBox">
                <div class="jipleftBox">
                    <ul>
                        <li><button>회원가입</button></li>
                        <li><button>아이디찾기</button></li>
                        <li><button>비밀번호 찾기</button></li>
                    </ul>
                </div>
                <div class="jipRightBox">
                    <div id="joinBox">
                        <h2>회원가입</h2>
                        <div class="joinText">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>아이디</label>
                                    <input
                                        type="text"
                                        name="id" 
                                        value={formData.id}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button type="button" onClick={UserIdCheck}>중복 확인</button>
                                    {idCheck && <p>{idCheck}</p>}
                                </div>
                                <div>
                                    <label>비밀번호</label>
                                    <input
                                        type="password"
                                        name="pw"
                                        value={formData.pw}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>비밀번호 확인</label>
                                    <input
                                        type="password"
                                        name="pw"
                                        value={formData.pw}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>닉네임</label>
                                    <input
                                        type="text"
                                        name="nick"
                                        value={formData.nick}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>전화번호</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>지역</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>알람여부를 선택해주세요</label>
                                </div>
                                <button type="submit">회원가입</button>
                            </form>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Join;