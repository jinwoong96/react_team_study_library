import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContextPro';
import { Navigate } from 'react-router-dom';

const AdminPage = () => {
    
    const [localUsers, setLocalUsers]=useState([]);
    const {currentUser}=useAuth();

    useEffect(()=>{
        const storedUsers=JSON.parse(localStorage.getItem("users")) || [];
        setLocalUsers(storedUsers);
    }, [currentUser, Navigate]);

    if(!currentUser || currentUser.username !== 'admin'){
        return null;
    }
    
    return (
        <div>
            <p>회원 목록</p>

            {localUsers.length > 0 ?(
                localUsers.map((user)=>(
                    <p key={user.id}>
                        {user.id} / {user.username}
                    </p>
                 ))
             ) : (
                <p>등록된 회원이 없습니다</p>
             )}
        </div>
    );
};

export default AdminPage;