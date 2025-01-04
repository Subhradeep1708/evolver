import { useAppStore } from "../../../Store";
import StudentDashboard from "./student/StudentDashboard";
import TeacherDashboard from "./teacher/TeacherDashboard";

const Dashboard = () => {
    const user = useAppStore((state) => state.user);

    if (user.role === "student") {
        return <StudentDashboard />;
    } else {
        return <TeacherDashboard />;
    }
};
export default Dashboard;
