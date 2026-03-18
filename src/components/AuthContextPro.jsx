import React,{ createContext, useState, useContext }  from 'react';

const AuthContext=createContext();

const AuthContextPro = ({children}) => {
    
    const [currentUser, setCurrentUser]=useState(
        JSON.parse(localStorage.getItem("currentUser")) || null,
    );

    const login=(name)=>{
        setCurrentUser(name);
        localStorage.setItem("currentUser", JSON.stringify(name));
    };

    const logout=()=>{
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
            
        
    );
};

export const useAuth=()=>useContext(AuthContext);

export default AuthContextPro;