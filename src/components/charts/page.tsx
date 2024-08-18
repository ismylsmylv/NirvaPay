"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchUserById } from "@/redux/slice/auth";
import { Box, Stack } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "react-tooltip/dist/react-tooltip.css";
import "./style.scss";

type Props = {};

type Userdatas = {
  notifications: any;
  crypto: any;
};

function Charts({}: Props) {
  const dispatch = useAppDispatch();
  const [numbers, setNumbers] = useState<number[]>([]);
  const userdatas: Userdatas[] = useAppSelector(
    (state) => state.auth.userdatas
  );

  const cryptos = [
    {
      name: "bitcoin",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png",
      balance: userdatas?.crypto?.bitcoin?.balance,
      address: userdatas?.crypto?.bitcoin?.address,
      short: "BTC",
    },
    {
      name: "ethereum",
      img: "https://i.pinimg.com/736x/de/49/55/de495504a51163548744bd1d7a0b499d.jpg",
      balance: userdatas?.crypto?.ethereum?.balance,
      address: userdatas?.crypto?.ethereum?.address,
      short: "ETH",
    },
    {
      name: "ton",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/The_open_network_logo.svg",
      balance: userdatas?.crypto?.ton?.balance,
      address: userdatas?.crypto?.ton?.address,
      short: "TON",
    },
  ];

  useEffect(() => {
    dispatch(fetchUserById());

    function generateRandomArray() {
      const array = [];
      for (let i = 0; i < 8; i++) {
        const randomNum = Math.floor(Math.random() * 10);
        array.push(randomNum);
      }
      setNumbers(array);
    }

    generateRandomArray();
    const intervalId = setInterval(generateRandomArray, 1000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="Charts container">
      <div className="heading">
        <h1>Cryptos</h1>
        <Link href={`/transactions`}>
          <MdOutlineKeyboardArrowRight size={30} color="white" />
        </Link>
      </div>
      <div className="charts">
        {cryptos.map((crypto) => (
          <Stack direction="row" sx={{ width: "100%" }} key={crypto.short}>
            <Box sx={{ flexGrow: 1 }}>
              <div className="head">
                <img src={crypto.img} alt="" />
                <p>{crypto.name}</p>
              </div>
              <SparkLineChart data={numbers} height={100} />
            </Box>
          </Stack>
        ))}
      </div>
    </div>
  );
}

export default Charts;
