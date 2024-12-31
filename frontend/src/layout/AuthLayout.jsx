import { Box, Center } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Outlet } from "react-router";
function AuthLayout() {
    return (
        <Box>
            <Center h="100vh" w="100vw" overflow={"hidden"}>
                <Outlet />
            </Center>
        </Box>
    );
}



export default AuthLayout;
