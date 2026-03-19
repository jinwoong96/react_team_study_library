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
            localStorage.setItem("currentUser", JSON.stringify(loginUser));
            setId("");
            setPassword("");
            navigator('/');
        }
        else{
            alert('아이디 또는 비밀번호가 일치하지 않습니다');
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit2}>
                <h1>로그인</h1>
                아이디:<input type='text' value={id} onChange={(e)=>setId(e.target.value)}></input>
                비밀번호:<input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>

                <button>로그인</button>
            </form>
        </div>
    );
};

export default Login;