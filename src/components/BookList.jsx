import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BookList = () => {
    const [books,setBooks]=useState('');
    const [currentUser,setCurrentUser]=useState(null);
    const [search,setSearch]=useState('')
    useEffect(()=>{
        const storedBooks=JSON.parse(localStorage.getItem('books'))||[];
        setBooks(storedBooks);
        const storedUser=JSON.parse(localStorage.getItem('currentUser'))||[];
        setCurrentUser(storedUser);
    },[]);

    const onSearch=(e)=>{
        e.preventDefault();
        const storedBooks=JSON.parse(localStorage.getItem('books'))||[];
        const findBooks = storedBooks.filter((book)=>book.title.includes(search));
        const findAuthors = storedBooks.filter((book)=>book.author.includes(search));
        const findUsers = storedBooks.filter((book)=>book.username.includes(search));
        const find=[...new Set([...findBooks, ...findAuthors, ...findUsers])];
        setBooks(find);
        setSearch('');
    }

    return (
        <div>
            <form onSubmit={onSearch} className='relative'>
                <div className='flex justify-center gap-3 py-2'>
                    <input value={search} onKeyDown={(e)=>e.key==='Enter'&&onSearch} onChange={(e)=>setSearch(e.target.value)} className='placeholder:text-lg border-8 border-cyan-500 w-1/2 h-16 rounded-2xl py-1 px-3' placeholder='제목 / 저자 / 작성자'></input>
                    <button type='submit' className='bg-cyan-800 text-white text-xl font-semibold w-24 h-16 flex items-center justify-center px-3 rounded-2xl'>검색</button>
                    <div className='absolute right-0 top-1/2 -translate-y-1/2 h-14 flex items-center justify-center bg-green-500 text-center w-28 rounded-2xl ml-10 mr-10 border border-gray-400 text-xl'>
                        <Link to={`/create`} className='text-white font-semibold'>책 추가</Link>
                    </div>
                </div>
            </form><br />
            <div className='flex flex-wrap gap-28 ml-10'>
                {books.length > 0 ? (
                    books.map((book)=>(
                        <div key={book.id} className='border border-gray-300 px-10 py-10 rounded justify-center text-center'>
                            <Link to={`/${book.id}`}>
                                <div className='w-[200px] h-[300px] mx-auto mb-3 border border-gray-300 items-center justify-center flex'>
                                    <img src={book.image}
                                    width={200}
                                    height={300}></img><br />
                                </div>
                                {book.title}<br />
                            </Link>
                            <div className='text-sm text-gray-400'>
                                {book.author} 저 <br />
                            </div>
                        </div>
                    ))
                ) : (
                    <div id='list' className='mx-auto text-gray-500'>표시할 책이 없습니다.</div>
                )}
            </div>
        </div>
    );
};

export default BookList;