import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Test2 = () => {
    const apiKey = '2025bf1f57887434fa9bc8ee7093125f1559';
    const serviceCode = 'SVC05'
    const sickKey = '2';
    const test = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_connect}/test`)
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div>
            <br />
            <br />
            <br />
            <button onClick={test}>검사</button>
        </div>
    )
}

export default Test2