import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useAppStore } from "../Store";

const Logout = () => {
    const { user, setUser } = useAppStore();

    const handleLogout = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/auth/logout"
            );
            if (response.status === 200) {
                console.log("Logged out successfully");
                setUser(null);
            } else {
                console.log("Error:", response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return <Button onClick={handleLogout}>Log Out</Button>;
};
export default Logout;
