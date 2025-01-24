import React, { useState, useEffect, searchParams } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'

const DpDetail = () => {
  const [searchParams] = useSearchParams();
  const dp_num = searchParams.get('id');
  const [dp, setDp] = useState();

  useEffect(() => {
    console.log("123123");
    const dpOne = async () => {
      try {
        const response = await axios.post(`http://localhost:8093/PTNV/dp/selectOne`, null, {
          params: {
            dp_num: dp_num
          },
        });
        console.log(response.data)
        setDp(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
      dpOne();
    };
  }, []);
  return (
    <div>
      <h1>Dp Detail</h1>
      {dp ? dp.name : null}
    </div>
  )
}

export default DpDetail