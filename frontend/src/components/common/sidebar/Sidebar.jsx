import { Box, Link, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import UserContext from "../../../contexts/userContext";

const Sidebar = () => {
    // console.log(currentPath);
    const { user } = useContext(UserContext);
    console.log("User: ", user);

    const role = user?.role;

    const links = {
        student: [
            {
                id: 1,
                name: "Dashboard",
                path: "/student/dashboard",
            },
            {
                id: 2,
                name: "Exams",
                path: "/student/exams",
            },
            {
                id: 3,
                name: "Results",
                path: "/student/results",
            },
            {
                id: 4,
                name: "Edit Profile",
                path: "/student/edit-profile",
            },
        ],
        teacher: [
            {
                id: 1,
                name: "Dashboard",
                path: "/teacher/dashboard",
            },
            {
                id: 2,
                name: "Exams",
                path: "/teacher/exams",
            },
            {
                id: 3,
                name: "Results",
                path: "/teacher/results",
            },
            {
                id: 4,
                name: "Edit Profile",
                path: "/teacher/edit-profile",
            },
            {
                id: 5,
                name: "Create Exam",
                path: "/teacher/create-exam",
            },
        ],
        controller: [
            {
                id: 1,
                name: "Dashboard",
                path: "/controller/dashboard",
            },
            {
                id: 2,
                name: "Add Teacher",
                path: "/controller/add-teacher",
            },
            {
                id: 3,
                name: "Add Student",
                path: "/controller/add-student",
            },
            {
                id: 4,
                name: "Edit Profile",
                path: "/controller/edit-profile",
            },
            {
                id: 5,
                name: "Add Subject",
                path: "/controller/add-subject",
            },
            {
                id: 6,
                name: "All Teachers",
                path: "/controller/all-teachers",
            },
            {
                id: 7,
                name: "All Students",
                path: "/controller/all-students",
            },
            {
                id: 8,
                name: "All Subjects",
                path: "/controller/all-subjects",
            },
        ],
    };

    return (
        <VStack
            width="200px"
            h="full"
            w={"full"}
            spacing={0}
            spaceY={0}
            gap={0}
            alignItems="flex-start"
            background={"blue.950"}
            color={"white"}
        >
            {links[role]?.map((link) => (
                <Box
                    key={link.id}
                    w="full"
                    p={4}
                    hover={{
                        background: "blue.900",
                    }}
                >
                    <Link href={link.path}>{link.name}</Link>
                </Box>
            ))}
        </VStack>
    );
};

export default Sidebar;
