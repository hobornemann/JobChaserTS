// Observer
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import { onAuthStateChanged, User } from "firebase/auth";


type AuthContextValue = User | null;

export const AuthContext = createContext<AuthContextValue>(null);

type AuthProviderProps = {children: React.ReactNode;};

export const AuthProvider:  React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<AuthContextValue>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            console.log("user: ", user);
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





