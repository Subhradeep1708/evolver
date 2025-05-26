import MainExamPanel from "../_components/MainExamPanel";

export default async function ExamPanelPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <MainExamPanel examId={id} />;
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
