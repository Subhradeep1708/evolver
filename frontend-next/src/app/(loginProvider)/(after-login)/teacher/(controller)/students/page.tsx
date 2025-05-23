"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import apiRoutes from "@/lib/routes";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Student = {
    id: string | number;
    rollNo: string;
    user: {
        firstName: string;
        lastName: string;
        middleName: string;
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
                const res = await axios.get(apiRoutes.getStudent);
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
                        <TableHead>Actions</TableHead>
                        {/* <TableHead>Branch Name</TableHead> */}
                        {/* <TableHead>Admission Year</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.rollNo}</TableCell>
                            <TableCell>
                                {item.user.firstName} {item.user.middleName}{" "}
                                {item.user.lastName}
                            </TableCell>
                            <TableCell>{item.user.email}</TableCell>
                            {/* <TableCell>{item.attemptedOn}</TableCell> */}
                            <TableCell>{item.totalMarks}</TableCell>
                            <TableCell>
                                <Link href={`/teacher/students/${item.id}`}>
                                    Edit
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllStudent;
