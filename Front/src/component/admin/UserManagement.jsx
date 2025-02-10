import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserDetail from './UserDetail';

const UserManagement = ({ setActiveState, setCropNum }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null); // 선택한 사용자 ID 저장

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

  const toggleUserDetail = (userId) => {
    setActiveUserId(activeUserId === userId ? null : userId); // 클릭 시 토글
  };

  return (
    <div id='umMainBox'>
      <div id='umConBox'>
        <div id='umConBoxL'></div>
        <div id='umConBoxR'>
          <p>
            <span>No.</span>
            <span>사용자</span>
            <span>기관명</span>
            <span>아이디</span>
            <span>닉네임</span>
            <span>알람 여부</span>
            <span>가입일자</span>
          </p>
          <ul className='scroll'>
            {users.map((user, index) => (
              <li 
                key={user.id} 
                onClick={() => toggleUserDetail(user.id)}
                className={activeUserId === user.id ? 'active' : ''}
              >
                <p>
                  <span>{index + 1}</span>
                  <span>{user.role}</span>
                  <span>{user.institute}</span>
                  <span>{user.id}</span>
                  <span>{user.nick}</span>
                  <span>{user.role === '일반사용자' ? (user.requestAuth ? "O" : "X") : null}</span>
                  <span>{user.createdAt.slice(0,10)}</span>
                </p>
                {/* 특정 `user.id`와 `activeUserId`가 일치할 때만 UserDetail 표시 */}
                <div className='umToggle'>
                  {activeUserId === user.id && <UserDetail user={user} />}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
