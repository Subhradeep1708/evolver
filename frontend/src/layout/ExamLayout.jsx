import {
    Box,
    Grid,
    Button,
    Text,
    VStack,
    HStack,
    // Divider,
    SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";

const questions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: `Question ${i + 1}: What is the result of ${i + 2} + ${i + 3}?`,
    options: [`${i + 4}`, `${i + 5}`, `${i + 6}`, `${i + 7}`],
}));

const ExamLayout = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    return (
        <Box p={4}>
            {/* Header */}
            <HStack justify="space-between" bg="teal.500" p={4} color="white">
                <Text fontSize="xl" fontWeight="bold">
                    JEE Exam Panel
                </Text>
                <Text>
                    Time Remaining: <b>02:30:45</b>
                </Text>
            </HStack>

            {/* Main Layout */}
            <Grid templateColumns="3fr 1fr" gap={4} mt={4} h={"100%"}>
                {/* Question Area */}
                <VStack
                    align="start"
                    bg="gray.50"
                    p={4}
                    borderRadius="md"
                    shadow="md"
                >
                    <Text fontSize="lg" fontWeight="semibold" mb={2}>
                        {questions[currentQuestion].question}
                    </Text>
                    <VStack align="start" spacing={2}>
                        {questions[currentQuestion].options.map(
                            (option, idx) => (
                                <Button
                                    key={idx}
                                    variant="outline"
                                    colorScheme="teal"
                                    w="100%"
                                >
                                    {option}
                                </Button>
                            )
                        )}
                    </VStack>
                    <HStack mt={4} justify="space-between" w="full">
                        <Button
                            isDisabled={currentQuestion === 0}
                            onClick={() =>
                                setCurrentQuestion((prev) => prev - 1)
                            }
                            colorScheme="gray"
                        >
                            Previous
                        </Button>
                        <Button
                            isDisabled={
                                currentQuestion === questions.length - 1
                            }
                            onClick={() =>
                                setCurrentQuestion((prev) => prev + 1)
                            }
                            colorScheme="teal"
                        >
                            Next
                        </Button>
                    </HStack>
                </VStack>

                {/* Sidebar */}
                <VStack
                    align="start"
                    bg="gray.50"
                    p={4}
                    borderRadius="md"
                    shadow="md"
                >
                    <Text fontSize="lg" fontWeight="semibold" mb={4}>
                        Question Navigator
                    </Text>
                    <SimpleGrid columns={5} spacing={2}>
                        {questions.map((q, idx) => (
                            <Button
                                key={q.id}
                                colorScheme={
                                    currentQuestion === idx ? "teal" : "gray"
                                }
                                onClick={() => setCurrentQuestion(idx)}
                                size="sm"
                            >
                                {q.id}
                            </Button>
                        ))}
                    </SimpleGrid>
                    {/* <Divider my={4} /> */}
                    <VStack align="start" spacing={2}>
                        <Button colorScheme="yellow" variant="solid" w="100%">
                            Mark for Review
                        </Button>
                        <Button colorScheme="green" variant="solid" w="100%">
                            Submit
                        </Button>
                    </VStack>
                </VStack>
            </Grid>
        </Box>
    );
};

//   export default ExamPanel;
export default ExamLayout;
