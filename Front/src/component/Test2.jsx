import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Test2 = () => {
    const [imageUrl, setImageUrl] = useState();
    const test = async () => {
        let namea = '2025-02-03T09:38:01애플망고'
        const respose = await fetch(`${process.env.REACT_APP_connect}/bucket/getImages/HisDiagnosis/2025-02-04T08:25:51(appleMango).png`)
            .then(response => response.blob())
            .then(blob => (
                setImageUrl(URL.createObjectURL(blob))
            ))
    }
    test();
    return (
        <div>
            <img src={imageUrl} />
        </div>
    )
}

export default Test2