import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Test = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const imageName = 'appleMango.jpg';
    useEffect(() => {
        fetch(`${process.env.REACT_APP_connect}/bucket/getImages/${imageName}`)
            .then(response => response.blob())
            .then(blob => setImageUrl(URL.createObjectURL(blob)));
    }, [imageName]);
    return (
        <div>
            <br />
            <br />
            <h1>테스트</h1>
            <div>
                {imageUrl && <img src={imageUrl} alt={imageName} />}
            </div>

        </div>
    )
}

export default Test