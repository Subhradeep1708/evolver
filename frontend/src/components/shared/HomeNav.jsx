import { Box, HStack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";

const HomeNav = () => {
    return (
        <HStack
            w={"full"}
            h={"8vh"}
            position={"absolute"}
            maxW={"breakpoint-sm"}
            background={"#D6E6FE"}
            my={"8"}
            rounded={"full"}
            justify={"space-evenly"}
            zIndex={"10"}
        >
            {links.map((link) => (
                <Box key={link.name} basis={"1/4"}>
                    <NavLink to={link.url} key={link.name} basis={"1/4"}>
                        <Text
                            px={"4"}
                            py={"2"}
                            color={"#102353"}
                            fontWeight={"bold"}
                            fontSize={"lg"}
                            textAlign={"center"}
                        >
                            {link.name}
                        </Text>
                    </NavLink>
                </Box>
            ))}
        </HStack>
    );
};
export default HomeNav;

const links = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "About",
        url: "/about",
    },
    {
        name: "Contact",
        url: "/contact",
    },
    {
        name: "FAQ",
        url: "/faq",
    },
];
