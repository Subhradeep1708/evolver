import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "@chakra-ui/react";
const AllSubjects = () => {
    const [subject, setSubject] = useState([]);
    useEffect(() => {
        const getSubjects = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/subject"
                );
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
            <Table.Root size="sm">
                <Table.Header>
                    <Table.Row h={10}>
                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Description</Table.ColumnHeader>
                        <Table.ColumnHeader>Teachers</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {subject?.map((item, index) => (
                        <Table.Row
                            key={index}
                            h={10}
                            background={index % 2 === 0 ? "bg.muted" : "white"}
                        >
                            <Table.Cell>
                                {item.name} 
                            </Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                            <Table.Cell>
                                {item.teachers.map((teacher, index) => (
                                    <span key={index}>
                                        {teacher.firstName}{" "}
                                        {teacher.lastName}
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

export default AllSubjects;
