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
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

type Subject = {
    id?: string | number;
    name: string;
    description: string;
    teachers: {
        firstName: string;
        lastName: string;
    }[];
};

const AllSubjects = () => {
    const [subject, setSubject] = useState<Subject[]>([]);
    useEffect(() => {
        const getSubjects = async () => {
            try {
                const response = await axios.get(apiRoutes.getSubject);
                setSubject(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        getSubjects();
    }, []);
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Teachers</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subject?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>
                                {item.teachers.map((teacher, index) => (
                                    <span key={index}>
                                        {teacher.firstName} {teacher.lastName}
                                    </span>
                                ))}
                            </TableCell>
                            <TableCell>
                                <Link href={`/teacher/subjects/${item.id}`}>
                                    <FaEdit
                                        className="hover:bg-gray-200 rounded p-1"
                                        size={28}
                                        color="black"
                                    />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllSubjects;
