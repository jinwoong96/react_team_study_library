import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentTimeString } from '../jss/util';
import { useAuth } from './AuthContextPro';

const CreateComment = ({addComment}) => {

    const {currentUser} = useAuth();
    const {id} = useParams();
    const bookId = parseInt(id);

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
            createdTime:getCurrentTimeString(),
        }
        addComment(newComment);
        setCommentInput('');
    }

    useEffect(()=>{
        if(!currentUser){
            setCommentInput('');
        }
    }, [currentUser]);

    return (
        <div className="gap-3 mb-6 mt-6">
            <div className="mb-1 ml-2 font-semibold text-sm">{currentUser && currentUser.username}</div>
            <div  className="flex-1 w-full">
                <textarea id='comment-input-area' value={commentInput} disabled={!currentUser} placeholder={currentUser?'댓글을 남겨보세요':'댓글을 작성하려면 로그인 해주세요'} onChange={(e)=>setCommentInput(e.target.value)} className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring focus:ring-blue-400" rows={3}/>
            </div>
            <div className="flex justify-end mt-2">
                <button hidden={!currentUser} onClick={addComment1} className="bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600">등록</button>
            </div>
        </div>
    );
};

export default CreateComment;