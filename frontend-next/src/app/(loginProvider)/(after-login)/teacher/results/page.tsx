"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FaEye } from "react-icons/fa";

import apiRoutes from "@/lib/routes";
import { useAppStore } from "@/store";

type Exam = {
    id: string;
    name: string;
    subject: { name: string };
    conductedBy: string;
    totalMarks: number;
};

type Result = {
    studentName: string;
    studentRollNumber: string;
    marksObtained: number;
    percentageMarks: number;
    submittedAt: string;
};
const page = () => {
    const [exams, setExams] = useState<Exam[]>([]);
    const [examId, setExamId] = useState<string | null>(null);
    const [result, setResult] = useState<Result[] | null>(null);

    const user=useAppStore((state)=>state.user)

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const res = await axios.get(
                   `${apiRoutes.getExamByTeacher}/${user?.userId}`,
                    {
                        withCredentials: true,
                    }
                );
                setExams(res.data.exams);
            } catch (error) {
                console.error(error);
            }
        };
        fetchExamData();
    }, [user?.userId]);

    useEffect(() => {
        const fetchExamResult = async () => {
            if (!examId) return;
            try {
                const res = await axios.get(
                    `${apiRoutes.getResult}/${examId}`,
                    {
                        withCredentials: true,
                    }
                );
                setResult(res.data.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchExamResult();
    }, [examId]);
    return (
        <div className="p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Exam Name</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Conducted By</TableHead>
                        <TableHead>Total Marks</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {exams.map((exam, index) => (
                        <TableRow
                            key={exam.id}
                            className={index % 2 === 0 ? "bg-muted" : ""}
                        >
                            <TableCell>{exam.name}</TableCell>
                            <TableCell>{exam.subject.name}</TableCell>
                            <TableCell>{exam.conductedBy}</TableCell>
                            <TableCell className="font-semibold">
                                {exam.totalMarks}
                            </TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setExamId(exam.id)}
                                            className="flex items-center gap-2"
                                        >
                                            <FaEye />
                                            View
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl">
                                        <DialogHeader>
                                            <DialogTitle>
                                                {exam.name} - Leaderboard
                                            </DialogTitle>
                                            <DialogDescription>
                                                Results for this exam
                                            </DialogDescription>
                                        </DialogHeader>
                                        <Leaderboard result={result} />
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
type LeaderboardProps = {
    result: Result[] | null;
};
const Leaderboard: React.FC<LeaderboardProps> = ({ result }) => {
    const formatDate = (date: string) => new Date(date).toLocaleString();
    return (
        <div className="mt-4 overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Marks</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Submitted At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {result?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.studentName}</TableCell>
                            <TableCell>{item.studentRollNumber}</TableCell>
                            <TableCell>{item.marksObtained}</TableCell>
                            <TableCell>{item.percentageMarks} %</TableCell>
                            <TableCell>
                                {formatDate(item.submittedAt)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default page;
