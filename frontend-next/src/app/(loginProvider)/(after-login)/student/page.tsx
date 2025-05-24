"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import apiRoutes from "@/lib/routes";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Exam = {
    examName: string;
    addedBy: string;
    totalMarks: number;
    description: string;
    id: string | number;
};
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store";

const StudentDashboardPage = () => {
    const [exams, setExams] = useState<Exam[]>([]);
    const user=useAppStore((state)=>state.user);
    const router = useRouter();
    const handleStartExam = (examId: any) => {
        router.push(`/start/exam/${examId}`);
    };
    // useEffect(() => {
    //     console.log("user details:",user)
    // }, [user])
    
    useEffect(() => {
        const fetchExams = async () => {
            const res = await axios.get(apiRoutes.getExam);
            if (res.status === 200) {
                // setExams(res.data.data);
                console.log(res);
                setExams(res.data.exams);
            }
        };

        fetchExams();
    }, []);
    console.log(exams);
    return (
        <div>
            StudentDashboardPage
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exams.map((exam, i) => {
                    return (
                        <div key={i}>
                            <Card>
                                <CardContent>
                                    <CardTitle>{exam.examName}</CardTitle>
                                    {exam.addedBy}
                                    {exam.totalMarks} Marks
                                    <CardDescription>
                                        {exam.description}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter>
                                    {/* <Text fontSize="sm" color="red">
                                            Due at 10th October at 10:00 AM
                                        </Text> */}
                                    <Button
                                        onClick={() => handleStartExam(exam.id)}
                                    >
                                        Start Exam
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StudentDashboardPage;
