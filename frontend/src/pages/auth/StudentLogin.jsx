import { Box, Button, Input, VStack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { InputGroup } from "../../components/ui/input-group";
import { LuEye, LuUser } from "react-icons/lu";
// import { Field } from "@/components/ui/field";

const StudentLogin = () => {
    return (
        <Box mx="auto" w={"100%"} py={10} maxW="md">
            <VStack w={"100%"} gap="10" width="full">
                <InputGroup flex="1" startElement={<LuUser />}>
                    <Input w={"100%"} placeholder="Username" />
                </InputGroup>

                <InputGroup flex="1" startElement={<LuEye />}>
                    <Input w={"100%"} ps="4.75em" placeholder="yoursite.com" />
                </InputGroup>

                <Button w={32} colorScheme="blue" size={"lg"} variant="solid">
                    Login
                </Button>
            </VStack>
        </Box>
    );
};

export default StudentLogin;
