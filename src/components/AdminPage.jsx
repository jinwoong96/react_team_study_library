import React from 'react';
import { useAuth } from './AuthContextPro';

const AdminPage = () => {
    
    const {currentUser, users}=useAuth();

    if(!currentUser || currentUser.username !== 'admin'){
        return null;
    }
    
    return (
        <div>
            <p>회원 목록</p>

            {users.map((user)=>(
                <p key={user.id}>
                {user.id} / {user.username}
                </p>
            ))}
        </div>
    );
};

export default AdminPage;