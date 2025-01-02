import { Box, Button, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";


function Welcome() {
   
    return (
      
          <HStack h={"100vh"} w={"100vw"} justifyContent={"space-between"} >
            <VStack display={"flex"} flexDirection={"column"} p={"20"}alignItems={"flex-start"} w={"60%"} position={"relative"} >
                <Image src="../../../public/clouds.png" position={"absolute"} top={"-10"} left={"0"} zIndex={"10"} w={"300px"} h={"200px"}/>
                <Box mb={"10"} zIndex={"11"}>
                <Heading size={"6xl"} color={"#324667"} pb={"2.5"} >Evolver..</Heading>
                <Text fontSize={"xl"}>Welcome to the best online exam portal, test yourself here</Text>
                </Box>
                <Button p={"5"} size="lg" bg={"#D6E6FE"} color={"#102353"}>Login to continue <FaArrowRight /></Button>
            </VStack>
            <Box w={"40%"} pr={"20"} >
                <Image src="../../../public/image.png"/>
            </Box>
          </HStack>
       
    );
}
export default Welcome;
