import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null indicates no user is logged in
    const [isLoading, setIsLoading] = useState(true); // To manage loading state
    const [accessToken, setAccessToken] = useState(""); // Store access token in memory

    // Fetch user profile after login
    const fetchUser = async (token) => {
        try {
            const response = await axios.get("/api/user", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Login function
    const login = async (credentials) => {
        try {
            const response = await axios.post("/api/login", credentials);
            setAccessToken(response.data.accessToken);
            // Optionally store refresh token in an HTTP-only cookie
            await fetchUser(response.data.accessToken);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    // Refresh token function
    const refreshAccessToken = async () => {
        try {
            const response = await axios.post("/api/refresh");
            setAccessToken(response.data.accessToken);
            return response.data.accessToken;
        } catch (error) {
            console.error("Error refreshing token:", error);
            logout();
        }
    };

    // Logout function
    const logout = () => {
        setAccessToken("");
        setUser(null);
        // Optionally clear cookies if using refresh tokens in cookies
    };

    // Automatically fetch user info on app load if access token exists
    useEffect(() => {
        if (accessToken) {
            fetchUser(accessToken);
        } else {
            setIsLoading(false);
        }
    }, [accessToken]);

    // Provide the context value
    const contextValue = { user, login, logout, isLoading, refreshAccessToken };
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export default UserContext;
