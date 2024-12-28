import { Box, Link, VStack } from "@chakra-ui/react";
import React from "react";

const Sidebar = () => {
    // Get the current pathname
    const currentPath = window.location.pathname; // Get the current pathname
    // ! Change it to useLocation from React-Dom_Router

    console.log(currentPath);

    const links = [
        {
            name: "Dashboard",
            icon: "dashboard",
            path: "/",
        },
        {
            name: "Users",
            icon: "users",
            path: "/users",
        },
        {
            name: "Products",
            icon: "products",
            path: "/products",
        },
        {
            name: "Orders",
            icon: "orders",
            path: "/orders",
        },
        {
            name: "Settings",
            icon: "settings",
            path: "/settings",
        },
    ];

    return (
        <VStack
            width="200px"
            h="full"
            w={"full"}
            spacing={0}
            spaceY={0}
            gap={0}
            alignItems="flex-start"
            background={"blue.950"}
            color={"white"}
        >
            {links.map((link, index) => (
                <Box
                    key={index}
                    w={"full"}
                    h={"8vh"}
                    p={4}
                    background={currentPath === link.path ? "white" : ""}
                    _hover={{
                        background: "whiteAlpha.400",
                    }}
                    cursor={"pointer"}
                >
                    <Link
                        href={link.path}
                        color={currentPath === link.path ? "black" : "white"}
                        fontWeight={"semibold"}
                        fontSize={"xl"}
                        textAlign={"left"}
                    >
                        {link.name}
                    </Link>
                </Box>
            ))}
        </VStack>
    );
};

export default Sidebar;
