import { useState, useEffect } from "react";
import { Box, Button, Heading, Text, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Cart } from "../../utils/types";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);

  const getData = async () => {
    try {
      const res = await fetch("https://e-shop-215k.onrender.com/carts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("e-book token")}`,
        },
      });
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleInc = (itemId: any) => {
    const updatedCartItems: any = cartItems.map((item: any) => {
      if (item._id === itemId._id) {
        return { ...item, qunatity: item.qunatity + 1 };
      } else {
        return item;
      }
    });
    setCartItems(updatedCartItems);

    fetch(`https://e-shop-215k.onrender.com/carts/update/${itemId._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `${localStorage.getItem("e-book token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ qunatity: itemId.qunatity + 1 }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleDec = (itemId: any) => {
    const updatedCartItems: any = cartItems.map((item: Cart) => {
      if (item._id === itemId._id) {
        return { ...item, qunatity: item.qunatity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);

    fetch(`https://e-shop-215k.onrender.com/carts/update/${itemId._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("e-book token")}`,
      },
      body: JSON.stringify({ qunatity: itemId.qunatity - 1 }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const totalPrice = cartItems.reduce(
    (accumulator: any, currentItem: any) =>
      accumulator + currentItem.discount_price * currentItem.qunatity,
    0
  );

  const handleRemoveItem = (itemId: any) => {
    const updatedCartItems = cartItems.filter(
      (item: any) => item._id !== itemId._id
    );
    setCartItems(updatedCartItems);
    fetch(`https://e-shop-215k.onrender.com/carts/delete/${itemId._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem("e-book token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Box p={4} maxW="75%" mx="auto">
      <Heading mb={4}>Your Cart</Heading>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item: Cart, i: number) => (
            <Box key={i}>
              <Flex
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
                mb={4}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={{ base: "column", md: "row" }}
                backdropFilter="blur(6px)"
                transition="transform 0.3s ease, box-shadow 0.3s ease"
                _hover={{ transform: "scale(1.02)", boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)" }}
              >
                <Image w="90px" h="90px" src={item.image} alt="cart element" />
                <Box
                  w={{ base: "200px", md: "250px", lg: "500px" }}
                  m={{ base: "10px" }}
                >
                  <Text
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    fontWeight="semibold"
                  >
                    {item.title}
                  </Text>
                </Box>
                <Box>
                  <Button
                    bgColor={"green"}
                    h="30px"
                    w="10px"
                    color="white"
                    _hover={{ bgColor: "green.400" }}
                    onClick={() => handleInc(item)}
                  >
                    +
                  </Button>
                  <Button
                    bgColor={"red"}
                    h="30px"
                    w="10px"
                    color="white"
                    _hover={{ bgColor: "red.300" }}
                    isDisabled={item.qunatity === 1}
                    onClick={() => handleDec(item)}
                  >
                    -
                  </Button>
                  <Text fontSize="md" color="gray.500" mb={2}>
                    Quantity: {item.qunatity}
                  </Text>
                </Box>
                <Text fontSize="md" color="gray.500" mb={2}>
                  Price: ₹ {item.discount_price}
                </Text>
                <Button
                  variant="outline"
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleRemoveItem(item)}
                >
                  Remove
                </Button>
              </Flex>
            </Box>
          ))}
          <Box mb={4}>
            <Text fontSize="xl" fontWeight="semibold" mb={2}>
              Total Price: ₹ {totalPrice}
            </Text>
            <Link to="/checkout">
              <Button colorScheme="blue">Checkout</Button>
            </Link>
          </Box>
        </>
      ) : (
        <Text>Your cart is empty</Text>
      )}
    </Box>
  );
};

export default CartPage;
