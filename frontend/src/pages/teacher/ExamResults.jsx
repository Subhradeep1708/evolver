import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAppStore } from "../../Store";
import { Box, Button, Table, TableCell } from "@chakra-ui/react";
import {
    DialogActionTrigger,
    DialogCloseTrigger,
    DialogContent,
    DialogBackdrop,
    DialogBody,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
// import { DialogRoot, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogCloseTrigger, DialogBody } from "@radix-ui/react-dialog";
import { FaBox, FaEye } from "react-icons/fa";

const ExamResults = () => {
    const [exams, setExams] = useState([]);
    const [examId, setExamId] = useState(null);
    const [result, setResult] = useState(null);

    const user = useAppStore((state) => state.user);

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_ORIGIN}/api/exam/teacher/${user.id}`,
                    { withCredentials: true }
                );
                const data = res.data;
                setExams(data.exams);
                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchExamData();
    }, []);

    useEffect(() => {
        const fetchExamResult = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_ORIGIN}/api/result/${examId}`,
                    { withCredentials: true }
                );
                const data = res.data;
                setResult(data.results);
                console.log("Fetched Result:", data);
            } catch (error) {
                console.log(error);
            }
        };
        if (examId) {
            fetchExamResult();
        }
    }, [examId]);

    // console.log("Exams:", exams);

    return (
        <div>
            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row h={10}>
                        <Table.ColumnHeader>Exam Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Subject</Table.ColumnHeader>
                        <Table.ColumnHeader>Conducted By</Table.ColumnHeader>
                        {/* <Table.ColumnHeader>Attempted On</Table.ColumnHeader> */}
                        <Table.ColumnHeader>Total Marks</Table.ColumnHeader>
                        <Table.ColumnHeader></Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {exams?.map((item, index) => (
                        <Table.Row
                            key={index}
                            h={10}
                            background={index % 2 === 0 ? "bg.muted" : "white"}
                        >
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.subject.name}</Table.Cell>
                            <Table.Cell>{item.conductedBy}</Table.Cell>
                            {/* <Table.Cell>{item.attemptedOn}</Table.Cell> */}
                            <Table.Cell fontWeight={"bold"}>
                                {item.totalMarks}
                            </Table.Cell>
                            <Table.Cell>
                                <DialogRoot
                                    size="cover"
                                    placement="center"
                                    motionPreset="slide-in-bottom"
                                >
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setExamId(item.id)}
                                        >
                                            <FaEye />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent rounded="2xl">
                                        <DialogHeader>
                                            <DialogTitle>Exam Name</DialogTitle>
                                            <DialogCloseTrigger />
                                        </DialogHeader>
                                        <DialogBody>
                                            <Leaderboard result={result} />
                                        </DialogBody>
                                    </DialogContent>
                                </DialogRoot>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};
export default ExamResults;

const Leaderboard = ({ result }) => {
    const formatDateAndTime = (date) => {
        const d = new Date(date);
        return d.toLocaleString();
    };
    return (
        <Table.Root>
            <Table.Row>
                <Table.ColumnHeader>Rank</Table.ColumnHeader>
                <Table.ColumnHeader>Student Name</Table.ColumnHeader>
                <Table.ColumnHeader>Student Roll</Table.ColumnHeader>
                <Table.ColumnHeader>Marks Obtained</Table.ColumnHeader>
                <Table.ColumnHeader>Percentage Marks</Table.ColumnHeader>
                <Table.ColumnHeader>Submitted At</Table.ColumnHeader>
            </Table.Row>
            <Table.Body>
                {result?.map((item, index) => (
                    <Table.Row key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.studentName}</TableCell>
                        <TableCell>{item.studentRollNumber}</TableCell>
                        <TableCell>{item.marksObtained}</TableCell>
                        <TableCell>{item.percentageMarks} % </TableCell>
                        <TableCell>
                            {formatDateAndTime(item.submittedAt)}
                        </TableCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
};
