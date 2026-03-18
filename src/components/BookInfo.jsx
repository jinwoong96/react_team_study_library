import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentList from './CommentList';

const BookInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const foundBook = storedBooks.find((b) => String(b.id) === String(id));

        if (foundBook) {
            setBook(foundBook);
            setCurrentUser(user);
        } else {
            alert('존재하지 않는 책입니다.');
            navigate('/');
        }
    }, [id, navigate]);

    const handleDelete = () => {
        if (window.confirm('정말로 이 책을 삭제하시겠습니까?')) {
            const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
            const updatedBooks = storedBooks.filter((b) => String(b.id) !== String(id));
            localStorage.setItem('books', JSON.stringify(updatedBooks));
            alert('삭제되었습니다.');
            navigate('/');
        }
    };

    if (!book) return <div className="p-10 text-center">로딩 중...</div>;

    // <로그인 시는 임시 주석>
    // const isAuthor = currentUser && String(currentUser.id) === String(book.userid);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-8 mb-10 border-b pb-10">
                <div className="md:w-1/3 flex justify-center">
                    <img 
                        src={book.image} 
                        alt={book.title} 
                        className="w-full max-w-[250px] h-auto shadow-lg rounded-md"
                    />
                </div>
                
                <div className="md:w-2/3 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                        <p className="text-gray-600 mb-6 text-lg">저자: {book.author}</p>
                        <p className="text-gray-600 mb-6 text-lg">작성자 : {book.nickname}</p>
                        <div className="bg-gray-50 p-4 rounded-md min-h-[150px]">
                            <p className="text-gray-800 whitespace-pre-wrap">{book.content}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-6 justify-end">
                           {/* <로그인 시는 임시 주석> */}
                        {/* {isAuthor && ( */}
                            <>
                                <button 
                                    onClick={() => navigate(`/EditBookInfo/${book.id}`)}
                                    className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    수정하기
                                </button>
                                <button 
                                    onClick={handleDelete}
                                    className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
                                >
                                    삭제하기
                                </button>
                            </>
                        {/* )} */}
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 transition"
                        >
                            목록으로
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <CommentList bookId={id} />
            </div>

        </div>
    );
};

export default BookInfo;