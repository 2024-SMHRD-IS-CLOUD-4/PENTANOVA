import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Test2 = () => {
    const [weather, setWeather] = useState();
    const test = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_connect}/api/weatherApi?city=GwangJu`)
            console.log(response.data);
            setWeather(response.data);
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
            <h1>{weather?weather.name:null} 날씨 정보</h1>
            <p>온도: {weather?weather.main.temp:null}°C</p>
            <p>날씨: {weather?weather.weather[0].description:null}</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            
        </div>
    )
}

export default Test2