'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

export default function ExamRules({onStartExam}:{onStartExam:()=>void}) {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleStartExam = () => {
    if (agreed) {
       onStartExam();
    } else {
      alert("Please agree to the instructions before proceeding.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col md:flex-row gap-10 justify-between items-start">
      {/* Instructions Section */}
      <div className="bg-white p-6 rounded-md shadow-lg w-full md:w-2/3 space-y-6">
        <h1 className="text-4xl font-bold">Welcome to the Online Exam</h1>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Instructions:</h2>
          <ul className="pl-5 list-disc text-lg space-y-2">
            <li>Read the questions carefully before answering.</li>
            <li>Attempt all questions within the given time frame.</li>
            <li>Save your answers before moving to the next question.</li>
            <li>Do not refresh or close the browser during the exam.</li>
            <li>Do not use the back button.</li>
            <li>Do not use the forward button.</li>
          </ul>

          <div className="flex items-start space-x-2 mt-4">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={() => setAgreed(!agreed)}
            />
            <label
              htmlFor="agree"
              className="text-sm text-gray-600 font-medium leading-snug"
            >
              I have read and understood the instructions. All computer
              hardware allotted to me are in proper working condition. I
              declare that I am not in possession of / not wearing / not
              carrying any prohibited gadget like mobile phone, bluetooth
              devices etc. /any prohibited material with me into the
              Examination Hall. I agree that in case of not adhering to the
              instructions, I shall be liable to be debarred from this Test
              and/or to disciplinary action, which may include ban from
              future Tests / Examinations.
            </label>
          </div>
        </div>

        <Button
          onClick={handleStartExam}
          className="mt-4 text-lg px-6 py-3"
        >
          Start Exam
        </Button>
      </div>

      {/* Question Palette Section */}
      <div className="bg-white p-6 rounded-md shadow-lg w-full md:w-1/3 space-y-4">
        <h2 className="text-2xl font-semibold">Question Palette:</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-full bg-green-400" />
            <span className="text-lg">Visited and Answered</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-full bg-red-400" />
            <span className="text-lg">Visited but not Answered</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-md bg-purple-400" />
            <span className="text-lg">Marked for Review</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-full bg-black" />
            <span className="text-lg">Selected Question</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-full bg-gray-300" />
            <span className="text-lg">Not Visited</span>
          </div>
        </div>
      </div>
    </div>
  );
}
