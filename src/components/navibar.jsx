import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContextPro";
import AdminPage from './AdminPage';

const Navibar = () => {
  const { currentUser, logout } = useAuth();

    return (
    <nav style={{
      display: 'flex',
      padding: '10px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}>
        <Link to="/">홈</Link>

        <AdminPage />
      </div>

      <div style={{
        marginLeft: 'auto',
        display: 'flex',
        gap: '10px'
      }}>
        {currentUser ? (
          <>
            <span>{currentUser}님</span>
            <button onClick={logout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
        </div>
    </nav>
    );
};

export default Navibar;