import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";

function StartExam({ handleStartExam }) {
    return (
        <HStack>
            <VStack>
                <Text fontSize="2xl">Welcome to the Online Exam</Text>
                <Box>
                    <Text>Rules:</Text>
                    <Text>1. You have 30 minutes to complete the exam.</Text>
                    <Text>2. You can only submit the exam once.</Text>
                    <Text>3. Do not refresh the page.</Text>
                    <Text>4. Do not close the browser.</Text>
                    <Text>5. Do not use the back button.</Text>
                    <Text>6. Do not use the forward button.</Text>
                </Box>
            </VStack>
            <VStack>
                <Button
                    onClick={() => {
                        handleStartExam();
                    }}
                >
                    Start Exam
                </Button>
            </VStack>
        </HStack>
    );
}

export default StartExam;
