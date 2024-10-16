import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [elec, setElec] = useState(0);
  const [mens, setMens] = useState(0);
  const [womens, setWomens] = useState(0);
  const [kid, setKid] = useState(0);
  const totalProducts = mens + womens + elec + kid;
  const getDataElectronic = async () => {
    await axios
      .get(`https://e-shop-215k.onrender.com/electronics`)
      .then((res: AxiosResponse) => {
        setElec(res.data.items);
      })
      .catch((err) => console.log(err));
  };
  const getDataMens = async () => {
    await axios
      .get(`https://e-shop-215k.onrender.com/mens`)
      .then((res: AxiosResponse) => {
        setMens(res.data.items);
      })
      .catch((err) => console.log(err));
  };
  const getDataWomens = async () => {
    await axios
      .get(`https://e-shop-215k.onrender.com/womens`)
      .then((res: AxiosResponse) => {
        setWomens(res.data.items);
      })
      .catch((err) => console.log(err));
  };
  const getDataKid = async () => {
    await axios
      .get(`https://e-shop-215k.onrender.com/kids`)
      .then((res: AxiosResponse) => {
        setKid(res.data.items);
      })
      .catch((err) => console.log(err));
  };

  const data = {
    labels: ["MENS", "WOMENS", "KIDS", "ELECTRONICS"],
    datasets: [
      {
        label: "Total Products: ",
        data: [mens, womens, kid, elec],
        backgroundColor: ["#B7791F", "teal", "gold", "#00B5D8"],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    getDataElectronic();
    getDataMens();
    getDataKid();
    getDataWomens();
  }, []);
  return (
    <>
      <Box w="700px" m="30px" ml="240px">
        <Doughnut data={data} />;
        <Box position={"absolute"} mt="-28%" ml="18%">
          <Text
            fontSize={"18px"}
            fontWeight={"bold"}
            color={"purple"}
            fontFamily={"sans-serif"}
          >
            Total Products Listed{" "}
          </Text>
          <Heading color="red" fontSize={"45px"}>
            {totalProducts}
          </Heading>
        </Box>
        <Text
          fontWeight={"600"}
          color="red.100"
          fontSize={"25px"}
          position={"absolute"}
          mt="-39%"
          ml="33%"
        >
          {Math.ceil((mens / totalProducts) * 100)} %
        </Text>
        <Text
          fontWeight={"600"}
          color="red.300"
          fontSize={"25px"}
          position={"absolute"}
          mt="-11%"
          ml="14%"
        >
          {Math.floor((kid / totalProducts) * 100)} %
        </Text>
        <Text
          fontWeight={"600"}
          color="red.100"
          fontSize={"25px"}
          position={"absolute"}
          mt="-32%"
          ml="6%"
        >
          {Math.ceil((elec / totalProducts) * 100)} %
        </Text>
        <Text
          fontWeight={"600"}
          color="red.100"
          fontSize={"25px"}
          position={"absolute"}
          mt="-15%"
          ml="35%"
        >
          {Math.floor((womens / totalProducts) * 100)} %
        </Text>
      </Box>
    </>
  );
}
