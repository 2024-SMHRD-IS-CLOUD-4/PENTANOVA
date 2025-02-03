import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/NavBar.css';
import { AppData } from '../function/AuthContext';
import { useContext, useEffect } from 'react';
import { useState } from 'react';

const Navbar = () => {
  const shareData = useContext(AppData);
  const navigate = useNavigate();
  const [isTrue, setIsTrue] = useState(true);
  const [navContent, setNavContent] = useState(
    <ul>
      <li>
        <NavLink to="/" className={isActive => isActive ? 'active' : ''}>
          로그인
        </NavLink>
      </li>
      <li>
        <NavLink to="/join?type=j" className={isActive => isActive ? 'active' : ''}>
          회원가입
        </NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={() => logout()} className={isActive => isActive ? 'active' : ''}>
          로그아웃
        </NavLink>
      </li>
    </ul>
  );
  const logout = () => {
    setIsTrue(false);
    sessionStorage.clear();
    shareData.setData(null);
  }

  useEffect(() => {
    setNavContent(
      <ul>
        <li>
          <NavLink to="/" className={isActive => isActive ? 'active' : ''}>
            로그인
          </NavLink>
        </li>
        <li>
          <NavLink to="/jip" className={isActive => isActive ? 'active' : ''}>
            회원가입
          </NavLink>
        </li>
      </ul>
    );
    if (shareData.data) {
        if (shareData.data.isTrue2) {
          setNavContent(
            <ul>
              <li>
                <NavLink to="/dashboard" className={isActive => isActive ? 'active' : ''}>
                  대시보드
                </NavLink>
              </li>
              <li>
                <NavLink to="/pest" className={isActive => isActive ? 'active' : ''}>
                  병해충 정보 관리
                </NavLink>
              </li>
              <li>
                <NavLink to="/promotion" className={isActive => isActive ? 'active' : ''}>
                  홍보문구 관리
                </NavLink>
              </li>
              {shareData.data.role=='최고관리자'?<li>
                <NavLink to="/users" className={isActive => isActive ? 'active' : ''}>
                  사용자 관리
                </NavLink>
              </li>:null}
              <li>
                <NavLink to="/" onClick={() => logout()} className={isActive => isActive ? 'active' : ''}>
                  로그아웃
                </NavLink>
              </li>
            </ul>
          );
        } else {
          setNavContent(
            <ul>
              <li>
                <NavLink to="/diagnosis" className={isActive => isActive ? 'active' : ''}>
                  병해충 진단
                </NavLink>
              </li>
              <li>
                <NavLink to="/fieldGuide" className={isActive => isActive ? 'active' : ''}>
                  병해충 도감
                </NavLink>
              </li>
              <li>
                <NavLink to="/fumigatorPesticides" className={isActive => isActive ? 'active' : ''}>
                  농약 및 방제 정보
                </NavLink>
              </li>
              <li>
                <NavLink to="/myProfile" className={isActive => isActive ? 'active' : ''}>
                  내 정보 확인하기
                </NavLink>
              </li>
              <li>
                <NavLink to="/" onClick={() => logout()} className={isActive => isActive ? 'active' : ''}>
                  로그아웃
                </NavLink>
              </li>
            </ul >
          );
        }
      }

  }, [shareData.data, navigate]);

  return (
    <nav className="navbar">
      {navContent}
    </nav >
  )
}
export default Navbar;