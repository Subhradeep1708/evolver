import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";
import axios from "axios";
import apiRoutes from "@/lib/routes";

interface User {
    userId: string;
    role: string;
    isLoggedIn: boolean;
}

interface AppContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    login: (email: string, password: string, role: string) => Promise<void>;
    logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string, role: string) => {
        try {
            const loginEndpoint =
                role === "student"
                    ? apiRoutes.studentLogin
                    : apiRoutes.teacherLogin;

            const response = await axios.post(
                loginEndpoint,
                {
                    email,
                    password,
                    role,
                },
                {
                    withCredentials: true,
                }
            ); // handle response
            if (response.status === 200) {
                const data = response.data.data;
                console.log("Login successful", data);
                setUser({
                    userId: data.userId,
                    role: data.role,
                    isLoggedIn: true,
                });
            } else {
                console.error("Login failed", response);
            }
        } catch (error) {
            console.error("Login failed", error);
           
        }
    };

    const logout = () => {
        setUser(null);
    };

    const value: AppContextType = {
        user,
        setUser,
        login,
        logout,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use context
export const useAppContext = (): AppContextType=> {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
