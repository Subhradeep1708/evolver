
import { createContext, useContext, useState } from "react";

export const AppContext = createContext(null);
export const AppProvider = ({ children }) => {
   
    const [user, setUser] = useState(null);
   
    const value = {
        user,
        setUser,
     
    };
    return( <AppContext.Provider value={value}>
    {children}
    </AppContext.Provider>);
};
export const useAppContext = () => {
    return useContext(AppContext);
};