import React,{ createContext, useState, useContext }  from 'react';

const AuthContext=createContext();

const AuthContextPro = ({children}) => {
    
    const [username, setUsername]=useState(
        JSON.parse(localStorage.getItem("username")) || null,
    );

    const login=(name)=>{
        setUsername(name);
        localStorage.setItem("username", JSON.stringify(name));
    };

    const logout=()=>{
        setUsername(null);
        localStorage.removeItem("username");
    }

    return (
        <AuthContext.Provider value={{ username, login, logout}}>
            {children}
        </AuthContext.Provider>
            
        
    );
};

export const useAuth=()=>useContext(AuthContext);

export default AuthContextPro;