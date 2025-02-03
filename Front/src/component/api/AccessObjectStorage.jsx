import React from 'react'
import AWS from 'aws-sdk';

const AccessObjectStorage = () => {
    const accessKey = process.env.REACT_APP_NCP_Access_Key;
    const secretKey = process.env.REACT_APP_NCP_Secret_Key;
    console.log(accessKey);
    console.log(secretKey);
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_NCP_Access_Key,
        secretAccessKey: process.env.REACT_APP_NCP_Secret_Key,
        region: 'KR', // 예: 'KR'
    });
    const s3 = new AWS.S3();
    const getImage = (key) => {
        const params = {
            Bucket: ' penta-os',
            Key: ' appleMango.jpg', // 가져올 이미지 파일의 이름
        };

        s3.getObject(params, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const blob = new Blob([data.Body], { type: 'image/jpg' }); // 이미지 파일 형식에 따라 type 변경
                const imageUrl = URL.createObjectURL(blob);
                // imageUrl을 사용하여 이미지를 화면에 표시
                const imageElement = document.getElementById('myImage');
                imageElement.src = imageUrl;
            }
        });
    }
    const image = getImage('image.jpg');
    console.log(image);
    return (
        <div>
            <br />
            <br />
            <br />
            AccessObjectStorage
        {image}
        </div>
    )
}

export default AccessObjectStorage