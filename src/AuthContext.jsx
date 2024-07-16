    import React, { createContext, useState } from "react";

    export const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        const login = () => setIsLoggedIn(true);


        return (
            <AuthContext.Provider value={{ isLoggedIn, login }}>
                {children}
            </AuthContext.Provider>
        );
    };
