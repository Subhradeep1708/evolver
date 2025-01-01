import { Box, Grid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ExamCard from "./ExamCard";

const Dashboard = () => {
    const [exams, setExams] = useState([]);
    // useEffect(() => {
    //     axios
    //         .get("http://localhost:5000/api/exams")
    //         .then((res) => {
    //             setExams(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    const examData = [
        {
            examName: "Exam 1",
            addedBy: "Teacher 1",
            totalMarks: 100,
            description: "This is a description",
            examLink: "/start/exam/1",
        },
        {
            examName: "Exam 2",
            addedBy: "Teacher 2",
            totalMarks: 100,
            description: "This is a description",
            examLink: "/start/exam/2",
        },
        {
            examName: "Exam 3",
            addedBy: "Teacher 3",
            totalMarks: 100,
            description: "This is a description",
            examLink: "/start/exam/3",
        },
        {
            examName: "Exam 3",
            addedBy: "Teacher 3",
            totalMarks: 100,
            description: "This is a description",
            examLink: "/start/exam/3",
        },
        {
            examName: "Exam 7",
            addedBy: "Teacher 7",
            totalMarks: 100,
            description: "This is a description",
            examLink: "/start/exam/7",
        },
    ];

    return (
        <Grid gap={4} w={"full"} templateColumns={"repeat(3, 1fr)"}>
            {examData.map((exam, index) => (
                <ExamCard
                    key={index}
                    examName={exam.examName}
                    addedBy={exam.addedBy}
                    totalMarks={exam.totalMarks}
                    description={exam.description}
                    examLink={exam.examLink}
                />
            ))}
        </Grid>
        // </Box>
    );
};
export default Dashboard;

// examName, addedBy, totalMarks, description, examLink
