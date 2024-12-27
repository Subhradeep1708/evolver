import { Box, Button, Input, Link, Span, Text, VStack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { InputGroup } from "../../components/ui/input-group";
import { LuUser } from "react-icons/lu";
import { PasswordInput } from "../../components/ui/password-input";

import { useState } from "react";
const StudentLogin = () => {
    const [rollNoError, setRollNoError] = useState("Invalid Roll No");

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
                <Field
                    label="Roll Number"
                    w={"24rem"}
                    invalid
                    errorText={rollNoError}
                >
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

                <Field label="Password">
                    <PasswordInput px={2} />
                </Field>
                <Link href="/hello" fontSize="sm" color="gray.500">
                    Forgot Password?
                </Link>
                {/* </Field> */}

                <Button w={32} colorScheme="blue" size={"lg"} variant="solid">
                    Login
                </Button>
            </VStack>
        </Box>
    );
};

export default StudentLogin;
