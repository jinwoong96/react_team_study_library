import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
        const [userName,setUserName]=useState('');
    const navigator=useNavigate();

    const onSubmit1=(e)=>{
        e.preventDefault();

        const user ={id, password,userName};

        let users=JSON.parse(localStorage.getItem("users")) || [];
        user.push(user);

        localStorage.setItem("users",JSON.stringify(users));

        setUserId("");
        setPassword("");
        setUserName

        navigator('/login');
    }

    return (
        <div>
            <form onSubmit={onSubmit1}>
                <h1>회원가입</h1>
                아이디:<input type='text' value={id} onChange={(e)=>setId(e.target.value)}></input>
                비밀번호:<input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                닉네임:<input type='userName' value={userName} onChange={(e)=>setUserName(e.target.value)}></input> 
                <button>회원가입</button>
            </form>
            
        </div>
    );
};

export default SignUp;