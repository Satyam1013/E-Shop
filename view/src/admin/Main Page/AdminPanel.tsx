import {
  Flex,
  Box,
  Avatar,
  Text,
  Button,
  Image,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Listings from "../Sections/Listings";
import Users from "../Sections/Users";
import Info from "../Sections/Info";
import Orders from "../Sections/Orders";
import Dashboard from "../Sections/Dashboard";

const category = ["Dashboard", "Listings", "Orders", "Users", "Account-Info"];

function AdminPanel() {
  const navigate = useNavigate();
  const [item, setItem] = useState("dashboard");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleItems = (el: any) => {
    setSelectedCategory(el);
    if (el === "Dashboard") {
      setItem("dashboard");
    } else if (el === "Listings") {
      setItem("listings");
    } else if (el === "Users") {
      setItem("users");
    } else if (el === "Orders") {
      setItem("orders");
    } else if (el === "Account-Info") {
      setItem("info");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <Flex>
      <Box width="300px" backgroundColor="purple.100">
        <Center p="2" mt="20px">
          <Image w="100px" src="/e-shop.png" alt="logo" />
        </Center>
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
              color={"#6f186b"}
              fontWeight={"600"}
              _hover={{ color: "red" }}
              onClick={() => handleItems(el)}
              cursor={"pointer"}
              backgroundColor={
                selectedCategory === el ? "#64d66b" : "transparent"
              }
            >
              {el}
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
        {item === "dashboard" ? <Dashboard /> : ""}
        {item === "listings" ? <Listings /> : ""}
        {item === "orders" ? <Orders /> : ""}
        {item === "users" ? <Users /> : ""}
        {item === "info" ? <Info /> : ""}
      </Box>
    </Flex>
  );
}

export default AdminPanel;
