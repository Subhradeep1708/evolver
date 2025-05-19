import { Box, Center } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAppStore } from "../../Store";
import { useEffect } from "react";

function AuthLayout() {
    const user = useAppStore((state) => state.user);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        const checkLoggedIn = () => {
            if (user.id === null && user.role === null) {
                navigate("/");
            }
        };

        checkLoggedIn();
    }, [user.id, user.role, navigate, pathname]);

    if (user.id !== null && user.role !== null) {
        navigate("/dashboard");
    }

    return (
        <Box>
            <Center h="100vh" w="100vw" overflow={"hidden"}>
                <Outlet />
            </Center>
        </Box>
    );
}

export default AuthLayout;
