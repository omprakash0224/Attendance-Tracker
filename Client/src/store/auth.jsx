import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState("");



    // const [auth, setAuth] = useState({ studentId: null });

    // const login = (studentId) => {
    //     setAuth({ studentId });
    // };

    // const logout = () => {
    //     setAuth({ studentId: null });
    // };

    const storetokeninLS = (servertoken) => {
        setToken(servertoken);
        return localStorage.setItem("Token", servertoken);
    };

    const storeUserIdInLS = (userId) => {
        setUserId(userId);
        return localStorage.setItem("UserId", userId);
    };

    const storeUsernameInLS = (username) => {
        setUsername(username);
        return localStorage.setItem("Username", username);
    }

    let isLoggedIn = !!token;
    console.log("token", token);
    console.log("isLoggedIn", isLoggedIn);

    //logout functionality
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
        
    };

    return (<AuthContext.Provider value={{ isLoggedIn, storetokeninLS, storeUserIdInLS, storeUsernameInLS, LogoutUser }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext)
}