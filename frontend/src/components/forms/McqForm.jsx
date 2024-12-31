import React from 'react'
import {
    Button,
    Input,
    Stack,
    HStack,
    Text,
    Box,
    Grid,
    NativeSelectField,
    NativeSelectRoot,
} from "@chakra-ui/react";
import { Field } from "../ui/field";
import { NumberInputRoot, NumberInputField } from "../ui/number-input";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegImage } from "react-icons/fa";
import { routes } from "../../utils/constants";
import { HiUpload } from "react-icons/hi";
const handleQuestionChange = (index, key, value) => {}
const addBlankQuestion = () => {}
const McqForm = () => {
    const handleSubmit=()=>{}
    const mcqs=[
        {
            question: "abc",
            options: ["a", "b", "c", "d"],
            point: 1,
            answer: "",
        },
        {
            question: "abc",
            options: ["a", "b", "c", "d"],
            point: 1,
            answer: "",
        }
    ]
  return (
   <form>
     <Box>
    <Stack spacing={6}>
        <Text fontSize="lg" fontWeight="bold">
            Add Questions
        </Text>

        {/* Map over the MCQs to render each question */}
        {/* <Card> */}
        
        {mcqs.map((mcq, index) => (
            <Box
                key={index}
                p={4}
                borderRadius="md"
                spaceY={4}
                mb={4}
                bg={"bg"}
                shadow={"sm"}
                maxW={""}
            >
                {/* <Stack spacing={4}> */}
                <HStack>
                    <Input
                        value={index + 1 + "."}
                        disabled={true}
                        px={2}
                        maxW={10}
                        color={"fg"}
                        fontWeight={"bold"}
                        borderWidth={0}
                    />
                    {/* Question Input */}
                    <Input
                        placeholder="Enter question"
                        value={mcq.question}
                        px={2}
                        onChange={(e) => {
                            handleQuestionChange(
                                index,
                                "question",
                                e.target.value
                            );
                        }}
                        onFocus={() => {
                            if (index === mcqs.length - 1) {
                                addBlankQuestion();
                            }
                        }}
                    />
                    {/* Points Input */}

                    <NumberInputRoot
                        defaultValue="1"
                        maxW={20}
                        // px={2}
                        onChange={(value) => {
                            handleQuestionChange(
                                index,
                                "point",
                                value
                            );
                        }}
                    >
                        <NumberInputField />
                    </NumberInputRoot>
                </HStack>

                {/* Options Inputs */}
                <Grid
                    templateColumns={"repeat(2, 1fr)"}
                    templateRows={"repeat(2, 1fr)"}
                    gap={4}
                    w={"100%"}
                >
                    {mcq.options.map(
                        (option, optionIndex) => (
                            <Input
                                key={optionIndex}
                                placeholder={`Option ${String.fromCharCode(
                                    65 + optionIndex
                                )}`}
                                px={2}
                                w={"100%"}
                                value={option}
                                onChange={(e) =>
                                    handleQuestionChange(
                                        index,
                                        `option${optionIndex}`,
                                        e.target.value
                                    )
                                }
                            />
                        )
                    )}
                </Grid>

                <HStack justify={"space-between"}>
                    <HStack>
                        <Field>
                            <NativeSelectRoot>
                                <NativeSelectField
                                    name="role"
                                    px={4}
                                    maxW={96}
                                    background={"bg"}
                                    font={"fg"}
                                    onChange={(e) =>
                                        handleQuestionChange(
                                            index,
                                            "answer",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Select correct
                                        answer
                                    </option>
                                    <option value="teacher">
                                        A. {mcq.options[0]}
                                    </option>
                                    <option value="controller">
                                        B. {mcq.options[1]}
                                    </option>
                                    <option value="controller">
                                        C. {mcq.options[2]}
                                    </option>
                                    <option value="controller">
                                        D. {mcq.options[3]}
                                    </option>
                                </NativeSelectField>
                            </NativeSelectRoot>
                        </Field>
                        <Button
                            background={"bg.muted"}
                            color={"fg"}
                        >
                            <FaRegImage />
                        </Button>
                    </HStack>
                    <Box>
                        <Button
                            background={"bg.muted"}
                            disabled={mcqs.length === 1}
                            onClick={() => {
                                setMcqs(
                                    mcqs.filter(
                                        (mcq, i) =>
                                            i !== index
                                    )
                                );
                            }}
                        >
                            <AiOutlineDelete color="red" />
                        </Button>
                    </Box>
                </HStack>
                {/* </Stack> */}
            </Box>
        ))}
        {/* </Card> */}

        {/* Submit Button */}
        {/* <Button onClick={handleSubmit}>Submit Exam</Button> */}
        <Button type="submit">Submit Exam</Button>
    </Stack>
   </Box>
   </form>
)}

export default McqForm