import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { email } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    card_no: "",
    card_name: "",
    expiry: "",
    cvv: "",
  });
  const toast = useToast();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleOrder = () => {
    if (
      formData.name === "" ||
      formData.phone === "" ||
      formData.address === "" ||
      formData.city === "" ||
      formData.card_no === "" ||
      formData.card_name === "" ||
      formData.expiry === "" ||
      formData.cvv === "" ||
      formData.zip === ""
    ) {
      toast({
        duration: 5000,
        isClosable: true,
        render: () => (
          <Alert status="error" borderRadius="lg" bg="red" color="white">
            <AlertIcon />
            <AlertTitle mb={0} mr={2} fontSize="md">
              Fill all the details in the form correctly!
            </AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        ),
      });
    } else {
      toast({
        duration: 3000,
        isClosable: true,
        render: () => (
          <Alert
            status="success"
            borderRadius="lg"
            bg="green.500"
            color="white"
          >
            <AlertIcon />
            <AlertTitle mb={0} mr={2} fontSize="md">
              Your order has been placed successfully
            </AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        ),
      });
      navigate("/");
    }
  };
  return (
    <Box w="95%" mx="auto" py="12" px={{ base: "6", lg: "8" }}>
      <Box
        display={{ base: "block", lg: "flex" }}
        justifyContent={"center"}
        gap="5%"
      >
        <Box
          w={{ base: "100%", lg: "40%" }}
          bg="white"
          shadow="lg"
          rounded="lg"
          p="6"
        >
          <Text fontSize="2xl" fontWeight="semibold" mb="4">
            Shipping Information
          </Text>
          <Stack spacing="4">
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" onChange={handleInputChange} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email Address</FormLabel>
              <Input type="email" value={email} readOnly />
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Phone Number</FormLabel>
              <Input type="number" name="phone" onChange={handleInputChange} />
            </FormControl>
            <FormControl id="address">
              <FormLabel>Address</FormLabel>
              <Input type="text" name="address" onChange={handleInputChange} />
            </FormControl>
            <FormControl id="city">
              <FormLabel>City</FormLabel>
              <Input type="text" name="city" onChange={handleInputChange} />
            </FormControl>
            <FormControl id="country">
              <FormLabel>Country</FormLabel>
              <Select placeholder="Select country">
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
                <option>Colombia</option>
                <option>Croatia</option>
                <option>Cyprus</option>
                <option>Czech Republic</option>
                <option>Denmark</option>
                <option>Egypt</option>
                <option>Estonia</option>
                <option>Finland</option>
                <option>France</option>
                <option>Germany</option>
                <option>Greece</option>
                <option>Hungary</option>
                <option>Iceland</option>
                <option>India</option>
                <option>Indonesia</option>
                <option>Ireland</option>
                <option>Israel</option>
                <option>Italy</option>
                <option>Jamaica</option>
                <option>Japan</option>
                <option>Jordan</option>
                <option>Kazakhstan</option>
                <option>Kenya</option>
                <option>Latvia</option>
                <option>Lebanon</option>
                <option>Lithuania</option>
                <option>Luxembourg</option>
                <option>Malaysia</option>
                <option>Maldives</option>
                <option>Mexico</option>
                <option>Morocco</option>
                <option>Netherlands</option>
                <option>New Zealand</option>
                <option>Nigeria</option>
                <option>Norway</option>
                <option>Pakistan</option>
                <option>Peru</option>
                <option>Philippines</option>
                <option>Poland</option>
                <option>Portugal</option>
                <option>Puerto Rico</option>
                <option>Romania</option>
                <option>Russia</option>
                <option>Saudi Arabia</option>
                <option>Singapore</option>
                <option>Slovakia</option>
                <option>Slovenia</option>
                <option>South Africa</option>
                <option>South Korea</option>
                <option>Spain</option>
                <option>Sri Lanka</option>
                <option>Sweden</option>
                <option>Switzerland</option>
                <option>Taiwan</option>
                <option>Thailand</option>
                <option>Tunisia</option>
                <option>Turkey</option>
                <option>Ukraine</option>
                <option>United Arab Emirates</option>
                <option>United Kingdom</option>
                <option>Uruguay</option>
                <option>Vietnam</option>
              </Select>
            </FormControl>
            <FormControl id="zip">
              <FormLabel>ZIP Code</FormLabel>
              <Input type="number" name="zip" onChange={handleInputChange} />
            </FormControl>
          </Stack>
        </Box>

        <Box
          w={{ base: "100%", lg: "40%" }}
          bg="white"
          shadow="lg"
          rounded="lg"
          p="6"
          mt="8"
        >
          <Text fontSize="2xl" fontWeight="semibold" mb="4">
            Payment Information
          </Text>
          <Stack spacing="4">
            <FormControl id="cardNumber">
              <FormLabel>Card Number</FormLabel>
              <Input
                type="number"
                name="card_no"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="cardName">
              <FormLabel>Cardholder Name</FormLabel>
              <Input
                type="text"
                name="card_name"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="expiry">
              <FormLabel>Expiry Date</FormLabel>
              <Input
                type="number"
                name="expiry"
                onChange={handleInputChange}
                placeholder="MM / YY"
              />
            </FormControl>
            <FormControl id="cvv">
              <FormLabel>CVV</FormLabel>
              <Input type="text" name="cvv" onChange={handleInputChange} />
            </FormControl>
          </Stack>
        </Box>
      </Box>
      <Box mt="8">
        <Button colorScheme="blue" size="lg" width="85%" onClick={handleOrder}>
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
