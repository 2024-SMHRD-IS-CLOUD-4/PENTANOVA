import React from 'react'

const AddDp = () => {
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
                setFormData({ id: '', pw: '', nick: '', tel: '', rank: 0, location: '', institute: '' });
                navigate('/');
            } else {
                const errorMessage = await response.text();
                alert(`회원가입 실패!: ${errorMessage} `);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버와 연결할 수 없습니다.');
        }
    }
    return (
        <div>
            <form action="" method="get"></form>

        </div>
    )
}

export default AddDp