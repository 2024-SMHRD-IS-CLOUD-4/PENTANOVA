import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'

const AdminDpList = ({ dpNums }) => {
    const [dps, setDps] = useState([]);
    const [tpDps, setTpDps] = useState([]);
    const [imageUrls, setImageUrls] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const textRef = useRef();
    const typeRef = useRef();

    useEffect(() => {
        const dpList = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_connect}/dp/dpList`);
                setDps(response.data);
                const imagePromises = response.data.map(dp =>
                    fetch(`${process.env.REACT_APP_connect}/bucket/getImages/DiseasePests/${dp.crop.eng_name}/${dp.img}`)
                        .then(response => response.blob())
                        .then(blob => ({
                            [dp.dp_num]: URL.createObjectURL(blob)
                        }))
                );

                Promise.all(imagePromises)
                    .then(images => {
                        const newImageUrls = images.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                        setImageUrls(newImageUrls);
                        setLoading(true);
                    });

            } catch (error) {
                console.error('Error:', error);
            }
        };
        dpList();
    }, []);
    return (
        <div>
            <div>
                {dps.map((dp, idx) => (
                    <div>
                        <div className='dlConImg'>
                            <img key={idx} src={imageUrls[dp.dp_num]} />
                        </div>
                        <div className='dlConTitle'>
                            <p><span>{dp.crop.name}</span><span>{dp.category ? "해충" : "질병"}</span></p>
                            <h3>{dp.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminDpList