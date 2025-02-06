import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Image,
  Center,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { email, password, login, error, loading, setEmail, setPassword } =
    useContext(AuthContext);
  const [validationError, setValidationError] = useState("");

  const handleLogin = () => {
    setValidationError("");
    if (!email || !password) {
      setValidationError("Please enter both email and password.");
      return;
    }
    login();
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.900"}>
            to shop all the amazing <Link color={"blue.400"}>products</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={!!validationError || !!error}>
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {(validationError || error) && (
                <Text color={"red"}>{validationError || error}</Text>
              )}
            </FormControl>

            <FormControl id="password" isInvalid={!!validationError || !!error}>
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {(validationError || error) && (
                <Text color={"red"}>{validationError || error}</Text>
              )}
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
                isLoading={loading}
                loadingText="Signing In"
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Don't have an account?{" "}
                <Link href="/sign_up" color={"blue.400"}>
                  Sign Up
                </Link>
              </Text>
            </Stack>
            {loading && (
              <Center
                position={"absolute"}
                backgroundColor="rgba(0,0,0,0.5)"
                height="100%"
                width="100%"
                top={-350}
                left={"0"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="auto"
                zIndex={99999}
              >
                <Image src={"/loader.gif"} alt="loader" />
              </Center>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
