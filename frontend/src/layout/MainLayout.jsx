import { HStack, Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
    return (
        <HStack background={"red.600"} display={"flex"} gap={0} h={"100vh"}>
            <Box background={"blue.400"} w={"20%"} h={"100%"}>
                <Sidebar />
            </Box>
            <Box background={"darkblue"} flexGrow={1} h={"100%"}>
                {children}
            </Box>
        </HStack>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
