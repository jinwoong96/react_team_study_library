import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContextPro";

const Navibar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
    navigate("/");
  }


  return (
    <nav className="bg-slate-900 border-b border-slate-800 shadow-lg h-20 w-full flex items-center px-6 md:px-10 z-50 sticky top-0">
      
      {/* 1. 왼쪽: 홈 버튼 및 관리자 페이지 */}
      <div className="flex items-center gap-6">
        <Link 
          to="/" 
          onClick={handleHomeClick}
          className="text-white font-extrabold text-xl hover:text-sky-400 transition-colors"
        >
          홈
        </Link>

      {/* { 회원관리페이지 넣어놨습니다 } */}
        {currentUser && currentUser.username === 'admin' && (
          <Link 
            to="/AdminPage" 
            className="text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors border border-amber-400/30 px-3 py-1 rounded-lg"
          >
            회원 관리
          </Link>
        )}
      </div>

      {/* 2. 가운데: 사이트 이름 (요청하신 '한줄기록') */}
      <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter shadow-sm">
          한 줄 기 록 📖💬
        </h1>
      </div>

      {/* 3. 오른쪽: 유저 정보 및 인증 버튼들 */}
      <div className="ml-auto flex items-center gap-4">
        {currentUser ? (
          <>
            <span className="text-slate-300 text-sm">
              <span className="text-white font-bold text-base">{currentUser.username}</span>님
            </span>
            <button 
              onClick={handleLogout}
              className="px-5 py-2 rounded-full border border-slate-700 bg-slate-800 text-slate-300 font-medium text-sm hover:bg-slate-700 hover:text-white hover:border-slate-500 transition-all"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              로그인
            </Link>
            <Link 
              to="/signup"
              className="px-5 py-2 rounded-full bg-sky-600 text-white font-bold text-sm hover:bg-sky-500 transition-colors shadow-md shadow-sky-900/50"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navibar;