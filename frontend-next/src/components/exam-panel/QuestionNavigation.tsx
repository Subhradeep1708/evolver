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
            <button
                onClick={onPrev}
                disabled={currentQuestionId === 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
                Previous
            </button>

            <button
                onClick={onMarkForReview}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
                Mark for Review
            </button>

            <button
                onClick={onNext}
                disabled={currentQuestionId === totalQuestions}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default QuestionNavigation;
