import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const [title,setTitle]=useState('');
    const [author,setAuthor]=useState('');
    const [content,setContent]=useState('');
    const [bookImage,setBookImage]=useState('');
    const navigator=useNavigate();
    const currentUser=JSON.parse(localStorage.getItem("currentUser"));;

    useEffect(()=>{
        if(!currentUser){
            alert("로그인 후에 책 추가가 가능합니다");
            navigator('/login');
        }
    },[]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBookImage(reader.result); 
            };
            reader.readAsDataURL(file);
        }
    };
    
    const onSubmit1=(e)=>{
        e.preventDefault();
        let books=JSON.parse(localStorage.getItem("books")) || [];

        const newBook={
            id:Date.now(),
            title,
            image:bookImage,
            username:currentUser.username,
            author,
            content,
            writerId:currentUser.userId,
            likes:[],
        }
        books.push(newBook);
        localStorage.setItem("books", JSON.stringify(books));

        setTitle('');
        setAuthor('');
        setContent('');
        setBookImage('');

        navigator('/');
    }
    return (
        <div>
            <form onSubmit={onSubmit1}>
                <input placeholder='제목' onChange={(e)=>setTitle(e.target.value)}></input>
                <input placeholder='작가' onChange={(e)=>setAuthor(e.target.value)}></input>
                <input type='textarea' placeholder='내용' onChange={(e)=>setContent(e.target.value)}></input>
                <input type='file' accept='image/*' onChange={handleImageChange} />
                <button type='submit'>추가</button>
            </form>
        </div>
    );
};

export default CreateBook;