import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({}); // null indicates no user is logged in
    const [isLoading, setIsLoading] = useState(true); // To manage loading state
    const [accessToken, setAccessToken] = useState(""); // Store access token in memory

    const contextValue = {
        user,
        isLoading,
        setIsLoading,
        accessToken,
        setUser,
        setAccessToken,
    };
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
