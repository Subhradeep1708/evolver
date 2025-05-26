"use client";

import { TiTick } from "react-icons/ti";
// import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EndExam() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-200 to-blue-200">
            <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center space-y-6">
                <div className="bg-green-400 p-4 rounded-full w-32 aspect-square flex items-center justify-center">
                    <TiTick color="white" size={96} />
                </div>
                <h2 className="text-2xl font-semibold">Exam Ended</h2>
                <p className="text-lg text-center">
                    You have successfully ended the exam. <br />
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="text-blue-500 underline mt-2"
                    >
                        Go back to dashboard
                    </button>
                </p>
            </div>
        </div>
    );
}
