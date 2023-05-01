import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { ElectronicProducts, KidProducts, MenProducts, StatsCardProps, WomenProducts } from "../utils/types";
import { Link } from "react-router-dom";

function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={'gray.500'}
      rounded={'lg'}>
      <StatLabel fontWeight={'medium'} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

const Homepage = () => {
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);
  const [kid, setKid] = useState([]);
  const [electronic, setElectronic] = useState([]);
  const [load, setLoad] = useState(false);

  const getData = async () => {
    setLoad(true);
    try {
      const data = await fetch("https://long-tie-tick.cyclic.app//homes");
      const res = await data.json();
      setMen(res[0].Mens);
      setWomen(res[0].womens);
      setKid(res[0].kids);
      setElectronic(res[0].electronics);
      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box mt={{ base: "41px", md: "0" }}>
      <Link to="/mens">
        <Image src="men divider.jpg" w="100%" />
      </Link>
      {load ? (
        <Center>
          <Image src="loader.gif" alt="loader" />
        </Center>
      ) : (
        <Box
          maxW="95%"
          m="auto"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Link to="/mens">
            <Heading
              size={"xl"}
              textTransform="uppercase"
              letterSpacing="widest"
              borderBottom="2px"
              borderColor="gray.500"
              m="20px"
              pb={2}
              color={"#68d391"}
              fontFamily={"sans-serif"}
            >
              Mens Collection
            </Heading>
            <Box
              display="grid"
              gridTemplateColumns={{
                base: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
                lg: "repeat(4,1fr)",
              }}
              justifyContent={"center"}
              m="auto"
            >
              {men.map((el: MenProducts, index) => (
                <Box
                  key={index}
                  m={{ base: "10px", lg: "20px" }}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  gap={"20px"}
                  p="10px"
                  boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
                >
                  <Center>
                    <Image
                      src={el.image}
                      alt="men_products"
                      w={{ base: "120px", md: "200px", lg: "250px" }}
                      h={{ base: "200px", md: "300px", lg: "350px" }}
                    />
                  </Center>
                  <Heading
                    size={{ base: "15px", md: "sm", lg: "md" }}
                    fontWeight="semibold"
                    lineHeight={"30px"}
                  >
                    {el.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    {el.discount_price}
                  </Text>
                </Box>
              ))}
            </Box>
          </Link>

          <Link to="/womens">
            <Heading
              size={"xl"}
              textTransform="uppercase"
              letterSpacing="widest"
              borderBottom="2px"
              borderColor="gray.500"
              m="20px"
              mt="50px"
              pb={2}
              color={"#68d391"}
              fontFamily={"sans-serif"}
            >
              Womens Collection
            </Heading>
            <Image
              src="/women-cover.jpg"
              alt="women-cover"
              w="100%"
              h={{base:'110px',lg:"270px"}}
            />

            <Box
              display="grid"
              gridTemplateColumns={{
                base: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
                lg: "repeat(4,1fr)",
              }}
              justifyContent={"center"}
              m="auto"
            >
              {women.map((el: WomenProducts, index) => (
                <Box
                  key={index}
                  m={{ base: "10px", lg: "20px" }}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  gap={"20px"}
                  p="10px"
                  boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
                >
                  <Center>
                    <Image
                      src={el.image}
                      alt="men_products"
                      w={{ base: "120px", md: "200px", lg: "250px" }}
                      h={{ base: "200px", md: "300px", lg: "350px" }}
                    />
                  </Center>
                  <Heading
                    size={{ base: "15px", md: "sm", lg: "md" }}
                    fontWeight="semibold"
                    lineHeight={"30px"}
                  >
                    {el.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    {el.discount_price}
                  </Text>
                </Box>
              ))}
            </Box>
          </Link>

          <Carousel />

          <Link to="/kids">
            <Heading
              size={"xl"}
              textTransform="uppercase"
              letterSpacing="widest"
              borderBottom="2px"
              borderColor="gray.500"
              m="20px"
              pb={2}
              color={"#68d391"}
              fontFamily={"sans-serif"}
            >
              Kids Collection
            </Heading>
            <Box
              display="grid"
              gridTemplateColumns={{
                base: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
                lg: "repeat(4,1fr)",
              }}
              justifyContent={"center"}
              m="auto"
            >
              {kid.map((el: KidProducts, index) => (
                <Box
                  key={index}
                  m={{ base: "10px", lg: "20px" }}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  gap={"20px"}
                  p="10px"
                  boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
                >
                  <Center>
                    <Image
                      src={el.image}
                      alt="men_products"
                      w={{ base: "120px", md: "200px", lg: "250px" }}
                      h={{ base: "200px", md: "300px", lg: "350px" }}
                    />
                  </Center>
                  <Heading
                    size={{ base: "15px", md: "sm", lg: "md" }}
                    fontWeight="semibold"
                    lineHeight={"30px"}
                  >
                    {el.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    {el.discount_price}
                  </Text>
                </Box>
              ))}
            </Box>
          </Link>

          <Link to="/electronics">
            <Heading
              size={"xl"}
              textTransform="uppercase"
              letterSpacing="widest"
              borderBottom="2px"
              borderColor="gray.500"
              m="20px"
              pb={2}
              color={"#68d391"}
              fontFamily={"sans-serif"}
            >
              Electronics Collection
            </Heading>
            <Image src="electronic divider.jpg" alt="elec div" />

            <Box
              display="grid"
              gridTemplateColumns={{
                base: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
                lg: "repeat(4,1fr)",
              }}
              justifyContent={"center"}
              m="auto"
            >
              {electronic.map((el: ElectronicProducts, index) => (
                <Box
                  key={index}
                  m={{ base: "10px", lg: "20px" }}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  gap={"20px"}
                  p="10px"
                  boxShadow="rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
                >
                  <Center>
                    <Image
                      src={el.image}
                      alt="men_products"
                      w={{ base: "120px", md: "200px", lg: "250px" }}
                      h={{ base: "200px", md: "300px", lg: "350px" }}
                    />
                  </Center>
                  <Heading
                    size={{ base: "15px", md: "sm", lg: "md" }}
                    fontWeight="semibold"
                    lineHeight={"30px"}
                  >
                    {el.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    {el.discount_price}
                  </Text>
                </Box>
              ))}
            </Box>
          </Link>
        </Box>
      )}
   
      <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        >
          What is our company doing?
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }} >
          <StatsCard title={"We serve"} stat={"50,000 people"} />
          <StatsCard title={"In"} stat={"30 different countries"} />
          <StatsCard title={"Who speak"} stat={"100 different languages"} />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Homepage;
