// Observer
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.config"; 
import { onAuthStateChanged, User } from "firebase/auth";



// TODO: FIXA THEME - GÖR OM NEDANSTÅENDE !!!!


export const AuthContext = createContext<User | null>(null);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);

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





