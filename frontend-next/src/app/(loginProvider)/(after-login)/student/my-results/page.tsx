import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import apiRoutes from "@/lib/routes";
import { useAppStore } from "@/store";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Result = {
    examName: string;
    subject: string;
    teacher: string;
    submittedAt: string;
    score: number;
    totalMarks: number;
};

function MyResultsPage() {
    const user = useAppStore((state) => state.user);
    const [data, setData] = useState<Result[]>([]);
    useEffect(() => {
        const fetchResults = async () => {
            const response = await axios.get(
                `${apiRoutes.getResultByStudent}/${user?.userId}`,
                {
                    withCredentials: true,
                }
            );
            setData(response.data.results);
        };
        fetchResults();
    }, []);

    const formatDateAndTime = (date: any) => {
        const d = new Date(date);
        return d.toLocaleString();
    };

    console.log(data);
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Exam Name</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Conducted By</TableHead>
                        <TableHead>Attempted On</TableHead>
                        <TableHead>Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.examName}</TableCell>
                            <TableCell>{item.subject}</TableCell>
                            <TableCell>{item.teacher}</TableCell>
                            <TableCell>
                                {formatDateAndTime(item.submittedAt)}
                            </TableCell>
                            <TableCell>
                                {/* {`${item.score}/${item.totalMarks}`} */}
                                {`${0}/${item.totalMarks}`}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default MyResultsPage;
