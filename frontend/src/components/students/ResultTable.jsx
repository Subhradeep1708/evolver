import { Table } from "@chakra-ui/react";

const ResultTable = () => {
    return (
        <Table.Root size="sm">
            <Table.Header>
                <Table.Row h={10}>
                    <Table.ColumnHeader>Exam Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Subject</Table.ColumnHeader>
                    <Table.ColumnHeader>Conducted By</Table.ColumnHeader>
                    <Table.ColumnHeader>Attempted On</Table.ColumnHeader>
                    <Table.ColumnHeader>Score</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {result.map((item, index) => (
                    <Table.Row
                        key={index}
                        h={10}
                        background={index % 2 === 0 ? "bg.muted" : "white"}
                        // fontWeight={"semibold"}
                    >
                        <Table.Cell>{item.examName}</Table.Cell>
                        <Table.Cell>{item.subject}</Table.Cell>
                        <Table.Cell>{item.conductedBy}</Table.Cell>
                        <Table.Cell>{item.attemptedOn}</Table.Cell>
                        <Table.Cell
                            fontWeight={"bold"}
                        >{`${item.score}/${item.totalMarks}`}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
};

export default ResultTable;

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
