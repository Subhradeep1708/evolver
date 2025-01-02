import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    HStack,
    VStack,
    Text,
    SimpleGrid,
    // Span,
} from "@chakra-ui/react";
import CountdownTimer from "../../../components/Timer.jsx";
import axios from "axios";
import { useParams } from "react-router";

// unattempted - gray color
// attempted & answered  - green color
// attempted & not answered - red color
// marked for review - purple color
// current question - teal color

const ExamPanel = ({ handleExitExam }) => {
    const [mcqs, setMcqs] = useState([]);
    const [loading, setLoading] = useState(true);

    const { examId } = useParams();

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/exam/${examId}`
                );

                if (response.status === 200) {
                    const data = response.data;
                    const transformedMcqs = data.exam.mcqs.map((q, i) => ({
                        ...q,
                        id: i + 1,
                        isMarkedForReview: false,
                        selectedOption: "",
                        isVisited: i === 0 ? true : false,
                        isAnswered: false,
                    }));
                    setMcqs(transformedMcqs);
                    setLoading(false);
                    console.log("Transformed MCQs:", transformedMcqs);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchExamData();
    }, [examId]);

    console.log("MCQs:", mcqs);

    const computeBackgroundColor = (q) => {
        if (q.isMarkedForReview) {
            return "purple.400";
        } else if (!q.isAnswered && q.isVisited) {
            return "red.400";
        } else if (q.isVisited && q.isAnswered) {
            return "green.400";
        } else {
            return "gray.200";
        }
    };

    const toggleReview = (index) => {
        setMcqs((prev) =>
            prev.map((q, idx) =>
                idx === index
                    ? { ...q, isMarkedForReview: !q.isMarkedForReview }
                    : q
            )
        );
    };

    const handleClearResponse = (index) => {
        setMcqs((prev) =>
            prev.map((q, idx) =>
                idx === index ? { ...q, selectedOption: "" } : q
            )
        );
    };

    const setQuestionVisited = (index) => {
        setMcqs((prev) =>
            prev.map((q, idx) =>
                idx === index ? { ...q, isVisited: true } : q
            )
        );
    };

    const [currentQuestion, setCurrentQuestion] = useState(0);

    if (loading) {
        return <p>Loading...</p>;
    } else if (!loading && mcqs.length === 0) {
        return <p>No questions found</p>;
    } else {
        return (
            <Box h="100vh" color={"black"} bg={"white"}>
                <HStack
                    bg="teal.200"
                    px={4}
                    py={2}
                    shadow={"sm"}
                    color="black"
                    justify="space-between"
                >
                    <Text fontSize="xl" fontWeight="bold">
                        JEE Exam Panel
                    </Text>
                    <CountdownTimer initialMinutes={60} />
                </HStack>

                <Grid
                    templateColumns="3fr 1fr"
                    h="calc(100vh - 4rem)"
                    gap={4}
                    p={4}
                >
                    <VStack
                        bg="gray.50"
                        p={4}
                        borderRadius="md"
                        shadow="md"
                        align="start"
                        overflow="auto"
                        spacing={4}
                        background={"bg"}
                        spaceY={10}
                    >
                        <Box w="100%" h="100%" spaceY={10}>
                            <Text fontSize="lg" fontWeight="bold">
                                {mcqs[currentQuestion].questionBody}
                            </Text>
                            <Grid
                                templateColumns={"1fr 1fr"}
                                templateRows={"1fr 1fr"}
                                gap={4}
                                align="start"
                                w="100%"
                                spacing={2}
                            >
                                {[
                                    "optionA",
                                    "optionB",
                                    "optionC",
                                    "optionD",
                                ].map((optionKey, i) => (
                                    <Button
                                        key={i}
                                        w="100%"
                                        variant="outline"
                                        colorScheme="teal"
                                        color={"black"}
                                        _hover={{
                                            bg: "blue.500",
                                            color: "white",
                                        }}
                                        onClick={() => {
                                            setMcqs((prev) =>
                                                prev.map((q, i) => {
                                                    if (i === currentQuestion) {
                                                        return {
                                                            ...q,
                                                            selectedOption:
                                                                optionKey,
                                                            isAnswered: true,
                                                        };
                                                    }
                                                    return q;
                                                })
                                            );
                                            setMcqs((prev) => {
                                                prev[
                                                    currentQuestion
                                                ].isVisited = true;
                                                return prev;
                                            });
                                            console.log(mcqs);
                                        }}
                                        onAbort={() => {
                                            setMcqs((prev) =>
                                                prev.map((q, i) =>
                                                    i === currentQuestion
                                                        ? {
                                                              ...q,
                                                              selectedOption:
                                                                  optionKey,
                                                          }
                                                        : q
                                                )
                                            );
                                        }}
                                        background={
                                            mcqs[currentQuestion]
                                                .selectedOption === optionKey
                                                ? "teal.500"
                                                : "white"
                                        }
                                    >
                                        {mcqs[currentQuestion][optionKey]}
                                    </Button>
                                ))}
                            </Grid>
                        </Box>

                        <Box w={"100%"}>
                            <Grid
                                w={"100%"}
                                display="flex"
                                justifyContent="space-between"
                                templateColumns="1fr 1fr 1fr 1fr"
                                gap={4}
                            >
                                <Box w={"100%"}>
                                    <Button
                                        onClick={() => {
                                            setCurrentQuestion(
                                                currentQuestion - 1
                                            );
                                            setQuestionVisited(
                                                currentQuestion - 1
                                            );
                                        }}
                                        disabled={currentQuestion === 0}
                                        colorScheme="teal"
                                        p={4}
                                        borderWidth={2}
                                        borderColor={"black"}
                                        w={"100%"}
                                        size={"lg"}
                                    >
                                        Previous
                                    </Button>
                                </Box>
                                <Box w={"100%"}>
                                    <Button
                                        background={
                                            mcqs[currentQuestion]
                                                .isMarkedForReview
                                                ? "purple.400"
                                                : "purple.600"
                                        }
                                        size="lg"
                                        p={4}
                                        onClick={() =>
                                            toggleReview(currentQuestion)
                                        }
                                        color={"white"}
                                        w={"100%"}
                                    >
                                        {mcqs[currentQuestion].isMarkedForReview
                                            ? "Unmark for Review"
                                            : "Mark for Review"}
                                    </Button>
                                </Box>
                                <Box w={"100%"}>
                                    <Button
                                        onClick={() => {
                                            handleClearResponse(
                                                currentQuestion
                                            );
                                        }}
                                        background="red"
                                        p={4}
                                        w={"100%"}
                                        size={"lg"}
                                    >
                                        X Clear
                                    </Button>
                                </Box>
                                <Box w={"100%"}>
                                    <Button
                                        onClick={() => {
                                            const Q = currentQuestion + 1;
                                            setCurrentQuestion(Q);
                                            setQuestionVisited(Q);
                                        }}
                                        disabled={
                                            currentQuestion === mcqs.length - 1
                                        }
                                        colorScheme="teal"
                                        p={4}
                                        borderWidth={2}
                                        borderColor={"black"}
                                        w={"100%"}
                                    >
                                        Next
                                    </Button>
                                </Box>
                            </Grid>
                        </Box>
                    </VStack>

                    <VStack spacing={4} h={"100%"} justify={"space-between"}>
                        <VStack
                            background="bg"
                            p={4}
                            borderRadius="md"
                            shadow="md"
                            align="start"
                            h="90%"
                            overflow="hidden"
                            w={"100%"}
                            scrollBehavior={"smooth"}
                            overflowY={"auto"}
                        >
                            <Text fontSize="lg" fontWeight="semibold">
                                Question Pallet
                            </Text>
                            <SimpleGrid columns={5} spacing={2} w="100%">
                                {mcqs.map((q, idx) => (
                                    <Box key={q.id}>
                                        <Button
                                            size="lg"
                                            background={
                                                currentQuestion == idx
                                                    ? "gray.700"
                                                    : computeBackgroundColor(
                                                          mcqs[idx]
                                                      )
                                            }
                                            color={
                                                currentQuestion == idx
                                                    ? "white"
                                                    : "black"
                                            }
                                            fontWeight={"bold"}
                                            onClick={() => {
                                                setCurrentQuestion(idx);
                                                setMcqs((prev) => {
                                                    prev[idx].isVisited = true;
                                                    return prev;
                                                });
                                            }}
                                            borderRadius={
                                                mcqs[idx].isMarkedForReview
                                                    ? "md"
                                                    : "full"
                                            }
                                            p={2}
                                            m={2}
                                            borderColor={"gray.500"}
                                            borderWidth={2}
                                            aspectRatio={"square"}
                                        >
                                            {q.id}
                                        </Button>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </VStack>

                        <Box w="100%">
                            <Button
                                w="100%"
                                colorScheme="green"
                                size="lg"
                                borderRadius={"md"}
                                shadow={"md"}
                                onClick={() => {
                                    handleExitExam();
                                }}
                            >
                                Submit Exam
                            </Button>
                        </Box>
                    </VStack>
                </Grid>
            </Box>
        );
    }
};

export default ExamPanel;
