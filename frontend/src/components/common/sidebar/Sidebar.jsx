import { Box, Link, VStack } from "@chakra-ui/react";
import React from "react";
import { NavLink, useLocation } from "react-router";
import { useAppStore } from "../../../Store/index.js";

import { links } from "./../../../utils/sidebar-links.js";

const Sidebar = () => {
    // console.log(currentPath);
    const user = useAppStore((state) => state.user);
    console.log("User: ", user);
    const location = useLocation();
    const pathname = location.pathname;
    console.log("Pathname: ", pathname);

    const role = user?.role;

    return (
        <VStack
            width="200px"
            h="full"
            w={"full"}
            spacing={0}
            spaceY={0}
            gap={0}
            alignItems="flex-start"
            background={"brand.dark"}
            color={"white"}
        >
            {links[role]?.map((link) => (
                <Box
                    key={link.id}
                    w="full"
                    p={4}
                    background={
                        pathname === link.path ? "brand.light" : "brand.dark"
                    }
                    color={pathname === link.path ? "brand.dark" : "white"}
                    fontWeight="semibold"
                >
                    <NavLink key={link.id} to={link.path}>
                        {link.name}
                    </NavLink>
                </Box>
            ))}
        </VStack>
    );
};

export default Sidebar;
