import { Avatar, Button, Card, HStack, Text } from "@chakra-ui/react";

// import { Button } from "@/components/ui/button"

const SubjectCard = () => {
    return (
        <Card.Root
            width="full"
            maxW={"400px"}
            p={"4"}
            gap={"4"}
            variant={"elevated"}
        >
            <Card.Body gapY="4">
                <Card.Title mt="2">Test your DSA</Card.Title>
                <HStack justify={"space-between"}>
                    <Text>Shyama Mondal</Text>
                    <Text fontSize="sm" color="gray.500">
                        50 marks
                    </Text>
                </HStack>
                <Card.Description>
                    This is the card body. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Curabitur nec odio vel dui
                    euismod fermentum. Curabitur nec odio vel dui euismod
                    fermentum.
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                {/* <Text fontSize="sm" color="red">
                    Due at 10th October at 10:00 AM
                </Text> */}
                <Button px={"3"}>Start Exam</Button>
            </Card.Footer>
        </Card.Root>
    );
};

export default SubjectCard;
