import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const keyValue = process.env.REACT_APP_SECRET_KEY;
  const emailValue = process.env.REACT_APP_EMAIL;
  const passwordValue = process.env.REACT_APP_PASSWORD;
  const secretRouteKey = process.env.REACT_APP_ROUTE_KEY;

  const handleLogin = () => {
    if (
      key === keyValue &&
      email === emailValue &&
      password === passwordValue
    ) {
      navigate(`/admin_panel/${secretRouteKey}`);
    } else {
      setError(true);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Admin Sign in Page</Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8} bgColor={"white"}>
          <Stack spacing={4}>
            <FormControl id="secret">
              <FormLabel>Secret Key</FormLabel>
              <Input
                value={key}
                type="text"
                onChange={(e) => setKey(e.target.value)}
              />
              {error ? (
                <Text
                  display={"flex"}
                  justifyContent={"flex-start"}
                  color={"red"}
                >
                  Wrong Credentials
                </Text>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {error ? (
                <Text
                  display={"flex"}
                  justifyContent={"flex-start"}
                  color={"red"}
                >
                  Wrong Credentials
                </Text>
              ) : (
                ""
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>

              <Input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error ? (
                <Text
                  display={"flex"}
                  justifyContent={"flex-start"}
                  color={"red"}
                >
                  Wrong Credentials
                </Text>
              ) : (
                ""
              )}
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default AdminLogin;
