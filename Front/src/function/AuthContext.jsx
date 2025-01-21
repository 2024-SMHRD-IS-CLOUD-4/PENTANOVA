import React, { createContext, useState } from 'react'


export const AppData = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData)); // 로컬 스토리지 또는 세션 스토리지에 저장
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem('user'); // 로컬 스토리지 또는 세션 스토리지에서 제거
    };

    const value = { isLoggedIn, user, login, logout };
    return <AppData.Provider value={value}>{children}</AppData.Provider>;
}