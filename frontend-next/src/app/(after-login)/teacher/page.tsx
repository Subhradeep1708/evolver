"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import apiRoutes from "@/lib/routes";

const TeacherDashboardPage = () => {
    const { user } = useAppContext();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `${apiRoutes.getExamByTeacher}/${user?.userId}`,
                {
                    withCredentials: true,
                }
            );

            setData(response.data);
        };

        fetchData();
        console.log("data", data);
    }, []);

    return <div>TeacherDashboardPage</div>;
};

export default TeacherDashboardPage;
