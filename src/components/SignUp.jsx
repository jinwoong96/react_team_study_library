import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [idCheck, setIdCheck]= usetState('');
    const [userNameCheck, setUserNameCheck]= useState('');
    const navigator=useNavigate();

    const onSubmit1=(e)=>{
        e.preventDefault();

        const user ={id, password, userName};

        let users=JSON.parse(localStorage.getItem("users")) || [];
        user.push(user);

        localStorage.setItem("users",JSON.stringify(users));

        setId("");
        setPassword("");
        setUserName("");

        navigator('/login');
    }

    return (
        <div>
            <form onSubmit={onSubmit1}>
                <h1>회원가입</h1>
                아이디:<input type='text' value={id} onChange={(e)=>setId(e.target.value)}></input>
                <br></br>
                닉네임:<input type='text' value={userName} onChange={(e)=>setUserName(e.target.value)}></input>
                <br></br>
                비밀번호:<input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <br></br>
                <button>회원가입</button>
            </form>
            
        </div>
    );
};

export default SignUp;