import React from "react";
import { Box, Heading, Text, VStack, Image } from "@chakra-ui/react";

const About = () => {
    return (
        <Box px={12} py={32} w={"full"} minH={"100vh"}>
            <Heading
                color={"brand.dark"}
                mb={6}
                textAlign="left"
                fontSize={"3xl"}
            >
                About Us
            </Heading>
            <VStack align="stretch" spacing={6} mx="auto" py={4}>
                <p className="text-lg text-red-800">
                    Welcome to our platform! We are dedicated to providing an
                    efficient and secure online examination experience for
                    students and instructors alike. Our mission is to simplify
                    the examination process while ensuring a fair and seamless
                    testing environment.
                </p>
                <Text fontSize={"lg"} lineHeight={"tall"}>
                    Our platform offers features such as automated progress
                    saving, customizable examination settings, and real-time
                    analytics to help instructors monitor and evaluate student
                    performance effectively.
                </Text>
                <Image
                    src="https://via.placeholder.com/800x400" // Replace with your image URL
                    alt="About us"
                    borderRadius="lg"
                />
                <Text fontSize={"lg"} lineHeight={"tall"}>
                    We value feedback and are constantly improving our services
                    to meet the evolving needs of educators and learners. If you
                    have any suggestions or need support, feel free to reach out
                    to us at{" "}
                    <Text as="span" fontWeight="bold">
                        support@examportal.com
                    </Text>
                    .
                </Text>
            </VStack>
        </Box>
    );
};

export default About;
