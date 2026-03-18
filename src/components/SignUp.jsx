import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const [isIdDuplicate, setIsIdDuplicate] = useState(false);
    const [isUserNameDuplicate, setIsUserNameDuplicate]= useState(false);

    const navigator=useNavigate();

    useEffect(()=>{
        if (!id) return;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const isDuplicate =users.some(user=>user.id === id);

        setIsIdDuplicate(isDuplicate);
    },[id]);

    useEffect(()=> {
        if (!userName) return;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const isDuplicate = users.some(user => user.userName === userName)

        setIsUserNameDuplicate(isDuplicate);
    },[userName]);

    const onSubmit1=(e)=>{
        e.preventDefault();

        if (isIdDuplicate){
            alert('아이디 중복');
            return;
        }

        if (isUserNameDuplicate) {
            alert('닉네임 중복');
            return;
        }

        const user ={id, password, userName};

        let users=JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);

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
                아이디:<input type='text' value={id} onChange={(e)=>setId(e.target.value)} /> {isIdDuplicate && <p> 이미 사용 중인 아이디입니다</p>}
                <br></br>
                닉네임:<input type='text' value={userName} onChange={(e)=>setUserName(e.target.value)} /> {isUserNameDuplicate && <p> 이미 사용 중인 닉네임입니다</p>}
                <br></br>
                비밀번호:<input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <br></br>
                <button disabled={!id.trim() || !userName.trim() || !password.trim() || id.includes(" ") || password.includes(" ")}>회원가입</button>
            </form>
            
        </div>
    );
};

export default SignUp;

