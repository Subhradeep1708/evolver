import { create } from "domain";

export const origin = process.env.ORIGIN || "http://localhost:5000";
const auth_routes = "api/auth";
const user_routes = "api/user";
const subject_routes = "api/subject";
const exam_routes = "api/exam";
const mcq_routes = "api/mcq";
const answer_routes = "api/answer";
const result_routes = "api/result";
const apiRoutes = {
  //*auth-routes
  studentLogin: `${origin}/${auth_routes}/student/login`,
  teacherLogin: `${origin}/${auth_routes}/teacher/login`,
  studentRegister: `${origin}/${auth_routes}/student/register`,
  teacherRegister: `${origin}/${auth_routes}/teacher/register`,
  logout: `${origin}/${auth_routes}/logout`,

  //*user-routes
  getStudent: `${origin}/${user_routes}/student`, // add student id to get specific student
  getTeacher: `${origin}/${user_routes}/teacher`, // add teacher id to get specific teacher
  updateStudent: `${origin}/${user_routes}/student`, // add student id to update specific student (PUT)
  updateTeacher: `${origin}/${user_routes}/teacher`, // add teacher id to update specific teacher (PUT)

  //*subject-routes
  getSubject: `${origin}/${subject_routes}`, // add subject id to get specific subject
  updateSubject: `${origin}/${subject_routes}`, // add subject id to update specific subject (PUT)


  //*exam-routes
  getExam: `${origin}/${exam_routes}`, // add exam id to get specific exam
  getExamByTeacher: `${origin}/${exam_routes}/teacher`, // add teacher id to get specific exam
  createExam: `${origin}/${exam_routes}`, 

  //*mcq-routes
  addMcq: `${origin}/${mcq_routes}`,

  //*answer-routes
  submitAnswer: `${origin}/${answer_routes}/submit`, // add exam id to get specific exam

  //*result-routes
  getResult: `${origin}/${result_routes}`, // add exam id to get specific exam
  getResultByStudent: `${origin}/${result_routes}/student`, // add student id to get specific exam
};

export default apiRoutes;
