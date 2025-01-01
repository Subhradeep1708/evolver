import { Avatar, Button, Card, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

// import { Button } from "@/components/ui/button"

const ExamCard = ({ examName, addedBy, totalMarks, description, examLink }) => {
    const navigate = useNavigate();
    return (
        <Card.Root
            width="full"
            maxW={"400px"}
            p={"4"}
            gap={"4"}
            variant={"elevated"}
        >
            <Card.Body gapY="4">
                <Card.Title mt="2">{examName}</Card.Title>
                <HStack justify={"space-between"}>
                    <Text>{addedBy}</Text>
                    <Text fontSize="sm" color="gray.500">
                        {totalMarks} Marks
                    </Text>
                </HStack>
                <Card.Description>{description}</Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                {/* <Text fontSize="sm" color="red">
                    Due at 10th October at 10:00 AM
                </Text> */}
                <Button px={"3"} onClick={() => navigate(examLink)}>
                    Start Exam
                </Button>
            </Card.Footer>
        </Card.Root>
    );
};

export default ExamCard;
