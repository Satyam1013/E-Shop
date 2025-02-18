import {
  Flex,
  Box,
  Avatar,
  Text,
  Button,
  Image,
  Center,
  Heading,
  Stack,
  Link,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Listings from "../Sections/Listings";
import Users from "../Sections/Users";
import Info from "../Sections/Info";
import Orders from "../Sections/Orders";
import Dashboard from "../Sections/Dashboard";
import { FaChartLine, FaClipboardList, FaList, FaUsers } from "react-icons/fa";

const category = ["dashboard", "listings", "orders", "users", "admin-info"];

function AdminPanel() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");

  const handleItems = (tab: string) => {
    if (tab === "dashboard") {
      setSearchParams({ page: "dashboard" });
    } else if (tab === "listings") {
      setSearchParams({ page: "listings" });
    } else if (tab === "users") {
      setSearchParams({ page: "users" });
    } else if (tab === "orders") {
      setSearchParams({ page: "orders" });
    } else if (tab === "admin-info") {
      setSearchParams({ page: "admin-info" });
    }
  };

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <Flex>
      <Box width="300px" backgroundColor="purple.100">
        <Link href="/admin_panel/220451">
          <Center p="2" mt="20px">
            <Image w="100px" src="/e-shop.png" alt="logo" />
          </Center>
        </Link>
        <Box p="2" mt="50px">
          <Avatar
            size="2xl"
            border={"solid 2px white"}
            name="SATYAM BANWALE"
            src="https://avatars.githubusercontent.com/u/101392309?v=4"
          />
          <Text fontSize="xl" fontWeight="bold" color={"#64d66b"} mt="3">
            SATYAM BANWALE
          </Text>
        </Box>
        <Box p="2" m="auto">
          {category.map((el, i) => (
            <Text
              key={i}
              boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
              variant="ghost"
              m="auto"
              p="10px"
              width="200px"
              mt="4"
              color={page === el ? "white" : "#6f186b"}
              fontWeight={"600"}
              _hover={{ color: "red" }}
              onClick={() => handleItems(el)}
              cursor={"pointer"}
              backgroundColor={page === el ? "#64d66b" : "transparent"}
            >
              {el.toUpperCase()}
            </Text>
          ))}
          <Button
            variant="ghost"
            width="100%"
            mt="30px"
            bgColor={"red"}
            color={"white"}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>
      <Box flex="1">
        {page === null ? (
          <Box
            bg="white"
            w="100%"
            boxShadow="md"
            rounded="md"
            p={4}
            mr={{ md: 8 }}
            mb={{ base: 8, md: 0 }}
          >
            <Stack spacing={24}>
              <Heading size="lg" mb={2} color='violet'>
                Admin Panel
              </Heading>
              <Text fontSize="2xl" mb={4} color='green'>
                Welcome, Satyam Banwale!
              </Text>
              <Text fontSize="xl" mb={8}>
            This is where you can manage your website and make changes as needed.
          </Text>
              <Flex justify="space-between" align="center">
                <Link href="/admin_panel/220451?page=dashboard">
                  <FaChartLine />
                </Link>
                <Link href="/admin_panel/220451?page=listings">
                  <FaList />
                </Link>
                <Link href="/admin_panel/220451?page=orders">
                  <FaClipboardList />
                </Link>
                <Link href="/admin_panel/220451?page=users">
                  <FaUsers />
                </Link>
              </Flex>
            </Stack>
          </Box>
        ) : (
          ""
        )}
        {page === "dashboard" ? <Dashboard /> : ""}
        {page === "listings" ? <Listings /> : ""}
        {page === "orders" ? <Orders /> : ""}
        {page === "users" ? <Users /> : ""}
        {page === "admin-info" ? <Info /> : ""}
      </Box>
    </Flex>
  );
}

export default AdminPanel;
