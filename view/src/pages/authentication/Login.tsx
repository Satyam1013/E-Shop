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
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { email, password, login, error, loading, setEmail, setPassword } =
    useContext(AuthContext);

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
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Text
                display={"flex"}
                justifyContent={"flex-start"}
                color={"red"}
              >
                {error}
              </Text>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>

              <Input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Text
                display={"flex"}
                justifyContent={"flex-start"}
                color={"red"}
              >
                {error}
              </Text>
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
                onClick={login}
              >
                Sign in
              </Button>
            </Stack>
            {loading ? (
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
                z-index="99999"
              >
                <Image src={"/loader.gif"} alt="loader" />
              </Center>
            ) : (
              ""
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
