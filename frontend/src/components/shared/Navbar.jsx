import { Avatar, Box, Button, HStack, Text } from "@chakra-ui/react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./../ui/menu";
import { RxAvatar } from "react-icons/rx";
import Logout from "./Logout";

function Navbar() {
    return (
        <HStack
            w={"full"}
            background={"bg"}
            h={"8vh"}
            justifyContent={"space-between"}
            p={3}
            borderRadius={"24px"}
            shadow={"md"}
        >
            <Box p={4}>
                <Text>Raktim is on fire </Text>
                <Text fontSize={"xs"}>Roll:1234</Text>
            </Box>
            <Box>
                <Text>Exam Dashboard</Text>
            </Box>
            <Box>
                <MenuRoot>
                    <MenuTrigger asChild>
                        {/* <Button variant="outline" size="sm" p={0}>
                            <RxAvatar />
                        </Button> */}
                        <RxAvatar size={"36"} />
                    </MenuTrigger>
                    <MenuContent p={3}>
                        <MenuItem value="logout">
                            <Logout />
                        </MenuItem>
                        <MenuItem value="login">Log In</MenuItem>
                    </MenuContent>
                </MenuRoot>
            </Box>
        </HStack>
    );
}
export default Navbar;
