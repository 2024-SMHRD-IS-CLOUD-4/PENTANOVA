import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import UserDetail from './UserDetail';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);

  // 필터 값 관리
  const [roleFilter, setRoleFilter] = useState('');
  const [instituteFilter, setInstituteFilter] = useState('');
  const [alarmFilter, setAlarmFilter] = useState('');
  const [dateSort, setDateSort] = useState('');

  useEffect(() => {
    const userList = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_connect}/user/userList`);
        console.log(response.data);
        setUsers(response.data);
        setFilteredUsers(response.data); // 초기값 설정
      } catch (error) {
        console.error('Error:', error);
      }
    };
    userList();
  }, []);

  // 필터 변경 시 호출되는 함수
  useEffect(() => {
    let updatedUsers = [...users];

    if (roleFilter) {
      updatedUsers = updatedUsers.filter(user => user.role === roleFilter);
    }

    if (instituteFilter) {
      updatedUsers = updatedUsers.filter(user => user.institute === instituteFilter);
    }

    if (alarmFilter) {
      updatedUsers = updatedUsers.filter(user => 
        alarmFilter === "1" ? user.selectAlarm : !user.selectAlarm
      );
    }

    if (dateSort === "1") {
      updatedUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 최신순
    } else if (dateSort === "2") {
      updatedUsers.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // 등록일순
    }

    setFilteredUsers(updatedUsers);
  }, [roleFilter, instituteFilter, alarmFilter, dateSort, users]);

  const toggleUserDetail = (userId, event) => {
    event.stopPropagation();
    setActiveUserId(activeUserId === userId ? null : userId);
  };

  return (
    <div id='umMainBox'>
      <div id='umConBox'>
        {/* 왼쪽 필터 영역 */}
        <div id='umConBoxL'>
          {/* 사용자 구분 필터 */}
          <select onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="">사용자 구분</option>
            <option value="일반사용자">일반</option>
            <option value="관리자">연구원</option>
          </select><br />

          {/* 기관명 필터 */}
          <select onChange={(e) => setInstituteFilter(e.target.value)}>
            <option value="">기관명</option>
            {[...new Set(users.map(user => user.institute))].map((institute, idx) => (
              <option key={idx} value={institute}>{!institute?'없음':institute}</option>
            ))}
          </select><br />

          {/* 알람 여부 필터 */}
          <select onChange={(e) => setAlarmFilter(e.target.value)}>
            <option value="">알람여부</option>
            <option value="1">알람 O</option>
            <option value="2">알람 X</option>
          </select><br />

          {/* 날짜 정렬 필터 */}
          <select onChange={(e) => setDateSort(e.target.value)}>
            <option value="">날짜정렬</option>
            <option value="1">최신순</option>
            <option value="2">등록일순</option>
          </select>
        </div>

        {/* 오른쪽 사용자 리스트 영역 */}
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
            {filteredUsers.map((user, index) => (
              user.role !== '최고관리자' && (
                <li key={user.id}
                    onClick={(event) => toggleUserDetail(user.id, event)}
                    className={`user-item ${activeUserId === user.id ? 'umactive' : ''}`}>
                  <p>
                    <span>{index + 1}</span>
                    <span>{user.role}</span>
                    <span>{user.institute}</span>
                    <span>{user.id}</span>
                    <span>{user.nick}</span>
                    <span>{user.selectAlarm ? 'O' : 'X'}</span>
                    <span>{user.createdAt.slice(0, 10)}</span>
                  </p>
                  <div className='umToggle'>
                    {activeUserId === user.id && <UserDetail user={user} />}
                  </div>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;