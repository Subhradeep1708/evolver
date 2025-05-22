import McqAddForm from "@/components/forms/McqAddForm";
import React from "react";

function examAdd() {
    return (
        <div className="w-full">
            <McqAddForm noOfQuestions={3} examId="1" />
        </div>
    );
}

export default examAdd;
