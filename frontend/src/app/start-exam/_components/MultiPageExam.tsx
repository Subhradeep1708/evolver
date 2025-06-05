"use client"
import ExamRules from '@/components/exam-panel/ExamRules';
import React, { useState } from 'react'
import MainExamPanel from './MainExamPanel';
import EndExam from '@/components/exam-panel/ThankYou';

const MultiPageExam = ({examId}:{examId:string}) => {
    const [step, setStep] = useState("rules");
    const onStartExam = () => setStep("exam");
    const onSubmitExam = () => setStep("result");
  return (
    <div>
     {
        step === "rules" && (
            <ExamRules onStartExam={onStartExam}/>
        )
     }
        {
        step === "exam" && (
          <MainExamPanel examId={examId} onSubmitExam={onSubmitExam}/>

        )}  
        {
        step === "result" && (
            <EndExam />
        )
}
</div>
  )
}

export default MultiPageExam