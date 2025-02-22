import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://e-shop-215k.onrender.com/users/customers");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (id: number) => {
    const updatedCartItems = users.filter((item: any) => item._id !== id);
    setUsers(updatedCartItems);
    try {
      const res = await fetch(`https://e-shop-215k.onrender.com/users/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {loading ? (
        <Center m="50px">
          <Image src="/loader.gif" alt="loader" />
        </Center>
      ) : (
        <Box bgColor={"gray.100"}>
          <Heading pt="20px" fontFamily={"sans-serif"}>
            Users Data
          </Heading>
          <Flex gap="10px" justifyContent={"center"}>
            <Text fontWeight={"bold"} color="#64d66b">
              Total Users :{" "}
            </Text>
            <Text fontWeight={"bold"} color="#64d66b">
              {users.length}
            </Text>
          </Flex>

          <Box mt="50px">
            <Flex
              w="95%"
              m={"auto"}
              justifyContent={"space-around"}
              border={"solid 3px #e9d8fd"}
            >
              <Text w="10%">ID</Text>
              <Text w="15%">NAME</Text>
              <Text w="30%">EMAIL</Text>
              <Text w="25%">MOBILE NO</Text>
              <Text w="15%">DELETE USER</Text>
            </Flex>
            {users.map((user: any, i) => (
              <Flex
                key={i}
                justifyContent={"space-around"}
                border={"solid 1px #e9d8fd"}
                w="95%"
                m={"auto"}
                mt="15px"
                p="10px"
                alignItems={"center"}
              >
                <Text w="10%">{user._id.slice(-5)}</Text>
                <Text w="15%">{user.username}</Text>
                <Text w="30%">{user.email}</Text>
                <Text w="25%">{user.mobile}</Text>
                <Button
                  color={"red"}
                  w="15%"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </Button>
              </Flex>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Users;
