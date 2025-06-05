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
import React, { useEffect, useState } from "react";

type Teachers = {
    id: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
    };
    subjects: {
        id: string;
        subject: {
            name: string;
        };
    }[];
};

const AllTeachers = () => {
    const [teachers, setTeachers] = useState<Teachers[]>([]);
    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const res = await axios.get(apiRoutes.getTeacher);
                setTeachers(res.data.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTeacher();
    }, []);

    function getAbbreviation(subject: string) {
        // Remove "and" (case insensitive) and trim spaces
        const words = subject
            .replace(/\band\b/gi, "")
            .trim()
            .split(/\s+/);

        // If only one word, return first 4 letters in uppercase
        if (words.length === 1) {
            return words[0].slice(0, 4).toUpperCase();
        }

        // Otherwise, take first letter of each word
        return words.map((word) => word[0].toUpperCase()).join("");
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Teacher Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subjects</TableHead>
                        <TableHead>Actions</TableHead>
                        {/* <TableHead>Branch Name</TableHead> */}
                        {/* <TableHead>Admission Year</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachers?.map((item, index) => (
                        <TableRow key={index}>
                            {/* <TableCell>{item.rollNo}</TableCell> */}
                            <TableCell>
                                {item.user.firstName} {item.user.lastName}
                            </TableCell>
                            <TableCell>{item.user.email}</TableCell>
                            {/* <TableCell>{item.attemptedOn}</TableCell> */}
                            <TableCell>
                                {item.subjects.map((subject) => (
                                    <small key={subject.id}>
                                        {getAbbreviation(subject.subject.name)},{" "}
                                    </small>
                                ))}
                            </TableCell>
                            <TableCell>
                                <a href={`/teacher/teachers/${item.id}`}>Edit</a>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllTeachers;
