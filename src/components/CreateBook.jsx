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

        try{
            if(!title || !author || !content || !bookImage){
                throw new Error("모든 정보를 입력해주세요.");
            }
        } catch (error) {
            alert(error.message);
            return;
        }

        let books=JSON.parse(localStorage.getItem("books")) || [];

        const newBook={
            id:Date.now(),
            title,
            image:bookImage,
            username:currentUser.username,
            author,
            content,
            userid:currentUser.id,
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

    const cancel=()=>{
        navigator('/');
    }

    return (
        <div className='text-center'>
            <h1 className='text-4xl font-bold mt-5 ml-5 mb-5'>책 추가하기</h1>
            <hr className='mb-8 mx-auto max-w-96 h-1 bg-gray-500' />
            <form onSubmit={onSubmit1}>
                <input className="bg-gray-100 p-2 w-1/3 rounded-md border border-gray-500" placeholder='제목을 입력하세요.' onChange={(e)=>setTitle(e.target.value)}></input><br />
                <input className="bg-gray-100 p-2 w-1/3 mt-2 rounded-md border border-gray-500" placeholder='작가' onChange={(e)=>setAuthor(e.target.value)}></input><br />
                <textarea className="bg-gray-100 p-2 h-96 w-1/3 mt-2 rounded-md border border-gray-500" placeholder='내용' onChange={(e)=>setContent(e.target.value)}></textarea><br />
                
                <div class="flex items-center justify-center mx-auto rounded-md border border-gray-500 bg-gray-100 w-1/4 h-40">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium">
                        <div class="flex flex-col items-center justify-center text-body pt-5 pb-6">
                            <svg class="w-8 h-8 mt-5 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"/></svg>
                            <p class="mb-2 text-md text-gray-700">이미지 업로드</p>
                            <p class="text-xs text-gray-500">클릭 또는 드래그하여 파일 선택</p>
                        </div>
                        <input id='dropzone-file' type='file' accept='image/*' class='hidden' onChange={handleImageChange} /><br />
                    </label>
                </div> 
                
                <button type='submit' className='text-lg bg-blue-500 text-white px-6 py-1 rounded mt-5 mr-2 border border-gray-400'>추가</button>
                <button type='button' className='text-lg bg-red-500 text-white px-6 py-1 rounded mt-5 ml-2 border border-gray-400'onClick={cancel}>취소</button>
            </form>
        </div>
    );
};

export default CreateBook;