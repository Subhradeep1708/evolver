import { ExamAddForm } from "@/components/forms/ExamAddForm";
import McqAddForm from "@/components/forms/McqAddForm";
import React from "react";

function examAdd() {
    return (
        <div className="w-full">
            <ExamAddForm />
            <McqAddForm noOfQuestions={3} examId="1" />
        </div>
    );
}

export default examAdd;
