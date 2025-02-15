import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import {
  Box,
  Image,
  Heading,
  Text,
  Center,
  SimpleGrid,
  chakra,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

type Product = {
  image: string;
  title: string;
  discount_price: number;
};

type Categories = {
  men: Product[];
  women: Product[];
  kid: Product[];
  electronic: Product[];
};

function StatsCard({ title, stat }: { title: string; stat: string }) {
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={"gray.500"}
      rounded={"lg"}
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 20px",
      }}
    >
      <StatLabel fontWeight={"medium"} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

const Homepage = () => {
  const [categories, setCategories] = useState<Categories>({
    men: [],
    women: [],
    kid: [],
    electronic: [],
  });
  const [load, setLoad] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode(); // ChakraUI hook
  const bgColor = useColorModeValue("#f7f7f7", "#1a202c"); // Light/Dark mode background
  const textColor = useColorModeValue("black", "white");
  const headingHoverColor = useColorModeValue("#2c7a7b", "#38b2ac");
  const headingColor = useColorModeValue("#741c6c", "#81e6d9");
  const cardBgColor = useColorModeValue("white", "#e2e8f0"); // Light: white, Dark: darker card color
  const gridBgColor = useColorModeValue("#cccfcf", "#1a202c"); // Light: light gray, Dark: dark background

  const getData = async () => {
    setLoad(true);
    try {
      const response = await fetch("https://e-shop-215k.onrender.com/homes");
      const data = await response.json();

      const {
        Mens = [],
        womens = [],
        kids = [],
        electronics = [],
      } = data[0] || {};
      setCategories({
        men: Mens,
        women: womens,
        kid: kids,
        electronic: electronics,
      });
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box bg={bgColor} color={"black"}>
      <Box position="fixed" bottom="20px" right="20px" zIndex="10">
        <Button onClick={toggleColorMode} size="sm" borderRadius={"60%"}>
          {colorMode === "light" ? (
            <SunIcon
              w={3}
              h={6}
              color="orange.400"
              borderLeftColor={"orange.100"}
            />
          ) : (
            <MoonIcon w={3} h={6} color="teal.300" />
          )}
        </Button>
      </Box>

      <Carousel />
      {load ? (
        <Center>
          <Image src="loader.gif" alt="loader" />
        </Center>
      ) : (
        <Box m="auto" borderWidth="1px" borderRadius="lg" overflow="hidden">
          {Object.entries(categories).map(([key, products]) => (
            <Link key={key} to={`/${key}s`}>
              <Heading
                size={"xl"}
                textTransform="uppercase"
                letterSpacing="widest"
                borderBottom="2px"
                borderColor="gray.500"
                m="20px"
                pb={2}
                color={headingColor}
                fontFamily={"sans-serif"}
                transition="color 0.3s ease, border-color 0.3s ease"
                _hover={{
                  color: headingHoverColor,
                  borderColor: headingHoverColor,
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} Collection
              </Heading>

              <Box
                display="grid"
                gridTemplateColumns={{
                  base: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                }}
                p="20px"
                justifyContent={"center"}
                bgColor={gridBgColor}
              >
                {products.map((product: Product, index) => (
                  <Box
                    key={index}
                    m={{ base: "10px", lg: "15px" }}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    gap={"10px"}
                    p="10px"
                    bgColor={cardBgColor}
                    borderRadius="20px"
                    boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
                    transition="transform 0.3s ease, box-shadow 0.3s ease"
                    _hover={{
                      transform: "scale(1.05)",
                      boxShadow: "rgba(0, 0, 0, 0.15) 0px 8px 20px",
                    }}
                  >
                    <Center>
                      <Box
                        w="200px"
                        h="200px"
                        overflow="hidden"
                        borderRadius="10px"
                        position="relative"
                      >
                        <Image
                          src={product.image}
                          alt={`${key}_product`}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                          transition="transform 0.5s ease"
                          _hover={{
                            transform: "scale(1.2)",
                          }}
                        />
                      </Box>
                    </Center>
                    <Heading
                      size={{ base: "15px", md: "sm", lg: "md" }}
                      fontWeight="semibold"
                      lineHeight={"30px"}
                    >
                      {product.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.500">
                      ₹ {product.discount_price}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Link>
          ))}
        </Box>
      )}
      <Box maxW="95%" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
          color={textColor}
        >
          What does our company offer?
        </chakra.h1>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 5, lg: 8 }}
          color={textColor}
        >
          <StatsCard
            title={"Products for Everyone"}
            stat={"Men, Women, Kids"}
          />
          <StatsCard
            title={"Wide Variety"}
            stat={"Thousands of Options to Choose From"}
          />
          <StatsCard
            title={"Affordable & Convenient"}
            stat={"Easy to Buy at Competitive Prices"}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Homepage;
