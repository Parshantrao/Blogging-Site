import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem('isUserLoggedIn')  || false);

    // Check authentication status on component mount and refresh
    useEffect(() => {
        const checkAuth = async () => {

 
            const response = await fetch('http://localhost:3001/check-auth', {
                credentials: 'include',
                method: 'GET'
            });
            const data = await response.json();

            if (data.status) {
                setIsUserLoggedIn(true);
                localStorage.setItem('isUserLoggedIn', 'true');
            } else {
                setIsUserLoggedIn(false);
                localStorage.setItem('isUserLoggedIn', 'false');
            }
        };

        checkAuth();
    }, []);

    const userLoggedIn = () => {
        setIsUserLoggedIn(true);
        // localStorage.setItem('isUserLoggedIn', 'true');
    };

    const userLoggedOut = () => {
        setIsUserLoggedIn(false);
        // localStorage.setItem('isUserLoggedIn', 'false');
    };

    const isAuthenticated = useMemo(() => {
        return isUserLoggedIn;
    }, [isUserLoggedIn]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userLoggedIn, userLoggedOut }}>
            {children}
        </AuthContext.Provider>
    );
};
