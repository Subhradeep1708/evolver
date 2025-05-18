import { Table } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
const AllTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_ORIGIN}/api/user/teacher`
                );
                setTeachers(res.data.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTeacher();
    }, []);
    function getAbbreviation(subject) {
        // Remove "and" (case insensitive) and trim spaces
        let words = subject
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
            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row h={10}>
                        <Table.ColumnHeader>Student Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Email</Table.ColumnHeader>
                        <Table.ColumnHeader>Subjects</Table.ColumnHeader>

                        {/* <Table.ColumnHeader>Branch Name</Table.ColumnHeader> */}
                        {/* <Table.ColumnHeader>Admission Year</Table.ColumnHeader> */}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {teachers?.map((item, index) => (
                        <Table.Row
                            key={index}
                            h={10}
                            background={index % 2 === 0 ? "bg.muted" : "white"}
                        >
                            {/* <Table.Cell>{item.rollNo}</Table.Cell> */}
                            <Table.Cell>
                                {item.user.firstName} {item.user.lastName}
                            </Table.Cell>
                            <Table.Cell>{item.user.email}</Table.Cell>
                            {/* <Table.Cell>{item.attemptedOn}</Table.Cell> */}
                            <Table.Cell fontWeight={"bold"}>
                                {item.subjects.map((subject) => (
                                    <span key={subject.id}>
                                        {getAbbreviation(subject.subject.name)},{" "}
                                    </span>
                                ))}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default AllTeachers;
