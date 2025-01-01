import { useState } from "react";
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

const mcqs = [
    {
        id: 1,
        question:
            "What is the capital of France? Hi . Raktim is on fire. Are you ?",
        optionA: "Paris",
        optionB: "Berlin",
        optionC: "Madrid",
        optionD: "Rome",
    },
    {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        optionA: "Venus",
        optionB: "Mars",
        optionC: "Jupiter",
        optionD: "Saturn",
    },
    {
        id: 3,
        question: "What is the square root of 81?",
        optionA: "7",
        optionB: "8",
        optionC: "9",
        optionD: "10",
    },
    {
        id: 4,
        question: "Which element has the chemical symbol 'O'?",
        optionA: "Oxygen",
        optionB: "Gold",
        optionC: "Osmium",
        optionD: "Ozone",
    },
    {
        id: 5,
        question: "What is the largest mammal on Earth?",
        optionA: "Elephant",
        optionB: "Blue Whale",
        optionC: "Giraffe",
        optionD: "Great White Shark",
    },
    {
        id: 6,
        question: "What is the chemical symbol for water?",
        optionA: "H2O",
        optionB: "O2",
        optionC: "CO2",
        optionD: "H2",
    },
    {
        id: 7,
        question: "Who wrote 'To Kill a Mockingbird'?",
        optionA: "Harper Lee",
        optionB: "Mark Twain",
        optionC: "Ernest Hemingway",
        optionD: "F. Scott Fitzgerald",
    },
    {
        id: 8,
        question: "What is the speed of light?",
        optionA: "300,000 km/s",
        optionB: "150,000 km/s",
        optionC: "450,000 km/s",
        optionD: "600,000 km/s",
    },
    {
        id: 9,
        question: "Who painted the Mona Lisa?",
        optionA: "Vincent van Gogh",
        optionB: "Pablo Picasso",
        optionC: "Leonardo da Vinci",
        optionD: "Claude Monet",
    },
    {
        id: 10,
        question: "What is the largest planet in our solar system?",
        optionA: "Earth",
        optionB: "Mars",
        optionC: "Jupiter",
        optionD: "Saturn",
    },
    {
        id: 11,
        question: "What is the smallest prime number?",
        optionA: "0",
        optionB: "1",
        optionC: "2",
        optionD: "3",
    },
    {
        id: 12,
        question: "Who discovered penicillin?",
        optionA: "Marie Curie",
        optionB: "Alexander Fleming",
        optionC: "Isaac Newton",
        optionD: "Albert Einstein",
    },
    {
        id: 13,
        question: "What is the capital of Japan?",
        optionA: "Beijing",
        optionB: "Seoul",
        optionC: "Tokyo",
        optionD: "Bangkok",
    },
    {
        id: 14,
        question: "What is the hardest natural substance on Earth?",
        optionA: "Gold",
        optionB: "Iron",
        optionC: "Diamond",
        optionD: "Platinum",
    },
    {
        id: 15,
        question: "Who is known as the father of computers?",
        optionA: "Charles Babbage",
        optionB: "Alan Turing",
        optionC: "Bill Gates",
        optionD: "Steve Jobs",
    },
    {
        id: 16,
        question: "What is the main ingredient in guacamole?",
        optionA: "Tomato",
        optionB: "Onion",
        optionC: "Avocado",
        optionD: "Pepper",
    },
    {
        id: 17,
        question: "What is the capital of Australia?",
        optionA: "Sydney",
        optionB: "Melbourne",
        optionC: "Canberra",
        optionD: "Brisbane",
    },
    {
        id: 18,
        question: "What is the largest ocean on Earth?",
        optionA: "Atlantic Ocean",
        optionB: "Indian Ocean",
        optionC: "Arctic Ocean",
        optionD: "Pacific Ocean",
    },
    {
        id: 19,
        question: "Who developed the theory of relativity?",
        optionA: "Isaac Newton",
        optionB: "Galileo Galilei",
        optionC: "Albert Einstein",
        optionD: "Nikola Tesla",
    },
    {
        id: 20,
        question: "What is the capital of Canada?",
        optionA: "Toronto",
        optionB: "Vancouver",
        optionC: "Ottawa",
        optionD: "Montreal",
    },
    {
        id: 21,
        question: "What is the largest bone in the human body?",
        optionA: "Femur",
        optionB: "Tibia",
        optionC: "Humerus",
        optionD: "Fibula",
    },
    {
        id: 22,
        question: "Who invented the telephone?",
        optionA: "Thomas Edison",
        optionB: "Alexander Graham Bell",
        optionC: "Nikola Tesla",
        optionD: "Guglielmo Marconi",
    },
    {
        id: 23,
        question: "What is the capital of Italy?",
        optionA: "Venice",
        optionB: "Milan",
        optionC: "Rome",
        optionD: "Naples",
    },
    {
        id: 24,
        question: "What is the chemical symbol for gold?",
        optionA: "Au",
        optionB: "Ag",
        optionC: "Pb",
        optionD: "Fe",
    },
    {
        id: 25,
        question: "Who wrote '1984'?",
        optionA: "George Orwell",
        optionB: "Aldous Huxley",
        optionC: "Ray Bradbury",
        optionD: "J.D. Salinger",
    },
    {
        id: 26,
        question: "What is the capital of Russia?",
        optionA: "St. Petersburg",
        optionB: "Moscow",
        optionC: "Kazan",
        optionD: "Novosibirsk",
    },
    {
        id: 27,
        question: "What is the smallest country in the world?",
        optionA: "Monaco",
        optionB: "San Marino",
        optionC: "Vatican City",
        optionD: "Liechtenstein",
    },
    {
        id: 28,
        question: "What is the largest desert in the world?",
        optionA: "Sahara Desert",
        optionB: "Arabian Desert",
        optionC: "Gobi Desert",
        optionD: "Antarctic Desert",
    },
    {
        id: 29,
        question: "Who painted the Sistine Chapel ceiling?",
        optionA: "Raphael",
        optionB: "Michelangelo",
        optionC: "Donatello",
        optionD: "Leonardo da Vinci",
    },
];

mcqs.map((q) => {
    return { ...q, isMarkedForReview: false, selectedOption: "" };
});

// unattempted - gray color
// attempted & answered  - green color
// attempted & not answered - red color
// marked for review - purple color
// current question - teal color

const ExamPanel = ({ handleExitExam }) => {
    const [questions, setQuestions] = useState(
        mcqs.map((q, i) => ({
            ...q,
            selectedOption: "", // the selected option will be highlighted
            isMarkedForReview: false,
            isVisited: i === 0 ? true : false,
            isAnswered: false,
        }))
    );

    // const [answers, setAnswers] = useState(Array(mcqs.length).fill(-1));

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
        setQuestions((prev) =>
            prev.map((q, i) =>
                i === index
                    ? { ...q, isMarkedForReview: !q.isMarkedForReview }
                    : q
            )
        );
    };

    const [currentQuestion, setCurrentQuestion] = useState(0);

    // setQuestions((prev) => {
    //     prev[0].isAttempted = true;
    //     return prev;
    // });

    return (
        <Box h="100vh" color={"black"} bg={"bg"}>
            {/* Header */}
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

            {/* Content Area */}
            <Grid
                templateColumns="3fr 1fr"
                h="calc(100vh - 4rem)"
                gap={4}
                p={4}
            >
                {/* Left Panel */}
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
                            {mcqs[currentQuestion].question}
                        </Text>
                        {/* image */}
                        {/* Options */}
                        <Grid
                            templateColumns={"1fr 1fr"}
                            templateRows={"1fr 1fr"}
                            gap={4}
                            align="start"
                            w="100%"
                            spacing={2}
                        >
                            {["optionA", "optionB", "optionC", "optionD"].map(
                                (optionKey) => (
                                    <Button
                                        key={optionKey}
                                        w="100%"
                                        variant="outline"
                                        colorScheme="teal"
                                        color={"black"}
                                        _hover={{
                                            bg: "blue.500",
                                            color: "white",
                                        }}
                                        onClick={() => {
                                            setQuestions((prev) =>
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
                                            setQuestions((prev) => {
                                                prev[
                                                    currentQuestion
                                                ].isVisited = true;
                                                return prev;
                                            });
                                            console.log(questions);
                                        }}
                                        onAbort={() => {
                                            setQuestions((prev) =>
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
                                            questions[currentQuestion]
                                                .selectedOption === optionKey
                                                ? "teal.500"
                                                : "white"
                                        }
                                    >
                                        {mcqs[currentQuestion][optionKey]}
                                    </Button>
                                )
                            )}
                        </Grid>
                    </Box>

                    {/* <Box></Box> */}

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
                                        const Q = currentQuestion - 1;
                                        setCurrentQuestion(Q);
                                        setQuestions((prev) => {
                                            prev[Q].isVisited = true;
                                            return prev;
                                        });
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
                                        questions[currentQuestion]
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
                                    {questions[currentQuestion]
                                        .isMarkedForReview
                                        ? "Unmark for Review"
                                        : "Mark for Review"}
                                </Button>
                            </Box>
                            {/* clear selected ans button */}
                            <Box w={"100%"}>
                                <Button
                                    onClick={() => {
                                        setQuestions((prev) =>
                                            prev.map((q, i) =>
                                                i === currentQuestion
                                                    ? {
                                                          ...q,
                                                          selectedOption: "",
                                                      }
                                                    : q
                                            )
                                        );
                                    }}
                                    background="red"
                                    p={4}
                                    w={"100%"}
                                    size={"lg"}

                                    // borderWidth={2}
                                    // borderColor={"black"}
                                >
                                    X Clear
                                </Button>
                            </Box>
                            <Box w={"100%"}>
                                <Button
                                    onClick={() => {
                                        const Q = currentQuestion + 1;
                                        setCurrentQuestion(Q);
                                        setQuestions((prev) => {
                                            prev[Q].isVisited = true;
                                            return prev;
                                        });
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

                {/* Right Panel */}
                <VStack
                    spacing={4}
                    // background={"bg"}
                    h={"100%"}
                    justify={"space-between"}
                >
                    {/* Question Pallet */}

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
                                                      questions[idx]
                                                  )
                                        }
                                        color={
                                            currentQuestion == idx
                                                ? "white"
                                                : "black"
                                        }
                                        //
                                        fontWeight={"bold"}
                                        onClick={() => {
                                            setCurrentQuestion(idx);
                                            setQuestions((prev) => {
                                                prev[idx].isVisited = true;
                                                return prev;
                                            });
                                        }}
                                        borderRadius={
                                            questions[idx].isMarkedForReview
                                                ? "md"
                                                : "full"
                                        }
                                        p={2}
                                        m={2}
                                        borderColor={"gray.500"}
                                        borderWidth={2}
                                        aspectRatio={"square"}
                                        // height={"8%"}
                                    >
                                        {q.id}
                                    </Button>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </VStack>

                    {/* Submit Button */}
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
};

export default ExamPanel;
