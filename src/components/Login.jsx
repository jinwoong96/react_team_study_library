import React, { useState } from 'react';
import {useAuth} from './AuthContextPro';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {

    const [id, setId] = useState('');
    const [password,setPassword]=useState('');
    const navigator=useNavigate();
    const {setCurrentUser} = useAuth();
    
    const onSubmit2=(e)=>{
        e.preventDefault();

        let users=JSON.parse(localStorage.getItem("users")) || [];
        const loginUser=users.find((user)=> user.id === id && user.password === password);
        if(loginUser){
            setCurrentUser(loginUser);
            localStorage.setItem("currentUser", JSON.stringify(loginUser))
            setId("");
            setPassword("");
            navigator('/');
        }
        else{
            alert('아이디 또는 비밀번호가 일치하지 않습니다');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5dc]">
            <form onSubmit={onSubmit2} className="bg-white p-8 rounded-2xl shadow-lg border border-[#D7EFE5]">
                <h1 className="text-2xl font-bold text-center mb-6 text-[#4E9F84]">로그인</h1>
                아이디:<input type='text' value={id} onChange={(e)=>setId(e.target.value)}
                className="w-full mt-1 mb-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9FD8C0]"/>
                비밀번호:<input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}
                className="w-full mt-1 mb-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9FD8C0]"/>

                <button
                className={`w-full py-2 rounded-lg font-semibold transition
                            ${
                                id.includes(" ") || password.includes(" ") || !id.trim() || !password.trim()
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-[#7DBFA6] hover:bg-[#6EAF97] text-white"
                          }`}
                >로그인</button>
            </form>
            
        </div>
    );
};

export default Login;