"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";
import apiRoutes from "@/lib/routes";
import { useAppStore } from "@/store";

const TeacherDashboardPage = () => {
    const user=useAppStore((state)=>state.user)
    const [data, setData] = useState();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await axios.get(
    //             `${apiRoutes.getExamByTeacher}/${user?.userId}`,
    //             {
    //                 withCredentials: true,
    //             }
    //         );

    //         setData(response.data);
    //     };

    //     fetchData();
    //     console.log("data", data);
    // }, []);

    return <div>TeacherDashboardPage</div>;
};

export default TeacherDashboardPage;
