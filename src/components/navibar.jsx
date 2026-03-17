import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContextPro";
import { useNavigate } from 'react-router-dom';

const Navibar = () => {
  const { username, logout } = useAuth();

  return (
    <nav>
      <div>
        <Link to="/">홈</Link>
        <Link to="/booklist">책 목록</Link>
      </div>

      <div>
        {username ? (
          <>
            <span>{username}님</span>
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