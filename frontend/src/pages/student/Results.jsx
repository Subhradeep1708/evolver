import { Box, Heading, Table, VStack } from "@chakra-ui/react";
const Results = () => {
    return (
        <VStack >
            <Heading size={"5xl"} > Your Result </Heading >
            <Box padding={12} w="100%">
                <Table.Root
                    size="sm"
                    border="1px solid #e2e8f0"
                    borderRadius="md"
                    overflow="hidden"

                >

                    <Table.Header background="blue.500" color="white">
                        <Table.Row h={12}>
                            <Table.ColumnHeader textAlign="center">Exam Name</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="center">Subject</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="center">Conducted By</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="center">Attempted On</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="center">Score</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {result.map((item, index) => (
                            <Table.Row
                                key={index}
                                h={12}
                                background={index % 2 === 0 ? "gray.100" : "white"}
                                _hover={{ background: "blue.50" }}
                            >
                                <Table.Cell textAlign="center" fontWeight="medium">{item.examName}</Table.Cell>
                                <Table.Cell textAlign="center" fontWeight="medium">{item.subject}</Table.Cell>
                                <Table.Cell textAlign="center" fontWeight="medium">{item.conductedBy}</Table.Cell>
                                <Table.Cell textAlign="center" fontWeight="medium">{item.attemptedOn}</Table.Cell>
                                <Table.Cell
                                    textAlign="center"
                                    fontWeight="bold"
                                    color="blue.600"
                                >
                                    {`${item.score}/${item.totalMarks}`}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Box>
        </VStack>
    );
};
export default Results;

const result = [
    {
        examName: "Test your DSA",
        attemptedOn: "2021-09-01",
        score: 9,
        totalMarks: 10,
        subject: "Data Structures and Algorithms",
        conductedBy: "Shyama Mondal: IT Ki Sherni",
    },
    {
        examName: "Test your DSA",
        attemptedOn: "2021-09-01",
        score: 9,
        totalMarks: 10,
        subject: "Data Structures and Algorithms",
        conductedBy: "Shyama Mondal: IT Ki Sherni",
    },
    {
        examName: "Test your DSA",
        attemptedOn: "2021-09-01",
        score: 9,
        totalMarks: 10,
        subject: "Data Structures and Algorithms",
        conductedBy: "Shyama Mondal: IT Ki Sherni",
    },
    {
        examName: "Test your DSA",
        attemptedOn: "2021-09-01",
        score: 9,
        totalMarks: 10,
        subject: "Data Structures and Algorithms",
        conductedBy: "Shyama Mondal: IT Ki Sherni",
    },
    {
        examName: "Test your COA",
        attemptedOn: "2021-09-01",
        score: 9,
        totalMarks: 10,
        subject: "COA",
        conductedBy: "The Legend Ranjit Kumar Mandal Sir",
    },
];
