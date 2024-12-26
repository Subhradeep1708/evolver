import { Box, Button, Input, Span, VStack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { InputGroup } from "../../components/ui/input-group";
import { LuEye, LuUser } from "react-icons/lu";
// import { Field } from "@/components/ui/field";
import { useState } from "react";
const StudentLogin = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [type, setType] = useState("password");
    const toggleEye = () => {
        setShowPassword(!showPassword);
        setType(showPassword ? "text" : "password");
    };
    return (
        <Box mx="auto" w={"100%"} py={10} maxW="md">
            <VStack w={"100%"} gap="10" width="full" background={"red"}>
                <InputGroup
                    flex="1"
                    startElement={
                        <Button p={"2"}>
                            <LuUser />
                        </Button>
                    }
                    w={"70%"}
                >
                    <Input w={"100%"} placeholder="Username" />
                </InputGroup>

                <InputGroup
                    flex="1"
                    startElement={
                        <Button p={"2"} onClick={toggleEye}>
                            <LuEye />
                        </Button>
                    }
                    w={"70%"}
                >
                    <Input w={"100%"} placeholder="Password" type={type} />
                </InputGroup>

                <Button w={32} colorScheme="blue" size={"lg"} variant="solid">
                    Login
                </Button>
            </VStack>
        </Box>
    );
};

export default StudentLogin;
