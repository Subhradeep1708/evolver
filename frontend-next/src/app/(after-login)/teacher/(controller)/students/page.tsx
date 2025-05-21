"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Student = {
    rollNo: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
    };
    attemptedOn: string;
    totalMarks: number;
};

const AllStudent = () => {
    const [students, setStudents] = useState<Student[]>([]);
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get(
                    "${import.meta.env.VITE_ORIGIN}/api/user/student"
                );
                setStudents(res.data.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchStudent();
    }, []);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Roll No</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Email</TableHead>
                        {/* <TableHead>Branch Name</TableHead> */}
                        {/* <TableHead>Admission Year</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.rollNo}</TableCell>
                            <TableCell>
                                {item.user.firstName} {item.user.lastName}
                            </TableCell>
                            <TableCell>{item.user.email}</TableCell>
                            {/* <TableCell>{item.attemptedOn}</TableCell> */}
                            <TableCell>{item.totalMarks}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllStudent;
