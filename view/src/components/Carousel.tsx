import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 800,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  const cards = [
    {
      title: "Men Collection",
      text: "Explore trending T-shirts, Shirts, Jeans, and more.",
      image: "men_collection.jpg",
    },
    {
      title: "Women Collection",
      text: "Find stylish western and ethnic wear for every occasion.",
      image: "women_collection.jpg",
    },
    {
      title: "Electronic Items",
      text: "Get branded electronics at unbeatable prices.",
      image: "electonics.jpeg",
    },
    {
      title: "Baby Clothes",
      text: "Discover funky and comfortable clothes for kids.",
      image: "baby_clothes.png",
    },
    {
      title: "Premium Watches",
      text: "Upgrade your style with luxury and affordable watches.",
      image: "watch_collection.jpg",
    },
  ];

  return (
    <Box
      position={"relative"}
      height={{ base: "250px", lg: "500px" }}
      width={"full"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="solid"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        bg="rgba(255, 255, 255, 0.8)"
        color="black"
        _hover={{ bg: "black", color: "white" }}
        onClick={() => slider?.slickPrev()}
        borderRadius="full"
        boxShadow="lg"
      >
        <BiLeftArrowAlt size="24px" />
      </IconButton>

      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="solid"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        bg="rgba(255, 255, 255, 0.8)"
        color="black"
        _hover={{ bg: "black", color: "white" }}
        onClick={() => slider?.slickNext()}
        borderRadius="full"
        boxShadow="lg"
      >
        <BiRightArrowAlt size="24px" />
      </IconButton>

      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={{ base: "200px", lg: "500px" }}
            position="relative"
            background={`url(${card.image})`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            boxShadow="0 10px 30px rgba(0, 0, 0, 0.5)"
          >
            <Container size="container.lg" height="100%" position="relative">
              <Stack
                spacing={6}
                w={"full"}
                maxW={"lg"}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
                color="white"
                textAlign="left"
                textShadow="0 2px 5px rgba(0, 0, 0, 0.8)"
              >
                <Heading
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  bgGradient="linear(to-r, #ff5e78, #ffb6c1, #ffe4e1, #ffffff)"
                  bgClip="text"
                  fontWeight="bold"
                >
                  {card.title}
                </Heading>
                <Text
                  fontSize={{ base: "md", lg: "lg" }}
                  bg="rgba(0, 0, 0, 0.6)"
                  px={4}
                  py={2}
                  borderRadius="md"
                >
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
