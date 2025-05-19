import { HStack, Box, VStack } from "@chakra-ui/react";
import Sidebar from "../common/sidebar/Sidebar.jsx";
import Navbar from "../shared/Navbar.jsx";
import { Outlet } from "react-router";
import { Toaster } from "../ui/toaster.jsx";

const MainLayout = () => {
    return (
        <Box>
            <HStack bg={"bg.muted"} display={"flex"} gap={0} h={"100vh"}>
                <Box
                    w={"20%"}
                    h={"100%"}
                    py={2}
                    px={"4"}
                    outline={"none"}
                    border={"none"}
                >
                    <Sidebar />
                </Box>
                <VStack
                    background={"bg.muted"}
                    gap={0}
                    flexGrow={1}
                    h={"100%"}
                    pt={"4"}
                    pr={"4"}
                >
                    <Navbar />
                    <Box
                        background={""}
                        w={"full"}
                        flexGrow={1}
                        py={"4"}
                        overflow={"auto"}
                    >
                        {/* pages will come here */}
                        <Outlet />
                    </Box>
                </VStack>
            </HStack>
            <Toaster />
        </Box>
    );
};

export default MainLayout;
