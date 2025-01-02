import { Button, VStack } from "@chakra-ui/react";
import { Toaster, toaster } from "./ui/toaster.jsx";
// import { useRef, useState } from "react";

function Welcome() {
    const sayHello = () => {
        toaster.create({ title: "Hello Raktim" });
    };

    return (
        <VStack>
            <Button onClick={sayHello}>Say Hello</Button>
            <Toaster />
        </VStack>
    );
}
export default Welcome;
