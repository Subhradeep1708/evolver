import McqAddForm from "@/components/forms/McqAddForm";
import React from "react";

async function McqAddPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // Extracting the exam ID from params
    return (
        <div className="w-full">
            {id && <McqAddForm noOfQuestions={3} examId={id} />}
        </div>
    );
}

export default McqAddPage;
