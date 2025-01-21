import React, { useState, useEffect, searchParams } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'

const DpDetail = () => {
  const [searchParams] = useSearchParams();
  const dp_num = searchParams.get('id');
  const [dp, setDp] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let content;
  useEffect(() => {
    const dpOne = async () => {
      try {
        const response = await axios.post('http://localhost:8093/PTNV/dp/selectOne', null, {
          params: {
            id: dp_num
          },
        });
        console.log(response.data);
        setDp(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    dpOne();
  }, [content]);
  return (
    <div>
      <h1>Dp Detail</h1>
      {content}
    </div>
  )
}
export default DpDetail