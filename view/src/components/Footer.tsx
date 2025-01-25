import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  Image,
  useColorModeValue,
  Fade,
} from "@chakra-ui/react";
import { ReactNode } from "react";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      fontWeight={"bold"}
      fontSize={"lg"}
      mb={4}
      textTransform="uppercase"
      letterSpacing="0.1em"
      color="gray.300"
    >
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={"#2D2D2D"}
      color={"#EAEAEA"}
      mt="20px"
      borderTop="5px solid #68D391"
      position="relative"
      zIndex={10}
    >
      <Container as={Stack} maxW={"7xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10}>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Link
              href={"/"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Overview
            </Link>
            <Stack direction={"row"} align={"center"} spacing={2}>
              <Link
                href={"/about"}
                _hover={{ color: "#68D391", textDecoration: "underline" }}
              >
                Features
              </Link>
              <Tag size={"sm"} bg={"green.500"} color={"white"} ml={2}>
                New
              </Tag>
            </Stack>
            <Link
              href={"#"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Tutorials
            </Link>
            <Link
              href={"/electronics"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Pricing
            </Link>
            <Link
              href={"/about"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Releases
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link
              href={"/about"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              About Us
            </Link>
            <Link
              href={"#"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Press
            </Link>
            <Link
              href={"/about"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Careers
            </Link>
            <Link
              href={"/about"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Contact Us
            </Link>
            <Link
              href={"/about"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Partners
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Link
              href={"/about"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Cookies Policy
            </Link>
            <Link
              href={"/about"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Privacy Policy
            </Link>
            <Link
              href={"/about"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Terms of Service
            </Link>
            <Link
              href={"/about"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Law Enforcement
            </Link>
            <Link
              href={"/about"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Status
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Link
              href={"#"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Facebook
            </Link>
            <Link
              href={"#"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Twitter
            </Link>
            <Link
              href={"#"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Dribbble
            </Link>
            <Link
              href={"#"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Instagram
            </Link>
            <Link
              href={"#"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              LinkedIn
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box
        py={6}
        borderTop="1px solid #404040"
        bg={"#1a1a1a"}
        position="relative"
        zIndex={10}
      >
        <Container
          as={Stack}
          maxW={"7xl"}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Flex align={"center"} justify={{ base: "center", md: "start" }}>
            <Image w="50px" h="50px" src="/e-shop.png" alt="E-Shop Logo" />
            <Text fontSize={"lg"} ml={2} fontWeight={"bold"} color={"white"}>
              E-Shop
            </Text>
          </Flex>
          <Text fontSize={"sm"} textAlign={"center"} color={"gray.400"}>
            © 2023 E-Shop Official. All rights reserved by Satyam Banwale.
          </Text>
          <Stack direction={"row"} spacing={6}>
            <Link
              href={"#"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Terms
            </Link>
            <Link
              href={"#"}
              _hover={{ color: "#68D391", textDecoration: "underline" }}
            >
              Privacy
            </Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
