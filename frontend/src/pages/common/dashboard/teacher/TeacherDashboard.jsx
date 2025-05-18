import axios from "axios";
import { useEffect, useState } from "react";
import { useAppStore } from "../../../../Store";

const TeacherDashboard = () => {
    const user = useAppStore((state) => state.user);
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_ORIGIN}/api/exam/teacher/${user.id}`,
                {
                    withCredentials: true,
                }
            );

            setData(response.data);
        };

        fetchData();
    }, []);

    console.log(data);
    // !@Raktim-Mitra @Subhradeep1708 try this
    return <div>Teacher Dashboard</div>;
};
export default TeacherDashboard;
