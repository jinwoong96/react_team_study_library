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
            <form className='bg-green-200 shadow-md flex justify-end gap-3 py-2' onSubmit={onSearch}>
                <input value={search} onKeyDown={(e)=>e.key==='Enter'&&onSearch} onChange={(e)=>setSearch(e.target.value)} className='border border-gray-500 rounded py-1 px-3'></input>
                <button type='submit' className='bg-black text-white px-3 py-1 rounded'>검색</button>
                <div className='bg-gray-300 flex px-3 py-1 rounded ml-10 mr-10 border border-gray-400'>
                    <Link to={`/create`}>책 추가</Link>
                </div>
            </form><br />
            <div className='flex flex-wrap gap-5 ml-10'>
                {books.length > 0 ? (
                    books.map((book)=>(
                        <div key={book.id} className='border border-gray-300 px-10 py-10 rounded justify-center text-center'>
                            <Link to={`/${book.id}`}>
                                <img src={book.image}
                                width={120}
                                height={180}></img><br />
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