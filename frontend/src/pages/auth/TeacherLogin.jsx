import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Text,
  FieldHelperText,
  VStack,
 Field
} from '@chakra-ui/react';
const TeacherLogin = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };
  return (
 <Field.Root display={"flex"} justifyContent={"center"} alignItems={"center"} minH={"100vh"} >
       <Box
    minH="100vh"
    
    display="flex"
    alignItems="center"
    justifyContent="center"
    
  >
    <Box
      w="full"
      maxW="md"
      p={6}
      
      boxShadow="lg"
      borderRadius="md"
    >
      <form onSubmit={handleSubmit} >
        <VStack spacing={4}>
          <Heading as="h1" size="lg" textAlign="center">
            Login
          </Heading>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            Enter your credentials to access your account
          </Text>

          <Stack w="full" spacing={3}>
            <Box>
              <Text mb={1} fontWeight="semibold">
                Email
              </Text>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
              />
              <FieldHelperText>We'll never share your email.</FieldHelperText>
            </Box>

            <Box>
              <Text mb={1} fontWeight="semibold">
                Password
              </Text>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
              />
            </Box>
          </Stack>

          <Button colorScheme="teal" size="md" type="submit" w="full">
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  </Box>
 </Field.Root>
  )
}

export default TeacherLogin