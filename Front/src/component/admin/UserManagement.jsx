import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDetail from './UserDetail';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null); // 선택한 사용자 ID 저장
  const [sortedData, setSortedData] = useState();
  const [reverseSortedData, setReverseSortedData] = useState();

  useEffect(() => {
    const userList = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_connect}/user/userList`);
        console.log(response.data);
        setUsers(response.data);
        setSortedData(response.data.sort((a, b) => a.createdAt - b.createdAt));
        setReverseSortedData(response.data.sort((a, b) => b.createdAt - a.createdAt));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    userList();
  }, [nameRef, dateRef, alarmRef]);

  const toggleUserDetail = (userId, event) => {
    event.stopPropagation();
    setActiveUserId(activeUserId === userId ? null : userId);
  };

  return (
    <div id='umMainBox'>
      <div id='umConBox'>
        <div id='umConBoxL'>
          <select ref={nameRef} name="role" id="">
            <option value="">사용자 구분</option>
            <option value="일반사용자">일반</option>
            <option value="관리자">연구원</option>
          </select><br />
          <select name="institute" id="">
            <option value="institute01">기관명</option>
            {/* 데이터에 잇는 기관명 가져오기 */}
            {users.map((user, idx) => {
              if (user.institute) {
                return (
                  <option>{user.institute}</option>
                )
              }
            })}
          </select><br />
          <select ref={alarmRef} name="alarm">
            <option value="">알람여부</option>
            <option value="alarm02">알람 O</option>
            <option value="alarm03">알람 X</option>
          </select><br />
          <select ref={dateRef} name="creatD">
            <option value="">날짜정렬</option>
            <option value="1">최신순</option>
            <option value="2">등록일순</option>
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
            {users.map((user, index) => {
              if (user.role !== '최고관리자')
                if ()
                  return (<li
                    key={user.id}
                    onClick={(event) => toggleUserDetail(user.id, event)}
                    className={`user-item ${activeUserId === user.id ? 'active' : ''}`}>
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
                  </li>)
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
