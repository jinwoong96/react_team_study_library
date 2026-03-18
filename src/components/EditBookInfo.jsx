import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBookInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        image: '',
        content: ''
    });

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        const foundBook = storedBooks.find((b) => String(b.id) === String(id));

        if (foundBook) {
            setFormData({
                title: foundBook.title,
                author: foundBook.author,
                image: foundBook.image,
                content: foundBook.content
            });
        } else {
            alert('데이터를 찾을 수 없습니다.');
            navigate('/');
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();

        const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
        
        const updatedBooks = storedBooks.map((book) => 
            String(book.id) === String(id) 
            ? { ...book, ...formData } 
            : book
        );

        localStorage.setItem('books', JSON.stringify(updatedBooks));
        alert('수정이 완료되었습니다.');
        navigate(`/${id}`); 
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-8 border-b pb-4">도서 정보 수정</h1>
            
            <form onSubmit={handleSave} className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col gap-4">
                    <div className="flex justify-center bg-gray-100 p-4 rounded-md">
                        <img 
                            src={formData.image} 
                            alt="미리보기" 
                            className="w-full max-w-[200px] h-auto shadow-md rounded"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/200x300?text=No+Image'}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">이미지 URL</label>
                        <input 
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full border p-2 rounded text-sm"
                            placeholder="이미지 주소를 입력하세요"
                            required
                        />
                    </div>
                </div>

                <div className="md:w-2/3 flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">도서명</label>
                        <input 
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border p-2 rounded font-bold text-lg"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">저자</label>
                        <input 
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">세부 내용</label>
                        <textarea 
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full border p-2 rounded min-h-[250px] resize-none"
                            placeholder="책의 상세 내용을 입력하세요"
                            required
                        />
                    </div>
                    <div className="flex gap-2 mt-4 justify-end">
                        <button 
                            type="submit"
                            className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition"
                        >
                            저장하기
                        </button>
                        <button 
                            type="button"
                            onClick={() => navigate(-1)} // 이전 페이지로 돌아가기
                            className="bg-gray-400 text-white px-8 py-2 rounded hover:bg-gray-500 transition"
                        >
                            취소
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditBookInfo;