import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router";
import HomeNav from "../HomeNav";
const LandingLayout = () => {
    return (
        <Box w="100vw" bg="" minH={"100vh"}>
            <Box display={"flex"} justifyContent={"center"}>
                <HomeNav />
            </Box>
            <Outlet />
        </Box>
    );
};

export default LandingLayout;
