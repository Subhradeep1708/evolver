import { Box, Center, HStack, Span, Text, VStack } from "@chakra-ui/react";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router";

function EndExam() {
    return (
        <Center
            bgGradient="to-br"
            gradientFrom="red.200"
            gradientTo="blue.200"
            h={"100vh"}
            overflow={"hidden"}
        >
            <VStack
                bg={"white"}
                minW={"breakpoint-sm"}
                p={6}
                rounded={"md"}
                shadow={"md"}
                spaceY={6}
            >
                <Center
                    bg={"green.300"}
                    p={2}
                    rounded={"full"}
                    aspectRatio={"square"}
                    w={32}
                >
                    <TiTick color="white" size={96} />
                </Center>
                <Text fontSize={"2xl"} fontWeight={"semibold"}>
                    Exam Ended
                </Text>
                <Text fontSize={"lg"} textAlign={"center"} spaceY={4}>
                    You have successfully ended the exam. <br />
                    <Link to="/dashboard">
                        <Span color={"blue.400"} textDecoration={"underline"}>
                            Go back to dashboard
                        </Span>
                    </Link>
                </Text>
            </VStack>
        </Center>
    );
}
export default EndExam;
