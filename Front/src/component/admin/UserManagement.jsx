// pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const UserManagement = ({ setActiveState, setUserNum }) => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const userDetail = () => setActiveState('UserDetail');

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
      <br />
      <br />
      <h1>사용자 관리 페이지입니다.</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => {
            setActiveState('UserDetail')
            setUserNum(user.id)
          }}>
            {user.id}
            {user.nick}
            {user.role}
            {user.institute}
            {user.phone}
            {user.role==='일반사용자'?(user.requestAuth?"O":"X"):null}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserManagement;