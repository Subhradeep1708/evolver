"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import apiRoutes from "@/lib/routes";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Exam = {
    id: string | number;
    name: string;
    addedBy?: string;
    totalMarks: number;
    durationInMinutes?: number | string;
    noOfQuestions: number | string;
    // description: string;
};
import { useRouter } from "next/navigation";
// import { useAppStore } from "@/store";

const StudentDashboardPage = () => {
    const [exams, setExams] = useState<Exam[]>([]);
    // const user = useAppStore((state) => state.user);
    const router = useRouter();
    const handleStartExam = (examId: any) => {
        router.push(`/start-exam/${examId}`);
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
        <div className="p-12 space-y-12">
            <h1 className="text-2xl font-semibold">Student Dashboard Page</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exams.map((exam, i) => {
                    return (
                        <div key={i}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{exam.name}</CardTitle>
                                    <CardDescription>
                                        {exam.addedBy && (
                                            <div>Added By: {exam.addedBy}</div>
                                        )}
                                        <div>
                                            Duration: {exam.durationInMinutes}{" "}
                                            minutes
                                        </div>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {" "}
                                    Total Marks: {exam.totalMarks}
                                </CardContent>
                                <CardFooter>
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
