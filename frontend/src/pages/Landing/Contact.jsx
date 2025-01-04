import React from "react";
import {
    Box,
    Heading,
    VStack,
    Text,
    Input,
    Textarea,
    Button,
    Fieldset,
} from "@chakra-ui/react";
import { Field } from "../../components/ui/field";

const Contact = () => {
    return (
        <Box py={32} display={"flex"} flexDir={"row"} w="100%">
            <Box
                flexBasis={"1/2"}
                px={6}
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
            >
                <Heading color={"brand.dark"} textAlign="left" fontSize={"3xl"}>
                    Contact Us
                </Heading>
                <VStack align="stretch" spacing={6} py={4}>
                    <Text fontSize={"sm"} lineHeight={"tall"} maxW={"600px"}>
                        Have a question, feedback, or need support? We&aposre
                        here to help! Reach out to us by filling out the form
                        below, or use the contact details provided.
                    </Text>
                    <Fieldset.Root spaceY={3}>
                        <InputField label="Name" placeholder="John Doe" />
                        <InputField
                            label="Email"
                            placeholder="kutta@gmail.com"
                        />

                        <Field label="Message">
                            <Textarea
                                placeholder="Type your message here"
                                rows={3}
                                focusBorderColor="brand.dark"
                                maxW={"600px"}
                            />
                        </Field>
                        <Button colorScheme="blue" size="lg" w={"600px"}>
                            Send Message
                        </Button>
                        {/*
                         */}
                    </Fieldset.Root>
                </VStack>
                {/* 
                <VStack align="stretch" spacing={6} py={4}>
                    
                    
                </VStack> */}
            </Box>
            <Box
                flexBasis={"1/2"}
                px={6}
                display={"flex"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"left"}
            >
                <Box>
                    <Text fontSize={"lg"} fontWeight="semibold">
                        Email:
                        <Text as="span" fontWeight="normal">
                            support@examportal.com
                        </Text>
                    </Text>
                    <Text fontSize={"lg"} fontWeight="semibold">
                        Phone:
                        <Text as="span" fontWeight="normal">
                            +1 (123) 456-7890
                        </Text>
                    </Text>
                    <Text fontSize={"lg"} fontWeight="semibold">
                        Address:
                        <Text as="span" fontWeight="normal">
                            123 Exam Portal Lane, Suite 100, Exam City, EX 45678
                        </Text>
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default Contact;

const InputField = ({ label, ...props }) => (
    <Field label={label}>
        <Input maxW="600px" {...props} focusBorderColor="brand.dark" />
    </Field>
);
