import { useEffect, useRef, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ExamPanel from "../pages/student/exam/ExamPanel";
import StartExam from "../pages/student/exam/StartExam";
import { useParams } from "react-router";
import axios from "axios";

const ExamLayout = () => {
    const pageRef = useRef(null);
    const fullScreenHandle = useFullScreenHandle();
    const [page, setPage] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        // Fetch exam data

        // Disable right-click context menu
        const handleRightClick = (event) => {
            event.preventDefault();
        };
        document.addEventListener("contextmenu", handleRightClick);

        // Disable F11 and other fullscreen toggles
        const handleKeyDown = (event) => {
            if (event.key === "F11") {
                event.preventDefault();
            }
            if (event.key === "Escape" && isFullScreen) {
                event.preventDefault();
                alert("You have exited fullscreen. The exam will now end.");
                handleExitExam();
            }
            if (
                (event.ctrlKey || event.metaKey) &&
                (event.key === "I" ||
                    event.key === "Shift" ||
                    event.key === "C")
            ) {
                event.preventDefault();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Clean up event listeners on component unmount
        return () => {
            document.removeEventListener("contextmenu", handleRightClick);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isFullScreen]); // Track fullscreen state

    const handleStartExam = () => {
        fullScreenHandle.enter();
        setPage(2);
    };

    const handleExitExam = () => {
        setPage(3);
        fullScreenHandle.exit();
    };

    // Track when fullscreen state changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (document.fullscreenElement) {
                setIsFullScreen(true); // Entered fullscreen
            } else {
                setIsFullScreen(false); // Exited fullscreen
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    return (
        <div ref={pageRef}>
            {page === 1 && (
                <div>
                    <StartExam handleStartExam={handleStartExam} />
                </div>
            )}
            <FullScreen handle={fullScreenHandle}>
                {page === 2 && <ExamPanel handleExitExam={handleExitExam} />}
                {page === 3 && <p>Thank You</p>}
            </FullScreen>
        </div>
    );
};

export default ExamLayout;
