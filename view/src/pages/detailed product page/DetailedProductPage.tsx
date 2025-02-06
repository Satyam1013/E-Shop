import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
  Center,
  useToast,
  Alert,
  AlertIcon,
  CloseButton,
  AlertTitle,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MenProducts } from "../../utils/types";
import { AuthContext } from "../../context/AuthContext";

export default function DetailedProductPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<MenProducts>();
  const { category, id } = useParams();
  const toast = useToast();

  const getData = async (id: string | undefined) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://e-shop-215k.onrender.com/${category}/${id}`
      );
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCart = () => {
    const payload = data;
    if (isAuthenticated) {
      if (data?.availability !== "Currently unavailable") {
        fetch("https://e-shop-215k.onrender.com/carts/post", {
          method: "POST",
          headers: {
            Authorization: `${localStorage.getItem("e-book token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((res) => res.json())
          .then((res) => setButtonText(res.message))
          .catch((err) => console.log(err));
      } else {
        toast({
          duration: 5000,
          isClosable: true,
          render: () => (
            <Alert status="error" borderRadius="lg" bg="red" color="white">
              <AlertIcon />
              <AlertTitle mb={0} mr={2} fontSize="md">
                This Product is Currently Unavailable
              </AlertTitle>
              <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
          ),
        });
      }
    } else {
      toast({
        duration: 5000,
        isClosable: true,
        render: () => (
          <Alert status="error" borderRadius="lg" bg="red" color="white">
            <AlertIcon />
            <AlertTitle mb={0} mr={2} fontSize="md">
              Please Login First!
            </AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        ),
      });
    }
  };
  useEffect(() => {
    getData(id);
  }, [id]);
  return (
    <>
      {loading ? (
        <Center m="50px">
          <Image src="/loader.gif" alt="loader" />
        </Center>
      ) : (
        <Container
          maxW={"7xl"}
          p="20px"
          boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
        >
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
            mt={{ base: "20px", md: "10px", lg: "1px" }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={data?.image}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
                transition="transform 0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.02)",
                }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  color={"#f24973"}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {data?.heading}
                </Heading>
                <Flex mt="20px" justifyContent={"center"} gap="20px">
                  <Text
                    fontWeight={300}
                    color="green"
                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  >
                    ₹ {data?.discount_price}
                  </Text>
                  <Text
                    fontWeight={300}
                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                    color="red"
                    textDecoration={"line-through"}
                  >
                    ₹ {data?.original_price}
                  </Text>
                  <Text
                    fontWeight={300}
                    color="blue"
                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                  >
                    ₹ {data?.discount}
                  </Text>
                </Flex>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider borderColor={"gray.600"} />}
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    color={"gray.400"}
                    fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                    fontWeight={"300"}
                  >
                    {data?.title}
                  </Text>
                  <Text
                    color={"blue"}
                    fontSize={{ base: "md", md: "lg", lg: "xl" }}
                    fontWeight={"200"}
                  >
                    {data?.offer}
                  </Text>
                </VStack>

                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={"yellow.300"}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Product Details
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Flex gap="10px" m="auto" justifyContent={"center"}>
                        <Text as={"span"} fontWeight={"bold"}>
                          Category:
                        </Text>{" "}
                        <Text color={"#f24973"}>{data?.category}</Text>
                      </Flex>
                    </ListItem>
                    <ListItem>
                      <Flex gap="10px" m="auto" justifyContent={"center"}>
                        <Text as={"span"} fontWeight={"bold"}>
                          Availability:
                        </Text>{" "}
                        {data?.availability ? (
                          <Text fontWeight={"bold"} color="red">
                            {data?.availability}
                          </Text>
                        ) : (
                          <Text color="green"> Available</Text>
                        )}
                      </Flex>
                    </ListItem>
                  </List>
                </Box>
              </Stack>

              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                color={"white"}
                textTransform={"uppercase"}
                bg={buttonText === "Add to Cart" ? "blue.500" : "green"}
                _hover={{
                  bg: buttonText === "Add to Cart" ? "blue.600" : "green",
                }}
                isDisabled={
                  buttonText === "Added in Cart" ||
                  buttonText === "Already present in your Cart"
                }
                onClick={handleCart}
              >
                {buttonText}
              </Button>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"center"}
              >
                <MdLocalShipping />
                <Text>2-3 business days delivery</Text>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      )}
    </>
  );
}
