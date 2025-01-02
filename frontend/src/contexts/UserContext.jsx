import React, { createContext, useContext, useState, useEffect } from "react";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null indicates no user is logged in
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
