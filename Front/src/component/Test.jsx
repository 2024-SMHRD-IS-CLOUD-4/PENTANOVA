import React, { useState } from 'react'
import axios from 'axios'

const Test = () => {
    const [image, setImage] = useState(null);
    const formData = new FormData();
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('files', image);

        try {
            const response = await axios.post(`${process.env.REACT_APP_connect}/bucket/upload`, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <br />
            <br />
            <h1>테스트</h1>
            <form onSubmit={submit}>
                <input type="file" onChange={handleImageChange} />
                <button type="submit">업로드</button>
            </form>
        </div>
    )
}

export default Test