import {
    Box,
    Button,
    HStack,
    Text,
    VStack,
    Circle,
    Span,
} from "@chakra-ui/react";
import { Checkbox } from "./../../../components/ui/checkbox.jsx";

function StartExam({ handleStartExam }) {
    return (
        <HStack
            spacing={10}
            p={8}
            align="flex-start"
            justify="space-between"
            bg="gray.100"
            minH="100vh"
        >
            {/* Instructions Section */}
            <VStack
                align="flex-start"
                spacing={4}
                bg="white"
                p={6}
                flexBasis={"2/3"}
                borderRadius="md"
                boxShadow="lg"
                alignSelf={"stretch"}
            >
                <Text fontSize="4xl" fontWeight="bold">
                    Welcome to the Online Exam
                </Text>
                <Box spaceY={6}>
                    <Text fontSize="2xl" fontWeight="semibold">
                        Instructions:
                    </Text>
                    <Box
                        pl={4}
                        mt={3}
                        display={"flex"}
                        flexDirection={"column"}
                        spaceY={"2"}
                        fontSize={"lg"}
                    >
                        <Text>
                            1. Read the questions carefully before answering.
                        </Text>
                        <Text>
                            2. Attempt all questions within the given time
                            frame.
                        </Text>
                        <Text>
                            3. Save your answers before moving to the next
                            question.
                        </Text>
                        <Text>
                            4. Do not refresh or close the browser during the
                            exam.
                        </Text>
                        <Text>5. Do not use the back button.</Text>
                        <Text>6. Do not use the forward button</Text>
                    </Box>

                    <Box p={1}>
                        <Checkbox size={"sm"} py={1} />
                        <Span
                            fontSize={"sm"}
                            lineHeight={""}
                            color={"gray.600"}
                            pl={2}
                            fontWeight={"medium"}
                        >
                            I have read and understood the instructions. All
                            computer hardware allotted to me are in proper
                            working condition. I declare that I am not in
                            possession of / not wearing / not carrying any
                            prohibited gadget like mobile phone, bluetooth
                            devices etc. /any prohibited material with me into
                            the Examination Hall.I agree that in case of not
                            adhering to the instructions, I shall be liable to
                            be debarred from this Test and/or to disciplinary
                            action, which may include ban from future Tests /
                            Examinations
                        </Span>
                    </Box>
                </Box>

                <Button
                    colorScheme="blue"
                    onClick={handleStartExam}
                    alignSelf="flex-start"
                    mt={"4"}
                    p={"3"}
                    fontSize={"lg"}
                >
                    Start Exam
                </Button>
            </VStack>

            {/* Question Palette Section */}
            <VStack
                align="flex-start"
                spacing={6}
                flexBasis={"1/3"}
                flexDirection={"column"}
                bg="white"
                p={"6"}
                borderRadius="md"
                boxShadow="lg"
            >
                <Text fontSize="2xl" fontWeight="semibold">
                    Question Palette:
                </Text>
                <HStack py={"2"}>
                    <Circle size="30px" bg="green.400" />
                    <Text fontSize={"lg"}>Submitted</Text>
                </HStack>
                <HStack py={"2"}>
                    <Circle size="30px" bg="yellow.400" />
                    <Text fontSize={"lg"}>Marked for Review</Text>
                </HStack>
                <HStack py={"2"}>
                    <Circle size="30px" bg="blue.400" />
                    <Text fontSize={"lg"}>Not Attempted</Text>
                </HStack>
                <HStack py={"2"}>
                    <Circle size="30px" bg="red.400" />
                    <Text fontSize={"lg"}>Attempted but Unsaved</Text>
                </HStack>
                <HStack py={"2"}>
                    <Circle size="30px" bg="gray.300" />
                    <Text fontSize={"lg"}>Not Visited</Text>
                </HStack>
            </VStack>
        </HStack>
    );
}

export default StartExam;
