import { Button } from "../ui/button";

type QuestionNavigationProps = {
    currentQuestionId: number;
    totalQuestions: number;
    onNext: () => void;
    onPrev: () => void;
    onMarkForReview: () => void; // new prop
};

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
    currentQuestionId,
    totalQuestions,
    onNext,
    onPrev,
    onMarkForReview,
}) => {
    return (
        <div className="flex justify-between items-center space-x-4">
            <div className="flex space-x-4">
                <Button
                    onClick={onPrev}
                    disabled={currentQuestionId === 1}
                    className="px-4 py-2 bg-gray-600 rounded disabled:opacity-50"
                >
                    Previous
                </Button>

                <Button
                    onClick={onMarkForReview}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                    Mark for Review
                </Button>
            </div>

            <Button
                onClick={onNext}
                disabled={currentQuestionId === totalQuestions}
                className="px-4 py-2 bg-gray-600 rounded disabled:opacity-50"
            >
                Next
            </Button>
        </div>
    );
};

export default QuestionNavigation;
