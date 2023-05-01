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
  speed: 500,
  autoplaySpeed: 5000,
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
      text: "Buy Trending Brand new T-shirts, Shirts, Jeans, Pants, Shoes, Flip-Flops & Watches",
      image: "men_collection.jpg",
    },
    {
      title: "Women Collection",
      text: "Buy Trending Brand new Western wears, Ethnic wears, Shirts, Pants, Sandals & Watches",
      image: "women_collection.jpg",
    },
    {
      title: "Electronic Items",
      text: "Buy Branded electronic items like Mobile Phones, Television, Laptops etc. in best price",
      image: "electonics.jpeg",
    },
    {
      title: "Baby Cloths",
      text: "Buy Funcky & comfortable baby cloths of girls & boys.",
      image: "baby_clothes.png",
    },
    {
      title: "Baby Toys",
      text: "Buy Baby Toys so much variety with quality.",
      image: "baby_toys.jpg",
    },
    {
      title: "Brand New Shoes",
      text: "Buy Best Shoes here like Nike Jordan Addition, Puma, Reebok, Adidas & many more.",
      image: "shoes.webp",
    },
    {
      title: "Premium Watches",
      text: "Buy the most affortable + luxury watches",
      image: "watch_collection.jpg",
    },
  ];

  return (
    <Box
      position={"relative"}
      height={{base:'250px',lg:"430px"}}
      width={"full"}
      overflow={"hidden"}
      zIndex={-1}
      mt='20px'
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
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={{base:'180px',lg:"sm"}}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            {/* This is the block you need to change, to customize the caption */}
            <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={6}
                w={"full"}
                maxW={"lg"}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
              >
                <Heading
                  color={"#f24973"}
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  borderRadius={"40%"}
                  textShadow={"1px 1px 3px white"}
                  fontFamily={'sans-serif'}
                >
                  {card.title}
                </Heading>
                <Text
                  // bgColor={"#f24973"}
                  color="white"
                  textShadow={"1px 1px 2px #f24973"}
                  fontSize={{ base: "md", lg: "lg" }}
                  borderRadius={"20%"}
                  fontFamily={'sans-serif'}
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
