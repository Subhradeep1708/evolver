import { HStack, Box, VStack } from "@chakra-ui/react";
import Sidebar from "../components/common/sidebar/Sidebar";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <HStack background={"red.600"} display={"flex"} gap={0} h={"100vh"}>
            <Box w={"20%"} h={"100%"}>
                <Sidebar />
            </Box>
            <VStack background={"bg.muted"} gap={0} flexGrow={1} h={"100%"}>
                <Navbar />
                <Box
                    background={""}
                    w={"full"}
                    flexGrow={1}
                    p={4}
                    overflow={"auto"}
                >
                    {/* pages will come here */}
                    <Outlet />
                </Box>
            </VStack>
        </HStack>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;
