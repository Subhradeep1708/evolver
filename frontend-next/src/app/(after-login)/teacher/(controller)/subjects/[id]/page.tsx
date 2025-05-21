import { SubjectAddForm } from "@/components/forms/SubjectAddForm";
import apiRoutes from "@/lib/routes";
import { SubjectFormTypes } from "@/types/form-types";
import axios from "axios";

const EditSubject = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    console.log("EditSubject ID:", id);
    let subjectData: SubjectFormTypes | null = null;
    try {
        const res = await axios.get(`${apiRoutes.getSubject}/${id}`);
        // if
        // console.log("Subject Data:", subject.status);
        if (res.status === 200) {
            subjectData = {
                id: res.data.data.id,
                name: res.data.data.name,
                description: res.data.data.description,

            };
        } else {
            console.error("Error fetching subject");
        }
        console.log("Subject Data:", subjectData);
    } catch (error) {
        console.error("Error fetching subject:", error);
    }

    // useEffect(() => {
    //     const fetchSubject = ()=>{}
    //     fetchSubject();
    // }, []);

    return (
        <div>
            {subjectData ? (
                <SubjectAddForm subject={subjectData} />
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                </div>
            )}
        </div>
    );
};

export default EditSubject;
