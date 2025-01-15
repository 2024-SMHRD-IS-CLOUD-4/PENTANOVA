import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
    const [formData, setFormData] = useState({
        id: '',
        pw: '',
        tel:'',
        nick: '',
        location:'',
        rank: 0,
        institute: ''
    });
    const [idCheck, setIdCheck] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUsernameCheck = async () => {
        try {
            const response = await fetch(`http://localhost:8093/PTNV/api/idCheck/${formData.id}`);
            if (response.ok) {
                setIdCheck("사용 가능한 아이디입니다.");
            } else {
                const errorMessage = await response.text();
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
            const response = await fetch('http://localhost:8093/PTNV/api/join', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('회원가입 성공!');
                setFormData({id: '', pw: '', nick: '', tel: '', rank : 0, location: '', institute: '' });
                navigate('/');
            } else {
                const errorMessage = await response.text();
                alert(`회원가입 실패!: ${errorMessage} `);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버와 연결할 수 없습니다.');
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
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
                    <button type="button" onClick={handleUsernameCheck}>중복 확인</button>
                    {idCheck && <p>{idCheck}</p>}
                </div>
                <div>
                    <label>비밀번호</label>
                    <input
                        type="text"
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
                        name="tel"
                        value={formData.tel}
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
                    <label>기관명</label>
                    <input
                        type="text"
                        name="institute"
                        value={formData.institute}
                        onChange={handleChange}
                        required
                    />
                    
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};
export default Join;