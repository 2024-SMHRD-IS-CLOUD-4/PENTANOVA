import React, { useState, useEffect, searchParams } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'

const DpDetail = ({dpNum}) => {
  const [searchParams] = useSearchParams();
  const dp_num = searchParams.get('id');
  const [dp, setDp] = useState();
  console.log(dpNum)
  useEffect(() => {
    const dpOne = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_connect}/dp/selectOne`, null, {
          params: {
            dp_num: dpNum
          },
        });
        setDp(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    dpOne();
  }, []);
  return (
    <div>
      <h1>Dp Detail</h1>
      {dp ? dp.name : null}
      {dp ? dp.name : null}
      {dp ? dp.region : null}
      {dp ? dp.region : null}
    </div>
  )
}

export default DpDetail