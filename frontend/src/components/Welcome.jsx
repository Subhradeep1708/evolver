import {
    Box,
    Button,
    Heading,
    HStack,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router";
import HomeNav from "./HomeNav";

function Welcome() {
    return (
        <VStack position={"relative"}>
            <Image
                src="../../../public/clouds.png"
                position={"absolute"}
                top={"28"}
                left={"0"}
                zIndex={"10"}
                w={"300px"}
                h={"200px"}
                scale={"1.2"}
            />
            <HomeNav />
            <HStack
                h={"100vh"}
                w={"100vw"}
                justifyContent={"space-between"}
                px={"24"}
                py={"8"}
            >
                <VStack
                    display={"flex"}
                    flexDirection={"column"}
                    p={"20"}
                    alignItems={"flex-start"}
                    w={"60%"}
                    position={"relative"}
                    gapY={"12"}
                >
                    <Box zIndex={"11"} spaceY={"8"}>
                        <Heading size={"6xl"} color={"#324667"}>
                            Evolver..
                        </Heading>
                        <Text fontSize={"xl"} maxW={"breakpoint-sm"}>
                            Welcome to the best online exam portal, test
                            yourself here. Get started by logging in.
                        </Text>
                    </Box>
                    <Button p={"5"} size="lg" bg={"#D6E6FE"} color={"#102353"}>
                        <NavLink to="/auth/student">Login to continue</NavLink>
                        <FaArrowRight />
                    </Button>
                </VStack>
                <Box w={"40%"}>
                    <Image src="../../../public/image.png" />
                </Box>
            </HStack>
        </VStack>
    );
}
export default Welcome;
