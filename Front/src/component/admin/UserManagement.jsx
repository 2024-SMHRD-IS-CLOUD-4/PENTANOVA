import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDetail from './UserDetail';

const UserManagement = () => {
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

  const toggleUserDetail = (userId, event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    setActiveUserId(activeUserId === userId ? null : userId);
  };

  return (
    <div id='umMainBox'>
      <div id='umConBox'>
        <div id='umConBoxL'>
          <select name="role" id="">
            <option value="role01">사용자 구분</option>
            <option value="role02">일반</option>
            <option value="role03">연구원</option>
          </select><br />
          <select name="institute" id="">
            <option value="institute01">기관명</option>
            {/* 데이터에 잇는 기관명 가져오기 */}
            <option value="institute02">스마트인재개발원</option>
            <option value="institute03">농업</option>
          </select><br />
          <select name="alarm" id="">
            <option value="alarm01">알람여부</option>
            <option value="alarm02">알람 O</option>
            <option value="alarm03">알람 X</option>
          </select><br />
          <select name="creatD" id="">
            <option value="creatD01">가입년도</option>
            <option value="creatD02">최신순</option>
            <option value="creatD03">등록일순</option>
          </select>
        </div>
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
                onClick={(event) => toggleUserDetail(user.id, event)}
                className={`user-item ${activeUserId === user.id ? 'active' : ''}`}
              >
                <p>
                  <span>{index + 1}</span>
                  <span>{user.role}</span>
                  <span>{user.institute}</span>
                  <span>{user.id}</span>
                  <span>{user.nick}</span>
                  <span></span>
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
