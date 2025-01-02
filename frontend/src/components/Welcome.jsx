import { Button, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";

function Welcome() {
    const [count, setCount] = useState(0);
    const countRef = useRef(count);

    const increment = () => {
        // setCount(count + 1);
        countRef.current = countRef.current + 1;
        console.log("Welcome:", countRef.current);
    };

    console.log("Welcome:", countRef.current);

    return (
        <VStack>
            {countRef.current}
            <Button onClick={increment}>Increment</Button>
        </VStack>
    );
}
export default Welcome;
