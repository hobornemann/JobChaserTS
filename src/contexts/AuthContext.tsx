// Observer
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import { onAuthStateChanged, User } from "firebase/auth";


type AuthContextValue = {
    user: User | null;
}

export const AuthContext = createContext<AuthContextValue>({user: null});

console.log("AuthContext:",AuthContext)

type AuthProviderProps = {
    children: React.ReactNode;
};


export const AuthProvider:  React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<AuthContextValue>({user: null});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser({user: authUser});
            console.log("authUser: ", authUser);
        });
        return () => unsubscribe();
    }, []);

/*     useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            console.log("user: ", user);
        });
    }, []); */


    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    )
}





