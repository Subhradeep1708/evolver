

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const items = [
  {
    value: "a",
    title: "What is the process for taking an exam?",
    text: 'Once logged in, go to the "Exams" section, select your assigned exam, and start the test.',
  },
  {
    value: "b",
    title: "Can I retake an exam?",
    text: "Retakes depend on the permissions set by the teacher or controller. Check with your instructor for details.",
  },
  {
    value: "c",
    title: "How do I reset my password?",
    text: 'Use the "Forgot Password" option on the login page to reset your password.',
  },
  {
    value: "d",
    title: "What happens if I lose my internet connection during an exam?",
    text: "The system automatically saves your progress. You can resume the exam once your connection is restored.",
  },
  {
    value: "e",
    title: "Who should I contact for technical support?",
    text: "Contact your controller or send an email to support@examportal.com.",
  },
];

const Faq = () => {
  return (
    <div className="w-full min-h-screen px-6 md:px-12 py-32">
      <h2 className="text-3xl font-bold text-left text-[#102353] mb-6">
        Frequently Asked Questions
      </h2>
      <Accordion type="multiple" defaultValue={["b"]} className="space-y-2">
        {items.map((item) => (
          <AccordionItem value={item.value} key={item.value}>
            <AccordionTrigger className="text-lg font-semibold">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="text-base px-2 pb-4">
              {item.text}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
