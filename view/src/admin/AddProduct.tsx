import {
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  Alert,
  AlertIcon,
  CloseButton,
  AlertTitle,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function AddProduct({ route, category }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [features, setFeatures] = useState("");
  const toast = useToast();

  const men_women = {
    title: title,
    image: image,
    discount_price: Number(price),
    heading: brand,
    original_price: Number(price) + 500,
    discount: "",
    visible: true,
    cod: "",
    qunatity: 1,
    offer: "No Offer",
    availability: "",
    category: category,
  };

  const kid = {
    title: title,
    image: image,
    discount_price: Number(price),
    heading: brand,
    original_price: Number(price) + 200,
    discount: "",
    visible: true,
    cod: "",
    gender: gender,
    qunatity: 1,
    offer: "No Offer",
    category: category,
    rating: 4,
  };

  const elect = {
    title: title,
    image: image,
    discount_price: Number(price),
    visible: true,
    brand: brand,
    original_price: Number(price) + 5579,
    discount: "",
    processor: category === "Snapdragon 940" ? "3500mAh" : "",
    battery_life: category === "Phone" ? "3500mAh" : "",
    qunatity: 1,
    warranty: "2 Year's",
    features: features,
    total_ratings: "398492",
    reviews: "",
    cod: "",
    description: "",
    availability: "",
    category: category,
    rating: 4,
  };
  var payload: any;

  if (route === "mens" || route === "womens") {
    payload = men_women;
  }
  if (route === "kids") {
    payload = kid;
  }
  if (route === "electronics") {
    payload = elect;
  }

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const checker = () => {
    try {
      category === "All"
        ? toast({
            duration: 5000,
            isClosable: true,
            render: () => (
              <Alert
                status="warning"
                borderRadius="lg"
                bg="orange"
                color="white"
              >
                <AlertIcon />
                <AlertTitle mb={0} mr={2} fontSize="md">
                  Please Select Category First
                </AlertTitle>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            ),
          })
        : onOpen();
    } catch (err) {
      console.log(err);
    }
  };
  const sendData = async () => {
    try {
      const res = await fetch(
        `https://e-shop-215k.onrender.com/${route}/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      data.message === "Added in the DB"
        ? toast({
            duration: 5000,
            isClosable: true,
            render: () => (
              <Alert
                status="success"
                borderRadius="lg"
                bg="green"
                color="white"
              >
                <AlertIcon />
                <AlertTitle mb={0} mr={2} fontSize="md">
                  Successfully Added the Product
                </AlertTitle>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            ),
          })
        : toast({
            duration: 5000,
            isClosable: true,
            render: () => (
              <Alert status="error" borderRadius="lg" bg="red" color="white">
                <AlertIcon />
                <AlertTitle mb={0} mr={2} fontSize="md">
                  Not Added in the Database
                </AlertTitle>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            ),
          });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        width="140px"
        h="50px"
        borderRadius={""}
        backgroundColor="#e9d8fd"
        padding="12px"
        onClick={checker}
      >
        Add Product
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex gap="10px">
              ADD PRODUCT IN <Text color="blue">{route.toUpperCase()}</Text>{" "}
              COLLECTION
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} alignItems={"center"} display={"flex"}>
              <Input
                type="url"
                placeholder="Image URL"
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <Input
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <Input
                placeholder="Brand Name"
                onChange={(e) => setBrand(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <Input
                placeholder="Price"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
            {route === "kids" ? (
              <select
                onChange={(e) => setGender(e.target.value)}
                style={{
                  width: "140px",
                  padding: "10px",
                  margin: "auto",
                  marginTop: "10px",
                }}
              >
                <option>Select Gender</option>
                <option value="Boy">Boy</option>
                <option value="Girl">Girl</option>
              </select>
            ) : (
              ""
            )}
            {route === "electronics" ? (
              <FormControl mt={4}>
                <Input
                  placeholder="Features"
                  type="text"
                  onChange={(e) => setFeatures(e.target.value)}
                />
              </FormControl>
            ) : (
              ""
            )}

            <FormControl mt={4}>
              <Input placeholder="Category" value={category} readOnly />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={sendData}>
              Add Product
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
