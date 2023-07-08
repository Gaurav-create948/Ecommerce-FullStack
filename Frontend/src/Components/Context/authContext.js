import { createContext, useState } from "react";

export const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {
    const [showForm, setShowForm] = useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || false);

    
    function setForm(){
        setShowForm(prevValue => !prevValue);
    }

    return <AuthContext.Provider value={{showForm, setForm, currentUser}}>{children}</AuthContext.Provider>
}