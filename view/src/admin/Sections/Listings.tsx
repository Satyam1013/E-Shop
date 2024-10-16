import {
  ArrowBackIcon,
  ArrowForwardIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Center,
  FormControl,
  Input,
  ModalFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import AddProduct from "../AddProduct";

const Listings = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [route, setRoute] = useState("mens");
  const [category, setCategory] = useState("All");
  const [option, setOption] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState(0);

  const payload = {
    title: title,
    image: image,
    heading: route === "mens" || "womens" || "kids" ? brand : "",
    brand: route === "electronics" ? brand : "",
    discount_price: price,
  };

  const setDetails = (
    id: number,
    t: string,
    i: string,
    b: string,
    p: string
  ) => {
    setId(id);
    setTitle(t);
    setImage(i);
    setBrand(b);
    setPrice(p);
    setIsOpen(true);
  };

  const sendData = async () => {
    const updatedVisibility: any = items.map((item: any) => {
      if (item._id === id) {
        return { ...item, payload };
      }
      return item;
    });
    setItems(updatedVisibility);
    try {
      const res = await fetch(
        `https://e-shop-215k.onrender.com/${route}/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setIsOpen(false);
  };
  const getData = async () => {
    try {
      const res = await fetch(
        `https://e-shop-215k.onrender.com/${route}?category=${category}&search=${search}&page=${page}&limit=10`
      );
      const data = await res.json();
      setOption(data.category);
      if (route === "mens") {
        setItems(data.men);
      } else if (route === "womens") {
        setItems(data.women);
      } else if (route === "kids") {
        setItems(data.kid);
      } else if (route === "electronics") {
        setItems(data.electronics);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleVisibility = async (el: any) => {
    setVisible(!visible);
    const updatedVisibility: any = items.map((item: any) => {
      if (item._id === el._id) {
        return { ...item, visible: !el.visible };
      }
      return item;
    });
    setItems(updatedVisibility);
    try {
      const res = await fetch(
        `https://e-shop-215k.onrender.com/${route}/update/${el._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ visible: !el.visible }),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getData();
  }, [route, search, category, page, loading, items]);

  return (
    <>
      {loading ? (
        <Center m="50px">
          <Image src="/loader.gif" alt="loader" />
        </Center>
      ) : (
        <Box>
          <Heading m="20px">{route.toUpperCase()} PRODUCTS</Heading>
          <Flex
            justifyContent={"space-between"}
            m="auto"
            gap="10px"
            w="95%"
            alignItems={"center"}
            mt="2rem"
          >
            <Flex
              w={{ base: "100%", md: "60%", lg: "30%" }}
              alignItems={"center"}
              border={"solid 1px pink"}
              h={"50px"}
            >
              <Box
                ml="20px"
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <DebounceInput
                style={{
                  marginLeft: "20px",
                  width: "100%",
                  border: "none",
                  borderColor: "transparent",
                  padding: "10px",
                  outline: "none",
                }}
                debounceTimeout={2000}
                value={search}
                placeholder={`Search in ${route}-collection`}
                onChange={handleChange}
              />
            </Flex>
            <Box>
              <Flex gap="20px">
                
               
                  <AddProduct route={route} category={category} />
                
                <select
                  onChange={(e) => setRoute(e.target.value)}
                  style={{
                    width: "140px",
                    backgroundColor: "#e9d8fd",
                    padding: "12px",
                  }}
                >
                  <option value={"mens"}>Mens</option>
                  <option value={"womens"}>Womens</option>
                  <option value={"kids"}>Kids</option>
                  <option value={"electronics"}>Electronics</option>
                </select>

                <select
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: "140px",
                    backgroundColor: "#e9d8fd",
                    padding: "12px",
                  }}
                >
                  {option.map((el, i) => (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </Flex>
            </Box>
          </Flex>
          <Box mt="40px">
            <Flex
              w="95%"
              m={"auto"}
              justifyContent={"space-around"}
              border={"solid 3px #e9d8fd"}
              fontWeight={"600"}
            >
              <Text w="10%">PRODUCT ID</Text>
              <Text w="20%">IMAGE</Text>
              <Text w="30%">TITLE</Text>
              <Text w="10%">PRICE</Text>
              <Text w="20%">CATEGORY</Text>
              <Text w="10%">STATUS</Text>
            </Flex>
            {items.map((el: any, i: number) => (
              <Flex
                key={i}
                justifyContent={"space-around"}
                w="95%"
                m={"auto"}
                mt="15px"
                p="10px"
                border={"solid 1px #e9d8fd"}
                alignItems={"center"}
                cursor={"pointer"}
              >
                <EditIcon
                  onClick={() =>
                    setDetails(
                      el._id,
                      el.title,
                      el.image,
                      el.heading,
                      el.discount_price
                    )
                  }
                />
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                  <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalBody>
                      <FormControl mt={4}>
                        <FormLabel>Image</FormLabel>
                        <Input
                          placeholder="Image"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                          // readOnly
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Title</FormLabel>

                        <Input
                          placeholder="Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Brand</FormLabel>

                        <Input
                          placeholder="Heading"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Price</FormLabel>

                        <Input
                          placeholder="Price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={sendData}>
                        Save Product
                      </Button>
                      <Button onClick={() => setIsOpen(false)}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                <Text w="8%">{el._id.slice(-8)}</Text>
                <Flex justifyContent={"center"} w="25%" m="auto">
                  <Image w="60px" src={el.image} alt="prod-img" />
                </Flex>
                <Text w="28%">{el.title}</Text>
                <Text w="10%">₹ {el.discount_price}</Text>
                <Text w="20%">{el.category}</Text>
                {el.visible === true ? (
                  <Button
                    bgColor={"green"}
                    color="white"
                    onClick={() => handleVisibility(el)}
                    w="10%"
                  >
                    Active
                  </Button>
                ) : (
                  <Button
                    color="white"
                    bgColor={"red"}
                    onClick={() => handleVisibility(el)}
                    w="10%"
                  >
                    Inactive
                  </Button>
                )}
              </Flex>
            ))}
          </Box>
          <Flex
            gap="20px"
            justifyContent={"center"}
            m="auto"
            mt="30px"
            pb="30px"
          >
            <Button
              color={"#f24973"}
              leftIcon={<ArrowBackIcon />}
              isDisabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Button isDisabled color={"#f24973"} disabled>
              {page}
            </Button>
            <Button
              color={"#f24973"}
              rightIcon={<ArrowForwardIcon />}
              isDisabled={page === 13}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default Listings;
