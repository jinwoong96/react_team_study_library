import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentTimeString } from '../jss/util';

const CommentList = () => {
    
    // const {bookId=id} = useParams();
    const bookId = 1773741190497;
    console.log(getCurrentTimeString());
    
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [commentInput, setCommentInput] = useState('');
    
    const addComment = () => {
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
        const storedComments = JSON.parse(localStorage.getItem("comments"));
        storedComments.push(newComment);
        localStorage.setItem("comments", JSON.stringify(storedComments));
        setComments(()=>storedComments.filter((comment)=>comment.bookId===bookId));
    }

    const deleteComment = (id) => {
        // 전체 댓글목록 불러옴
        let storedComments = JSON.parse(localStorage.getItem("comments"));
        storedComments = storedComments.filter((comment)=>comment.id!==id);
        // 삭제하고 저장
        localStorage.setItem("comments", JSON.stringify(storedComments));
        // 현재 게시글 댓글 목록 상태 업데이트
        setComments(()=>storedComments.filter((comment)=>comment.bookId===bookId));
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
        
    }, [comments]);

    // const testComments = [{"id":1773741246867,"bookId":1773741190497,"username":"사용자1","content":"너무 재밌어요", "createdTime":'2026.03.16 14:13'},
    //     {"id":1773741246868,"bookId":1773741190497,"username":"사용자2","content":"퍼가요~", "createdTime":'2026.03.16 14:15'},
    //     {"id":1773741246869,"bookId":1773741190497,"username":"사용자1","content":"흥미진진해요", "createdTime":'2026.03.16 15:13'},
    //     {"id":1773741246870,"bookId":1773741190497,"username":"사용자3","content":"너무 길어요", "createdTime":'2026.03.16 16:13'},
    //     {"id":1773741246871,"bookId":1773741190498,"username":"사용자3","content":"귀찮아요", "createdTime":'2026.03.16 18:13'},
    //     {"id":1773741246872,"bookId":1773741190498,"username":"사용자3","content":"재미없어요", "createdTime":'2026.03.17 15:13'}];
    
    // localStorage.setItem("comments", JSON.stringify(testComments));
    
    // const testBooks = [{"id":1773741246867,"userid":1773741190497,"title":"노인과 바다","likes":['사용자1','사용자2']},
    //     {"id":1773741190497,"userid":1773741190497,"title":"나의 라임 오렌지나무","likes":['사용자1','사용자2','사용자3','사용자4','관리자']},
    //     {"id":1773741246869,"userid":1773741190497,"title":"지킬박사와 하이드씨","likes":['사용자1','사용자2']},
    //     {"id":1773741246870,"userid":1773741190497,"title":"폭풍의 언덕","likes":['사용자1','사용자2']},
    //     {"id":1773741246871,"userid":1773741190498,"title":"그리스 로마 신화","likes":['사용자1','사용자2']},
    //     {"id":1773741246872,"userid":1773741190498,"title":"나 혼자 레벨업","likes":['사용자1','사용자2']}];
    
    // localStorage.setItem("books", JSON.stringify(testBooks));

    return (
        <div>
            {currentUser?<>
            <div>좋아요 {likes.length}</div><div>댓글 {comments.length}</div>
            <hr/>
            {/* 댓글 입력칸 */}
            <div id='comment_input_area'>
                <div>{currentUser.username}</div>
                <textarea value={commentInput} placeholder='댓글을 남겨보세요' onChange={(e)=>setCommentInput(e.target.value)}/>
                <button onClick={addComment}>작성 완료</button>
            </div>
            {comments.map((comment)=>(<div key={comment.id}>
                <div>{comment.username}</div>
                {currentUser.username === comment.username?
                    <button onClick={()=>deleteComment(comment.id)}>삭제</button>:<></>}
                <div>{comment.content}</div>
                <div>{comment.createdTime}</div>
                <hr/>
                </div>))}</>
                :<div></div>
            }
        </div>
    );
};

export default CommentList;