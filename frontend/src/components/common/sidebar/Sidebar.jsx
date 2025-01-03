import { Box, Link, VStack } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router";
import { useAppStore } from "../../../Store/index.js";

import { links } from "./../../../utils/sidebar-links.js";

const Sidebar = () => {
    // console.log(currentPath);
    const { user } = useAppStore();
    console.log("User: ", user);

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
                    hover={{
                        background: "blue.900",
                    }}
                >
                    <NavLink to={link.path}>{link.name}</NavLink>
                </Box>
            ))}
        </VStack>
    );
};

export default Sidebar;
