import { HStack, Box, VStack } from "@chakra-ui/react";
import Sidebar from "../components/common/sidebar/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import { UserProvider } from "../contexts/userContext";
import { Toaster } from "../components/ui/toaster";

const MainLayout = () => {
    return (
        <UserProvider>
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
            <Toaster />
        </UserProvider>
    );
};

export default MainLayout;
