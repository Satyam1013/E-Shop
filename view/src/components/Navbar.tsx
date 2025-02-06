import {
  Box,
  Image,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { NavItem } from "../utils/types";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { DebounceInput } from "react-debounce-input";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [username, setUsername] = useState("");
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    const data = localStorage.getItem("e-book username");
    if (data) {
      setUsername(data.toUpperCase());
    }
  }, []);

  const handlePage = (e: any) => {
    window.location.href = e.target.value;
  };

  return (
    <Box mb={{ base: "20px", md: "1px" }}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        position={"sticky"}
        top={0}
        boxShadow={"0 2px 8px rgba(0, 0, 0, 0.1)"}
        transition="background-color 0.3s ease, transform 0.3s ease"
        _hover={{
          transform: "translateY(-2px)",
        }}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon w={3} h={3} />
              ) : (
                <HamburgerIcon w={5} h={5} transition="transform 0.3s ease" />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
            _hover={{ bg: "transparent", transform: "scale(1.1)" }}
          />
        </Flex>
        <Flex
          flex={{ base: 1, lg: 0.8 }}
          justify={{ base: "center", md: "space-between" }}
          ml={2}
        >
          <Link href="/">
            <Image w="35px" h="35px" src="/e-shop.png" alt="logo" />
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <InputGroup
          display={{ base: "none", md: "flex" }}
          w={{ md: "200px", lg: "300px" }}
          border={"solid 1px pink"}
          alignItems={"center"}
          transition="all 0.3s ease"
          _hover={{
            boxShadow: "0 0 8px rgba(242, 73, 115, 0.6)",
          }}
        >
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <DebounceInput
            style={{
              marginLeft: "30px",
              width: "100%",
              border: "none",
              borderColor: "transparent",
              padding: "10px",
              outline: "none",
              color: "gray.800",
              transition: "all 0.3s ease",
            }}
            debounceTimeout={2000}
            placeholder="Search in E-Shop"
            onChange={handlePage}
          />
        </InputGroup>
        <Flex
          flex={{ base: 1, md: 0.3 }}
          justify={"flex-start"}
          ml="20px"
          gap="30px"
          alignItems={"center"}
        >
          {isAuthenticated ? (
            <Flex
              display={"inline-flex"}
              alignItems={"center"}
              gap="10px"
              justifyContent={"center"}
            >
              <Text
                mt={{ base: "0", md: "0" }}
                ml={{ base: "10px", md: "20px" }}
                zIndex={1}
                fontWeight={600}
                opacity={0.8}
                transition="all 0.3s ease"
                _hover={{ opacity: 1 }}
                display="inline-block"
              >
                Hi👋 {username}
              </Text>

              <Button
                bgColor={"#f24973"}
                color={"white"}
                h={{ base: "25px", md: "30px" }}
                w={{ base: "65px", lg: "100px" }}
                onClick={logout}
                transition="transform 0.3s ease"
                _hover={{
                  transform: "scale(1.05)",
                  bgColor: "#d03b6f",
                  boxShadow: "0 0 10px rgba(242, 73, 115, 0.6)",
                }}
              >
                Logout
              </Button>
            </Flex>
          ) : (
            <Link href="/login">
              <Button
                color={"#f24973"}
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.05)",
                  color: "white",
                  bgColor: "#f24973",
                }}
              >
                Sign In
              </Button>
            </Link>
          )}
          <Link href="/cart">
            <Image
              cursor={"pointer"}
              w="30px"
              h="30px"
              src="/cart.png"
              alt="cart icon"
              transition="transform 0.3s ease, filter 0.3s ease"
              _hover={{
                transform: "scale(1.1)",
                filter: "brightness(1.2)",
              }}
            />
          </Link>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} display={"flex"} alignItems={"center"}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: "#f24973",
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease",
                  textShadow: "0 0 8px rgba(242, 73, 115, 0.7)",
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{
        bg: useColorModeValue("pink.50", "gray.900"),
        transform: "scale(1.05)",
        transition: "all .3s ease",
      }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
      zIndex={1}
      backgroundColor={"gray.100"}
      transition="all 0.3s ease"
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
          color: "#f24973",
          transform: "scale(1.05)",
          transition: "all 0.3s ease",
          textShadow: "0 0 8px rgba(242, 73, 115, 0.7)",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Men's Collection",
    href: "/mens",
  },
  {
    label: "Women's Collection",
    href: "/womens",
  },

  {
    label: "Baby & Kids",
    href: "/kids",
  },
  {
    label: "Electronics",
    href: "/electronics",
  },
  {
    label: "About Us",
    href: "/about",
  },
];
