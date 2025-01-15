import React, { useState, useEffect, searchParams } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'


const UserDetail = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('id');
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userOne = async () => {
          try {
            const response = await axios.post('http://localhost:8093/PTNV/user/selectOne', null, {
              params: {
                id: userId
              },
            });
            console.log(response.data);
            setUser(response.data);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
        userOne();
      }, []);
      
    return (
        <div>UserDetail</div>
    )
}

export default UserDetail