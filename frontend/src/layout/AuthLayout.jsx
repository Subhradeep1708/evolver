import { Box, Center } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAppStore } from "../Store";
import { useEffect } from "react";

function AuthLayout() {
    const user = useAppStore((state) => state.user);
    const navigate = useNavigate();
    const { pathname } = useLocation();

     

    useEffect(() => {
        // Redirect to dashboard if logged in
        if (user.id !== null && user.role !== null) {
            navigate("/dashboard");
        }
    }, [user.id, user.role, navigate]);

    return (
        <Box>
            <Center h="100vh" w="100vw" overflow={"hidden"}>
                <Outlet />
            </Center>
        </Box>
    );
}

export default AuthLayout;
