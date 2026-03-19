import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [isIdDuplicate, setIsIdDuplicate] = useState(false);
    const [isUsernameDuplicate, setIsUsernameDuplicate]= useState(false);

    const navigator=useNavigate();

    useEffect(()=>{
        if (!id) return;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const isDuplicate =users.some(user=>user.id === id);

        setIsIdDuplicate(isDuplicate);
    },[id]);

    useEffect(()=> {
        if (!username) return;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const isDuplicate = users.some(user => user.username === username)

        setIsUsernameDuplicate(isDuplicate);
    },[username]);

    const onSubmit1=(e)=>{
        e.preventDefault();

        if (isIdDuplicate){
            alert('아이디 중복');
            return;
        }

        if (isUsernameDuplicate) {
            alert('닉네임 중복');
            return;
        }

        if(!id.trim() || !username.trim() || !password.trim()){
            alert('모든 항목을 입력하세요');
            return;
        }


        const user ={id, password, username};

        let users=JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);

        localStorage.setItem("users",JSON.stringify(users));

        setId("");
        setPassword("");
        setUsername("");

        navigator('/login');
    }

    return (
        <div>
            <form onSubmit={onSubmit1}>
                <h1>회원가입</h1>
                아이디:<input type='text' value={id} onChange={(e)=>setId(e.target.value)} /> {isIdDuplicate && <p> 이미 사용 중인 아이디입니다</p>}
                <br></br>
                닉네임:<input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} /> {isUsernameDuplicate && <p> 이미 사용 중인 닉네임입니다</p>}
                <br></br>
                비밀번호:<input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <br></br>
                <button disabled={ id.includes(" ") || password.includes(" ") || username.includes(" ")}>회원가입</button>
            </form>
            
        </div>
    );
};

export default SignUp;

