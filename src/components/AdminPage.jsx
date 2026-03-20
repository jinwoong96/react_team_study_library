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
        <div style={{ 
            backgroundColor: '#b6f0a0',
            minHeight: '100vh', 
            padding: '40px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h1 style={{ marginBottom: '30px', color: '#191a19' }}>관리자 페이지</h1>

            <div style={{ width: '100%', maxWidth: '500px' }}>
                <h2 style={{ color: '#1b1818', marginBottom: '30px' }}>등록된 회원 목록</h2>
                
                {localUsers.length > 0 ? (
                    localUsers.map((user) => (
                        <div key={user.id} style={{
                            backgroundColor: 'white',
                            padding: '15px 25px',
                            borderRadius: '15px',
                            marginBottom: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                            border: '1px solid #eee'
                        }}>
                            <span style={{ color: '#1b1818', fontSize: '14px' }}>ID: {user.id}</span>
                            <span style={{ fontWeight: 'bold', color: '#1b1818' }}>{user.username}</span>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#080808' }}>등록된 회원이 없습니다</p>
                )}
            </div>
        </div>
    );
};

export default AdminPage;