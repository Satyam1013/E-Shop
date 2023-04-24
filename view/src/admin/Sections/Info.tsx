import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  FormControl,
  Heading,
  Image,
  Input,
  Stack,
} from "@chakra-ui/react";
import { AdminData } from "../../utils/types";

const Info = () => {
  const initData = JSON.parse(localStorage.getItem("admin-info") || "");
  const [adminData, setAdminData] = useState<AdminData>(initData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    localStorage.setItem("admin-info", JSON.stringify(adminData));
  };

  return (
    <Box p="8" bgColor={"gray.100"} h="100%">
      <Heading fontFamily={"sans-serif"}>Admin Account</Heading>
      <Text color={"#6f186b"}>Admin Info</Text>
      <form>
        <Stack spacing="6" w="40%" m="auto">
          <Center m="15px" mt="30px">
            <Image
              w="200px"
              borderRadius={"50%"}
              border={"solid 2px white"}
              src="https://avatars.githubusercontent.com/u/101392309?v=4"
              alt="pic"
            />
          </Center>
          <FormControl id="name" border={"solid 3px #e9d8fd"}>
            <Input
              name="name"
              value={adminData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormControl>
          <FormControl id="email" border={"solid 3px #e9d8fd"}>
            <Input
              name="email"
              value={adminData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormControl>
          <FormControl id="number" border={"solid 3px #e9d8fd"}>
            <Input
              type="number"
              name="number"
              value={adminData.number}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormControl>
          <FormControl id="password" border={"solid 3px #e9d8fd"}>
            <Input
              type="password"
              name="password"
              value={adminData.password}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormControl>
          {isEditing ? (
            <Flex justify="flex-end">
              <Button
                type="button"
                colorScheme="blue"
                mr="4"
                onClick={handleSaveClick}
              >
                Save
              </Button>
              <Button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Flex>
          ) : (
            <Button type="button" bgColor={"#64d66b"} onClick={handleEditClick}>
              Edit Information
            </Button>
          )}
        </Stack>
      </form>
    </Box>
  );
};

export default Info;
