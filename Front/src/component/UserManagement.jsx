// pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const UserManagement = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userList = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_connect}/user/userList`);
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    userList();
  }, []);
// user 컬럼 : REQUEST_AUTH CREATED_AT PW ROLE INSTITUTE ID LOCATION NICK PHONE
  return (
    <div>
      <h1>사용자 관리 페이지입니다.</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => {
            navigate(`/userDetail?id=${user.id}`)
          }}>
            {user.nick}
            {user.role}
            {user.institute}
            {user.phone}
            {user.requestAuth?"O":"X"}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserManagement;