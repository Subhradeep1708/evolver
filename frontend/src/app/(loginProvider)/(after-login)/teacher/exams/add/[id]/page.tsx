import McqAddForm from "@/components/forms/McqAddForm";
import apiRoutes from "@/lib/routes";
import axios from "axios";
import React from "react";

async function McqAddPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // Extracting the exam ID from params
    let noOfQuestions;
    try {
        const response=await axios.get(`${apiRoutes.getNoOfQuestions}/${id}`);
        if(response.status===200){
            noOfQuestions=response.data.noOfQuestions.noOfQuestions
            
        }
    } catch (error) {
        console.log(error);
    }
    return (
        <div className="w-full">
            {id && noOfQuestions>0 && <McqAddForm noOfQuestions={noOfQuestions} examId={id} />}
        </div>
    );
}

export default McqAddPage;
