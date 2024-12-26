import { useState, useEffect } from "react";
import { Span, Text } from "@chakra-ui/react";

const CountdownTimer = ({ initialMinutes }) => {
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Convert minutes to seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup timer on unmount
    }, []);

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}:${String(seconds).padStart(2, "0")}`;
    };

    return (
        <Text fontSize="lg">
            Time Left:
            <Span
                background={"white"}
                py={1}
                px={4}
                mx={1}
                borderRadius={"2xl"}
                ml={1}
                fontWeight={"semibold"}
            >
                {formatTime(timeLeft)}
            </Span>
        </Text>
    );
};

export default CountdownTimer;
