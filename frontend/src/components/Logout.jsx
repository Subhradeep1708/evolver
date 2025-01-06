import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useAppStore } from "../Store";
import { useNavigate } from "react-router";

const Logout = () => {
    const user = useAppStore((state) => state.user);
   
    const setUser = useAppStore((state) => state.setUser);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
           
            const response = await axios.get(
                `http://localhost:5000/api/auth/logout/${user.id}`,
                { withCredentials: true } // Ensure cookies are sent with the request
            );
            if (response.status === 200) {
                setUser({
                    id: null,
                    role: null,
                });
                console.log("Logged Out");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return <Button onClick={handleLogout}>Log Out</Button>;
};
export default Logout;
