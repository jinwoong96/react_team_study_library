import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentTimeString } from '../jss/util';
import CreateComment from './CreateComment';

const CommentList = ({bookId}) => {
    
    // 테스트용 코드
    // const {bookId=id} = useParams();
    // const bookId = 1773741190497;
    console.log(getCurrentTimeString());
    
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [like, setLike] = useState(false);

    const toggleLike = () => {
        let storedBooks = JSON.parse(localStorage.getItem("books"));
        if(like){
            // 좋아요 취소하면 로컬에서 삭제
            setLikes(()=>likes.filter((name)=>name!==currentUser.username));
            storedBooks = storedBooks.map((book)=>book.id===bookId?{...book,likes:likes}:book);
            localStorage.setItem("books", JSON.stringify(storedBooks));
        }else{
            // 좋아요 하면 로컬에 추가
            let newLikes = [...likes, currentUser.username];
            storedBooks.likes = newLikes;
            setLikes(newLikes);
            localStorage.setItem("books", JSON.stringify(storedBooks));
        }
        setLike(()=>!like);
    }
    
    const addComment = (newComment) => {
        const storedComments = JSON.parse(localStorage.getItem("comments"));
        storedComments.push(newComment);
        localStorage.setItem("comments", JSON.stringify(storedComments));
        setComments(()=>storedComments.filter((comment)=>comment.bookId===bookId));
    }

    const deleteComment = (id) => {
        if(confirm("댓글을 삭제하시겠습니까?")){
            // 전체 댓글목록 불러옴
            let storedComments = JSON.parse(localStorage.getItem("comments"));
            storedComments = storedComments.filter((comment)=>comment.id!==id);
            // 삭제하고 저장
            localStorage.setItem("comments", JSON.stringify(storedComments));
            // 현재 게시글 댓글 목록 상태 업데이트
            setComments(()=>storedComments.filter((comment)=>comment.bookId===bookId));
        }
    }

    useEffect(()=>{
        // 현재 사용자 정보 가져옴
        setCurrentUser(()=>JSON.parse(localStorage.getItem("currentUser")));
        // 로컬스토리지에 저장된 기존 댓글들 가져옴
        const storedComments = JSON.parse(localStorage.getItem("comments"));
        setComments(()=>storedComments.filter((comment)=>comment.bookId===bookId));
        // 현재 게시글 좋아요 정보
        const storedBooks = JSON.parse(localStorage.getItem("books"));
        const currentBook = storedBooks.find((book)=>book.id===bookId);
        setLikes(()=>currentBook.likes);
    },[]);

    useEffect(()=>{
        setLike(()=>likes.some((name)=>currentUser.username===name));
    }, [currentUser]);

    return (
        <div className="max-w-2xl mx-auto p-4">
            {currentUser?<>
            <button onClick={toggleLike} className='text-sm'><span>{like?<i className="bi bi-heart-fill"></i>:<i className="bi bi-heart"></i>}</span> 좋아요 <span className='font-semibold'>{likes.length}</span></button><button className='ml-5 text-sm'>댓글 <span className='font-semibold'>{comments.length}</span></button>
            <hr/>
            <div className="space-y-2">
                {comments.map((comment)=>(<div key={comment.id}>
                    {/* 유저 닉네임, 삭제버튼 */}
                    <div className="flex justify-between">
                        <div className="font-semibold text-sm">{comment.username}</div>
                        <div>{currentUser.username === comment.username?
                            <button onClick={()=>deleteComment(comment.id)} className='text-sm text-gray-500 hover:text-blue-500'>삭제</button>:<></>}</div>
                    </div>
                    {/* 댓글 내용 */}
                    <div className="text-sm text-gray-700 mt-1">
                        {comment.content}
                    </div>
                    {/* 댓글 쓴 시각 */}
                    <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        {comment.createdTime}
                    </div>
                    <hr/>
                    </div>))}
            </div>
                <CreateComment currentUser={currentUser} addComment={addComment}/>
                </>
                :<div></div>
                }
            
        </div>
    );
};

export default CommentList;