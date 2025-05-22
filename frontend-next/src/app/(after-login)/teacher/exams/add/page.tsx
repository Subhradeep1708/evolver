import { ExamAddForm } from "@/components/forms/ExamAddForm";
import React from "react";

function examAdd() {
    const handleSubmit = async (values: any) => {
        // Handle the form submission here
        console.log("Form submitted with values:", values);
        // You can make an API call or perform any other action with the values
        //? create the exam in database and navigate to the mcq page:/teacher/exams/add/mcq/examId
    };
    return (
        <div className="w-full">
            <ExamAddForm handleSubmit={handleSubmit} />
            {/* <McqAddForm noOfQuestions={3} examId="1" /> */}
        </div>
    );
}

export default examAdd;
