import React, { useState, useEffect, useContext } from 'react'
import { useSearchParams } from 'react-router-dom';
import { AppData } from '../function/AuthContext';
import axios from 'axios'


const UserDetail = () => {
  const shareData = useContext(AppData);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');
  const [user, setUser] = useState();
  const content = (
      <button >권한 부여</button>
  )
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
      } catch (error) {
        console.error('Error:', error);
      }
    };
    userOne();
  }, []);
  return (
    <div>
      <h1>UserDetail</h1>
      {user ? user.nick : null}
      {user ? user.id : null}
      {shareData.data.role == "관리자" ? (user ? (user.requestAuth ? content : null) : null) : null}
    </div>
  )
}

export default UserDetail