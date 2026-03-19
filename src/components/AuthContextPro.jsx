import React,{ createContext, useState, useContext, useEffect }  from 'react';

const AuthContext=createContext();

const AuthContextPro = ({children}) => {
    
    const [users, setUsers] = useState(
        JSON.parse(localStorage.getItem("users")) || []
    );
    
    const [currentUser, setCurrentUser]=useState(
        JSON.parse(localStorage.getItem("currentUser")) || null
    );

    useEffect(()=> {
        if(currentUser){
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }
    }, [currentUser]);

    const logout=()=>{
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    }

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, logout, users, setUsers}}>
            {children}
        </AuthContext.Provider>
            
        
    );
};

export const useAuth=()=>useContext(AuthContext);

export default AuthContextPro;