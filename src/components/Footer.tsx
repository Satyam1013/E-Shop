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
} from "@chakra-ui/react";
import { ReactNode } from "react";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      mt="10px"
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 2, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Link href={"/"}>Overview</Link>
            <Stack direction={"row"} align={"center"} spacing={2}>
              <Link href={"/about"}>Features</Link>
              <Tag
                size={"sm"}
                bg={useColorModeValue("green.300", "green.800")}
                ml={2}
                color={"white"}
              >
                New
              </Tag>
            </Stack>
            <Link href={"#"}>Tutorials</Link>
            <Link href={"/electronics"}>Pricing</Link>
            <Link href={"/about"}>Releases</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href={"/about"}>About Us</Link>
            <Link href={"#"}>Press</Link>
            <Link href={"/about"}>Careers</Link>
            <Link href={"/about"}>Contact Us</Link>
            <Link href={"/about"}>Partners</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Link href={"/about"}>Cookies Policy</Link>
            <Link href={"/about"}>Privacy Policy</Link>
            <Link href={"/about"}>Terms of Service</Link>
            <Link href={"/about"}>Law Enforcement</Link>
            <Link href={"/about"}>Status</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Link href={"/about"}>Facebook</Link>
            <Link href={"/about"}>Twitter</Link>
            <Link href={"/about"}>Dribbble</Link>
            <Link href={"/about"}>Instagram</Link>
            <Link href={"/about"}>LinkedIn</Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Link href="/">
          <Flex
            align={"center"}
            _before={{
              content: '""',
              borderBottom: "1px solid",
              borderColor: useColorModeValue("gray.200", "gray.700"),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: "1px solid",
              borderColor: useColorModeValue("gray.200", "gray.700"),
              flexGrow: 1,
              ml: 8,
            }}
          >
            <Image w="50px" h="50px" src="/e-shop.png" alt="logo" />
          </Flex>
        </Link>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © 2023 E-Shop Official. All rights reserved by Satyam Banwale.
        </Text>
      </Box>
    </Box>
  );
}
