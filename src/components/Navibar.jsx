import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContextPro";
import AdminPage from "./AdminPage";

const Navibar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
    window.location.reload();
  };
  return (
    <nav
      style={{
        display: "flex",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <Link to="/" onClick={handleHomeClick}>
          홈
        </Link>

        <AdminPage />
      </div>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: "10px",
        }}
      >
        {currentUser ? (
          <>
            <span>{currentUser.username}님</span>
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