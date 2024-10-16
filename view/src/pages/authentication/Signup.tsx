import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Alert,
  AlertIcon,
  CloseButton,
  AlertTitle,
  Center,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState<number>();
  const toast = useToast();

  let navigate = useNavigate();

  const handelSignUp = async () => {
    const payload = {
      username,
      email,
      password,
      mobile,
    };
    try {
      if (email.includes("@gmail.com")) {
        setLoading(true);
        const res = await fetch(
          "https://e-shop-215k.onrender.com/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const data = await res.json();

        if (data.msg === "Registration Successful") {
          navigate("/login");
        }

        setLoading(false);
      } else {
        toast({
          duration: 5000,
          isClosable: true,
          render: () => (
            <Alert status="error" borderRadius="lg" bg="red" color="white">
              <AlertIcon />
              <AlertTitle mb={0} mr={2} fontSize="md">
                The email address you entered isn't connected to an account
              </AlertTitle>
              <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
          ),
        });
      }
    } catch (err) {
      setLoading(false);
      toast({
        duration: 5000,
        isClosable: true,
        render: () => (
          <Alert status="error" borderRadius="lg" bg="red" color="white">
            <AlertIcon />
            <AlertTitle mb={0} mr={2} fontSize="md">
              Please fill all the details correctly
            </AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        ),
      });
      console.log(err);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to buy all of our cool products ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    value={username}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormControl id="mobile" isRequired mt="20px">
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  value={mobile}
                  type="number"
                  onChange={(e) => setMobile(Number(e.target.value))}
                />
              </FormControl>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handelSignUp}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link href="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
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
