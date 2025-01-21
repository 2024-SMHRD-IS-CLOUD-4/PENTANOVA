import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const HisDiagnosis = () => {
  const navigate = useNavigate();
  const [hts, setHts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const htList = async () => {
      try {
        const response = await axios.get('http://localhost:8093/PTNV/his/htList');
        console.log(response.data);
        setHts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    htList();
  }, []);

  return (
    <div>
      HisDiagnosis
      <ul>
        {hts.map(ht => (
          <li key={ht.his_num} onClick={() => {
            navigate(`/hisDetail?id=${ht.his_num}`)
          }}>
            {ht.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HisDiagnosis