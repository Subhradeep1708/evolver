import { Box, Button, Input, Link, Span, Text, VStack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { InputGroup } from "../../components/ui/input-group";
import { LuEye, LuEyeClosed, LuLock, LuUser } from "react-icons/lu";
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
        <Box
            mx="auto"
            w={"100%"}
            py={10}
            maxW="md"
            shadow={"md"}
            p={5}
            borderRadius={"md"}
            background={"bg"}
        >
            <VStack w={"100%"} gap="8" width="full">
                <Text fontSize="2xl" fontWeight="bold">
                    Login
                </Text>
                <Field label="Roll Number" w={"24rem"}>
                    <InputGroup
                        flex="1"
                        startElement={
                            <Span p={"2"}>
                                <LuUser />
                            </Span>
                        }
                        w={"100%"}
                    >
                        <Input w={"100%"} placeholder="GCECTB-R22-XXXX" />
                    </InputGroup>
                </Field>

                <Field label="Password" w={"24rem"}>
                    <InputGroup
                        flex="1"
                        startElement={
                            <Span p={"2"} onClick={toggleEye}>
                                <LuLock />
                            </Span>
                        }
                        endElement={
                            <Box onClick={toggleEye} p={"2"} cursor="pointer">
                                {showPassword ? <LuEye /> : <LuEyeClosed />}
                            </Box>
                        }
                        w={"100%"}
                    >
                        <Input w={"100%"} placeholder="Password" type={type} />
                    </InputGroup>
                    <Link href="/hello" fontSize="sm" color="gray.500">
                        Forgot Password?
                    </Link>
                </Field>

                <Button w={32} colorScheme="blue" size={"lg"} variant="solid">
                    Login
                </Button>
            </VStack>
        </Box>
    );
};

export default StudentLogin;
