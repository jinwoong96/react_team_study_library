import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        const booksWithLikes = storedBooks.map(book => ({
            ...book,
            likes: book.likes || []
        }));
        setBooks(booksWithLikes);

        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        setCurrentUser(storedUser);
    }, []);

    const onSearch = (e) => {
        e.preventDefault();
        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        const findBooks = storedBooks.filter((book) => book.title.includes(search));
        setBooks(findBooks);
        setSearch('');
    };

    return (
        <div className="w-full">
            <div className='bg-green-200 shadow-md flex justify-between items-center py-2 px-10'>
                <div className='font-bold text-gray-700'>
                    {currentUser && `${currentUser.nickname}님 환영합니다!`}
                </div>
                
                <form className='flex gap-3' onSubmit={onSearch}>
                    <input 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                        className='border border-gray-500 rounded py-1 px-3'
                    />
                    <button type='submit' className='bg-black text-white px-3 py-1 rounded'>검색</button>
                    <div className='bg-gray-300 flex px-3 py-1 rounded border border-gray-400 ml-4'>
                        <Link to={`/create`}>책 추가</Link>
                    </div>
                </form>
            </div>

            <br />

            <div className='flex flex-wrap gap-5 ml-10'>
                {books.length > 0 ? (
                    books.map((book) => (
                        <div key={book.id} className='border border-gray-300 px-10 py-10 rounded justify-center text-center'>
                            <Link to={`/${book.id}`}>
                                <img 
                                    src={book.image} 
                                    alt={book.title}
                                    width={120} 
                                    height={180}
                                    className="mx-auto"
                                />
                                <br />
                                {book.title}
                                <br />
                            </Link>
                            <div className='text-sm text-gray-400'>
                                {book.author} 저자
                            </div>
                        </div>
                    ))
                ) : (
                    <div>표시할 책이 없습니다.</div>
                )}
            </div>
        </div>
    );
};

export default BookList;