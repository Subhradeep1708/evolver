"use client"
import apiRoutes from "@/lib/routes";
import { useAppStore } from "@/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Exam = {
  id: number;
  name: string;
  durationInMinutes: number;
  noOfQuestions: number;
  totalMarks: number;
  subjectId: number;
  subject: {
    name: string;
  };
  addedBy: number;
  createdAt: string;
  updatedAt: string;
};

const page = () => {
    const user = useAppStore((state) => state.user);
    const [exams, setExams] = useState<Exam[]>([]);
    const getExamByTeacherId = async () => {
        try {
           
            const id = user?.userId;
            if (!id) {
                console.warn("User ID is not available");
                return;
            }

            const response = await axios.get(
                `${apiRoutes.getExamByTeacher}/${id}`
            );
            console.log("get Exam By Teacher id:", response.data);
             setExams(response.data.exams);
            } catch (error) {
              console.log("Error fetching exams:", error);
            }
          };
          
          useEffect(() => {
      
        if (user?.userId) {
            getExamByTeacherId();
        }
    }, [user]);
    
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Your Exams</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <Card key={exam.id} className="shadow-lg hover:shadow-xl transition duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 dark:text-white">{exam.name}</CardTitle>
              <Badge className="mt-2">{exam.subject.name}</Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p><span className="font-medium">Duration:</span> {exam.durationInMinutes} mins</p>
              <p><span className="font-medium">Questions:</span> {exam.noOfQuestions}</p>
              <p><span className="font-medium">Total Marks:</span> {exam.totalMarks}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Created: {new Date(exam.createdAt).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {exams.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">No exams found.</p>
      )}
    </div>
  );
};

export default page;
