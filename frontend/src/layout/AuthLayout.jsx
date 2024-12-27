import { Box, Center } from "@chakra-ui/react";
import PropTypes from "prop-types";

function AuthLayout({ children }) {
    return (
        <Box>
            <Center h="100vh" w="100vw" overflow={"hidden"}>
                {children}
            </Center>
        </Box>
    );
}

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthLayout;
