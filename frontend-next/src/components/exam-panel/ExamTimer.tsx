"use client";

import { useEffect, useState } from "react";

type TimerProps = {
    durationInMinutes: number;
    onTimeUp?: () => void;
};

export const ExamTimer = ({ durationInMinutes, onTimeUp }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(durationInMinutes * 60); // in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUp?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onTimeUp]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="text-center px-4 py-2 bg-gray-100 rounded-lg shadow text-lg font-semibold w-fit mx-auto">
            ⏳ Time Left:{" "}
            <span className="text-red-600">{formatTime(timeLeft)}</span>
        </div>
    );
};
