import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useToast,
  Alert,
  AlertIcon,
  CloseButton,
  AlertTitle,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { MenProducts } from "../../utils/types";
import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  sortByCategory,
  sortByJeans,
  sortByShoes,
  sortByTshirt,
  sortByWatches,
} from "../../config/menData";
import { DebounceInput } from "react-debounce-input";
import { useSearchParams } from "react-router-dom";

const MenProductPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState<string | number>(20);

  const memoizedSearchParams: any = useMemo(() => searchParams, [searchParams]);
  const sortBy = memoizedSearchParams.getAll("sortBy") || "";
  const orderBy = memoizedSearchParams.getAll("order");
  const category = memoizedSearchParams.getAll("category");
  const brand = memoizedSearchParams.getAll("brand");
  const [sortByBrand, setBrand] = useState("All");
  const [order, setOrder] = useState(orderBy || "");
  const [categoryBy, setCategoryBy] = useState("All");
  const toast = useToast();

  const categorySet = (e: any) => {
    setSearchParams({ category: e.target.value, brand, sortBy, orderBy });
    setCategoryBy(e.target.value);
  };

  const brandSet = (e: any) => {
    setSearchParams({ category, brand: e.target.value, sortBy, orderBy });
    setBrand(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const selectSortName = (e: any) => {
    setSearchParams({
      category,
      brand,
      sortBy: e.target.value,
      orderBy: "asc",
    });
  };
  const selectOrder = (e: any) => {
    sortByBrand === "All"
      ? toast({
          duration: 5000,
          isClosable: true,
          render: () => (
            <Alert status="warning" borderRadius="lg" bg="orange" color="white">
              <AlertIcon />
              <AlertTitle mb={0} mr={2} fontSize="md">
                Please Select Category First
              </AlertTitle>
              <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
          ),
        })
      : setSearchParams({
          category,
          brand,
          sortBy,
          order: e.target.value,
        });
    setOrder(orderBy);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://e-shop-215k.onrender.com/mens?page=${page}&limit=${limit}&category=${category}&brand=${sortByBrand}&sort=${sortBy},${order}&search=${search}`
        );
        setData(res.data.men);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [page, limit, categoryBy, sortByBrand, search, order]);

  return (
    <>
      {loading ? (
        <Center m="50px">
          <Image src="/loader.gif" alt="loader" />
        </Center>
      ) : (
        <Box>
          <Flex
            w="95%"
            flexDirection={{ base: "column", md: "row" }}
            alignItems={"center"}
          >
            <Box>
              <Link href={"/mens"}>
                <Heading color={"#f24973"} m="25px">
                  MENS COLLECTION
                </Heading>
              </Link>
            </Box>
            <Flex
              w={{ base: "100%", md: "60%", lg: "75%" }}
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
                placeholder="Search in Men-Collection"
                onChange={handleChange}
              />
            </Flex>
          </Flex>
          <Flex
            w="98%"
            m="auto"
            gap={{ base: 2, lg: 5 }}
            justifyContent={"center"}
          >
            <Box
              boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
              w={{ base: "25%", lg: "20%" }}
              display={"flex"}
              flexDirection={"column"}
              mt="20px"
            >
              <Text
                fontWeight={"bold"}
                mt="20px"
                fontSize={{ base: "20px", lg: "25px" }}
                color={"#f24973"}
              >
                FILTERS
              </Text>
              <Box bgColor={"gray.100"} p="20px" mt="15px" lineHeight={"30px"}>
                <Text
                  color={"#f24973"}
                  fontSize={{ base: "12px", lg: "15px" }}
                  mb="10px"
                  fontWeight={"600"}
                >
                  ITEMS PER PAGE
                </Text>
                <hr />
                <Flex justifyContent={"center"} m="auto" gap="10px">
                  <select
                    onChange={(e) => setLimit(e.target.value)}
                    style={{ width: "80px" }}
                  >
                    <option value={25}>Default</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                  </select>
                </Flex>
              </Box>
              <Box bgColor={"gray.100"} p="20px" mt="15px" lineHeight={"30px"}>
                <Text
                  color={"#f24973"}
                  fontSize={{ base: "12px", lg: "15px" }}
                  mb="10px"
                  fontWeight={"600"}
                >
                  SORT BY CATEGORY
                </Text>
                <hr />
                {sortByCategory.map((product, i) => (
                  <Flex
                    key={i}
                    justifyContent={"space-between"}
                    m="auto"
                    gap="10px"
                    w="80%"
                  >
                    <Text fontSize={{ base: "10px", md: "12px", lg: "15px" }}>
                      {product}
                    </Text>
                    <input
                      type="checkbox"
                      value={product}
                      checked={category[0] === product}
                      onChange={categorySet}
                    />
                  </Flex>
                ))}
              </Box>
              <Box bgColor={"gray.100"} p="20px" mt="15px" lineHeight={"30px"}>
                <Text
                  color={"#f24973"}
                  fontSize={{ base: "12px", lg: "15px" }}
                  mb="10px"
                  fontWeight={"600"}
                >
                  SORT BY BRAND
                </Text>
                <hr />

                <Flex
                  justifyContent={"center"}
                  w={{ lg: "83%" }}
                  alignItems={"center"}
                  gap="10px"
                  mt="10px"
                >
                  <Text
                    color="blue"
                    fontSize={{ base: "8px", md: "10px", lg: "13px" }}
                  >
                    Shirts & T-Shirts Brands
                  </Text>
                  <ArrowDownIcon />
                </Flex>
                <hr />
                {sortByTshirt.map((product: any, i: number) => (
                  <Flex
                    w="80%"
                    key={i}
                    justifyContent={"space-between"}
                    m="auto"
                    gap="10px"
                  >
                    <Text fontSize={{ base: "10px", md: "12px", lg: "15px" }}>
                      {product}
                    </Text>
                    <input
                      type="radio"
                      value={product}
                      checked={brand[0] === product}
                      onChange={brandSet}
                    />
                  </Flex>
                ))}
                <Flex
                  justifyContent={"center"}
                  w={{ lg: "79%" }}
                  alignItems={"center"}
                  gap="10px"
                  mt="10px"
                >
                  <Text
                    color="blue"
                    fontSize={{ base: "8px", md: "10px", lg: "13px" }}
                  >
                    Pants & Jeans Brands
                  </Text>
                  <ArrowDownIcon />
                </Flex>
                <hr />
                {sortByJeans.map((product, i: number) => (
                  <Flex
                    w="80%"
                    key={i}
                    justifyContent={"space-between"}
                    m="auto"
                    gap="10px"
                  >
                    <Text fontSize={{ base: "10px", md: "12px", lg: "15px" }}>
                      {product}
                    </Text>
                    <input
                      type="radio"
                      value={product}
                      checked={brand[0] === product}
                      onChange={brandSet}
                    />
                  </Flex>
                ))}
                <Flex
                  justifyContent={"center"}
                  w={{ lg: "86%" }}
                  alignItems={"center"}
                  mt="10px"
                  gap="10px"
                >
                  <Text
                    color="blue"
                    fontSize={{ base: "8px", md: "10px", lg: "13px" }}
                  >
                    Shoes & Sandals Brands
                  </Text>
                  <ArrowDownIcon />
                </Flex>
                <hr />
                {sortByShoes.map((product, i: number) => (
                  <Flex
                    w="80%"
                    key={i}
                    justifyContent={"space-between"}
                    m="auto"
                    gap="10px"
                  >
                    <Text fontSize={{ base: "10px", md: "12px", lg: "15px" }}>
                      {product}
                    </Text>
                    <input
                      type="radio"
                      value={product}
                      checked={brand[0] === product}
                      onChange={brandSet}
                    />
                  </Flex>
                ))}
                <Flex
                  justifyContent={"center"}
                  w={{ lg: "67%" }}
                  alignItems={"center"}
                  mt="10px"
                  gap="10px"
                >
                  <Text
                    color="blue"
                    fontSize={{ base: "8px", md: "10px", lg: "13px" }}
                  >
                    Watches Brands
                  </Text>
                  <ArrowDownIcon />
                </Flex>
                <hr />
                {sortByWatches.map((product: any, i: number) => (
                  <Flex
                    w="80%"
                    key={i}
                    justifyContent={"space-between"}
                    m="auto"
                    gap="10px"
                  >
                    <Text fontSize={{ base: "10px", md: "12px", lg: "15px" }}>
                      {product}
                    </Text>
                    <input
                      type="radio"
                      value={product}
                      checked={brand[0] === product}
                      onChange={brandSet}
                    />
                  </Flex>
                ))}
              </Box>
              <Box bgColor={"gray.100"} p="20px" mt="15px" lineHeight={"30px"}>
                <Text
                  color={"#f24973"}
                  fontSize={{ base: "12px", lg: "15px" }}
                  mb="10px"
                >
                  SORT BY PRICE, NAME
                </Text>
                <hr />
                <Flex
                  justifyContent={"center"}
                  flexDirection={{ base: "column", md: "row" }}
                  m="auto"
                  gap="10px"
                >
                  <select onChange={selectSortName} style={{ width: "80px" }}>
                    <option>Sort By</option>
                    <option value="heading">Name</option>
                    <option value="discount_price">Price</option>
                  </select>

                  <select onChange={selectOrder} style={{ width: "80px" }}>
                    <option>Order</option>
                    <option value="asc">High to Low</option>
                    <option value="desc">Low to High</option>
                  </select>
                </Flex>
              </Box>
            </Box>

            <Box
              w={{ base: "70%", lg: "75%" }}
              display={"grid"}
              gridTemplateColumns={{
                base: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
                lg: "repeat(4,1fr)",
              }}
              justifyContent={"center"}
              gap={{ base: "0px", lg: "20px" }}
            >
              {data.map((product: MenProducts) => (
                <>
                  {product.visible === true ? (
                    <Box
                      p={{ base: "2px", lg: "20px" }}
                      borderRadius={"10%"}
                      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
                      m="auto"
                      mt="25px"
                      h={{ base: "265px", md: "375px", lg: "470px" }}
                      cursor={"pointer"}
                      transition="all 0.4s ease-in-out"
                      _hover={{
                        transform: "scale(1.02)",
                        boxShadow: "rgba(99, 99, 99, 0.4) 0px 4px 16px 0px",
                      }}
                    >
                      <Link href={`/mens/${product._id}`}>
                        <Image
                          m="auto"
                          w={{ base: "100px", md: "180px", lg: "200px" }}
                          h={{ base: "150px", md: "250px", lg: "270px" }}
                          src={product.image}
                          alt="product_img"
                        />
                        <Heading
                          m="auto"
                          textAlign={"center"}
                          mt="5px"
                          fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                          color={"#f24973"}
                        >
                          {product.heading}
                        </Heading>
                      </Link>
                      <Flex
                        justifyContent={"center"}
                        w={{ base: "100px", md: "180px", lg: "200px" }}
                        m="auto"
                      >
                        <Text
                          m="auto"
                          whiteSpace={"nowrap"}
                          overflow={"hidden"}
                          textAlign={"center"}
                          w={{ base: "90px", md: "180px", lg: "250px" }}
                          fontSize={{ base: "12px", md: "14px", lg: "16.5px" }}
                        >
                          {product.title}
                        </Text>
                        <Text
                          ml="-7px"
                          w={{ base: "10px", md: "10px", lg: "30px" }}
                        >
                          ..
                        </Text>
                      </Flex>
                      <Text
                        fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                        color="green"
                      >
                        {product.discount}
                      </Text>
                      <Flex justifyContent={"center"} gap="15px">
                        <Text
                          fontSize={{ base: "12px", md: "15px", lg: "18px" }}
                          fontWeight={"600"}
                        >
                          ₹{product.discount_price}
                        </Text>
                        <Text
                          fontSize={{ base: "12px", md: "15px", lg: "18px" }}
                          color="red"
                          textDecoration={"line-through"}
                          fontWeight={"600"}
                        >
                          ₹{product.original_price}
                        </Text>
                      </Flex>

                      <Text
                        fontSize={{ base: "10px", md: "14px", lg: "16.5px" }}
                      >
                        {product.offer}
                      </Text>
                      {product.availability === "" ? (
                        ""
                      ) : (
                        <Text
                          color="red"
                          fontSize={{ base: "12px", lg: "16.5px" }}
                        >
                          {product.availability}
                        </Text>
                      )}
                    </Box>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </Box>
          </Flex>
          <Flex gap="20px" justifyContent={"center"} m="auto" mt="30px">
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

export default MenProductPage;
