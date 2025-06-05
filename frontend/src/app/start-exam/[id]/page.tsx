import MultiPageExam from "../_components/MultiPageExam";

export default async function ExamPanelPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <MultiPageExam examId={id} />;
}
/*
const [step, setStep] = useState("rules");
<div>
     {
        step === "rules" && (.....)
     }
        {
        step === "exam" && (
           .....
        )}  
        {
        step === "result" && (....)
}
</div>
*/
