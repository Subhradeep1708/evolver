import React from "react";
import { Button } from "../ui/button";

interface SubmitButtonProps {
    onSubmit: () => void;
    disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit, disabled }) => {
    return (
        <Button
            onClick={onSubmit}
            disabled={disabled}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded disabled:opacity-50"
        >
            Submit Exam
        </Button>
    );
};

export default SubmitButton;
