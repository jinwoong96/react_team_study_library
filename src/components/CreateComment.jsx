import React, { useState } from 'react';

const CreateComment = ({currentUser, addComment}) => {

    const [commentInput, setCommentInput] = useState('');

    const addComment1 = () => {
        if(!commentInput.trim()){   // 내용 없으면 스킵
            return;
        }
        const newComment = {
            id:Date.now(),
            bookId: bookId,
            username: currentUser.username,
            content:commentInput,
            createdDate:getCurrentTimeString(),
        }
        addComment(newComment);
    }

    return (
        <div className="gap-3 mb-6 mt-6">
            <div className="mb-1 ml-2 font-semibold text-sm">{currentUser.username}</div>
            <div  className="flex-1 w-full">
                <textarea value={commentInput} placeholder='댓글을 남겨보세요' onChange={(e)=>setCommentInput(e.target.value)} className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring focus:ring-blue-400" rows={3}/>
            </div>
            <div className="flex justify-end mt-2">
                <button onClick={addComment1} className="bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600">등록</button>
            </div>
        </div>
    );
};

export default CreateComment;