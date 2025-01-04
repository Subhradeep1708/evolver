import { Box, Grid } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ExamCard from "../../../../components/students/ExamCard.jsx";

const StudentDashboard = () => {
    const [exams, setExams] = useState([]);
    useEffect(() => {
        const fetchExams = async () => {
            const res = await axios.get("http://localhost:5000/api/exam");
            if (res.status === 200) {
                // setExams(res.data.data);
                console.log(res.data.exams);
                setExams(res.data.exams);
            }
        };

        fetchExams();
    }, []);

    console.log(exams);

    return (
        <Grid gap={4} w={"full"} templateColumns={"repeat(3, 1fr)"}>
            {exams.map((e, index) => (
                <ExamCard
                    key={index}
                    examName={e.name}
                    addedBy={e.addedBy}
                    totalMarks={e.totalMarks}
                    // description={e.description}
                    examLink={`/start/exam/${e.id}`}
                />
            ))}
        </Grid>
        // </Box>
        // <>Hello</>
    );
};
export default StudentDashboard;

// examName, addedBy, totalMarks, description, examLink
