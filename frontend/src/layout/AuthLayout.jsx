import { Box, Center } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router";
import { useAppStore } from "../Store";
function AuthLayout() {
    const user = useAppStore((state) => state.user);
    const navigate = useNavigate();

    if (user.id && user.role) {
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
