"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchUserById } from "@/redux/slice/auth";
import { Box, Stack } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { formatDistanceToNow, parseISO } from "date-fns";
import Link from "next/link";
import { useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "react-tooltip/dist/react-tooltip.css";
import "./style.scss";
type Props = {};
type Userdatas = {
  notifications: any;
};
function Charts({}: Props) {
  const dispatch = useAppDispatch();
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
  let i = 0;
  useEffect(() => {
    dispatch(fetchUserById());
  }, []);
  return (
    <div className="Charts container">
      {/* <button
        onClick={async () => {
          await fetch(
            new Request("https://api.livecoinwatch.com/coins/single"),
            {
              method: "POST",
              headers: new Headers({
                "content-type": "application/json",
                "x-api-key": "2c4f4eb2-744a-4451-82c9-97f6cdaf36ce",
              }),
            }
          ).then((res) => {
            console.log(res);
          });
        }}
      >
        chart
      </button> */}
      <div className="heading">
        <h1>Cryptos</h1>
        <Link href={`/transactions`}>
          <MdOutlineKeyboardArrowRight size={30} color="white" />
        </Link>
      </div>
      <div className="charts">
        {cryptos.map((crypto) => {
          return (
            <Stack direction="row" sx={{ width: "100%" }} key={"result"}>
              <Box sx={{ flexGrow: 1 }}>
                <div className="head">
                  <img src={crypto.img} alt="" />
                  <p>{crypto.name}</p>
                </div>
                <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6]} height={100} />
              </Box>
            </Stack>
          );
        })}
      </div>
    </div>
  );
}

export default Charts;
