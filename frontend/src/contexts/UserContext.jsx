import React,{createContext} from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({
        id: "",
        role: ""
    });
    const contextValue={user,setUser};
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContext;
export const useUser = () => React.useContext(UserContext);