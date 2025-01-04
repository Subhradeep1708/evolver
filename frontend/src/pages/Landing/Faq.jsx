import {
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot,
} from "../../components/ui/accordion";
import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";

const Faq = () => {
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

    return (
        <Box px={12} py={32} w={"full"} minH={"100vh"}>
            <Heading color={"brand.dark"}
 mb={6} textAlign="left" fontSize={"3xl"}>
                Frequently Asked Questions
            </Heading>
            <VStack align="stretch" mx="auto" py={4}>
                <AccordionRoot collapsible defaultValue={["b"]}>
                    {items.map((item, index) => (
                        <AccordionItem key={index} value={item.value}>
                            <AccordionItemTrigger
                                as="span"
                                py={""}
                                fontWeight="semibold"
                                h={16}
                                fontSize={"lg"}
                                
                            >
                                {item.title}
                            </AccordionItemTrigger>
                            <AccordionItemContent px={4} pb={4} fontSize={"md"}
                            
                            >
                                {item.text}
                            </AccordionItemContent>
                        </AccordionItem>
                    ))}
                </AccordionRoot>
            </VStack>
        </Box>
    );
};

export default Faq;
