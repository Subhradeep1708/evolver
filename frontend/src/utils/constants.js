const origin="http://localhost:5000";
const auth_routes="api/auth";
export const routes={
    studentLogin:`${origin}/${auth_routes}/student/login`,
    logout:`${origin}/${auth_routes}/logout`,
    teacherLogin:`${origin}/${auth_routes}/teacher/login`,
    studentRegister:`${origin}/${auth_routes}/student/register`,
    teacherRegister:`${origin}/${auth_routes}/teacher/register`,
};