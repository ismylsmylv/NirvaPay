"use client";
import { app } from "@/lib/firebase/config";
import React, { useState } from "react";
import "./style.scss";
import Image from "next/image";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { FaClipboard } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
type Props = {
  userdatas: any;
};

function SettingsAddress({ userdatas }: Props) {
  const [btc, setbtc] = useState("");
  const [eth, seteth] = useState("");
  const [ton, setton] = useState("");
  const notify = (alert: any) => toast(alert);
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
  return (
    <section className="SettingsAddress">
      <ToastContainer style={{ color: "black" }} autoClose={4000} />
      <h1>Addresses</h1>
      {/* <p>{JSON.stringify(userdatas)}</p> */}
      <div className="cards flex flex-wrap gap-2 my-5">
        {cryptos.map((cryptoAddress) => {
          return (
            <div className="row rounded" key={cryptoAddress.name}>
              <div className="info">
                <Image src={cryptoAddress.img} alt="" height={50} width={50} />
                <p>{cryptoAddress.name}</p>
              </div>
              <div className="flex gap-1">
                <input
                  type="text"
                  placeholder={
                    userdatas?.crypto?.[cryptoAddress?.name].address ||
                    "enter address"
                  }
                  value={
                    cryptoAddress.name == "bitcoin"
                      ? btc
                      : cryptoAddress.name == "ethereum"
                      ? eth
                      : cryptoAddress.name == "ton"
                      ? ton
                      : ""
                  }
                  onChange={(e) => {
                    cryptoAddress.name == "bitcoin"
                      ? setbtc(e.target.value)
                      : cryptoAddress.name == "ethereum"
                      ? seteth(e.target.value)
                      : cryptoAddress.name == "ton"
                      ? setton(e.target.value)
                      : "";
                  }}
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      userdatas?.crypto?.[cryptoAddress?.name].address
                    );
                    notify("Address copied to clipboard");
                  }}
                >
                  <FaClipboard fill="gray" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        className="updateBtn"
        variant="contained"
        onClick={() => {
          const db = getFirestore(app);
          const docRef = doc(db, "users", userdatas.uid);
          const updatedCryptos = {
            bitcoin: {
              address: btc || userdatas.crypto.bitcoin.address,
              balance: userdatas.crypto.bitcoin.balance,
            },
            ethereum: {
              address: eth || userdatas.crypto.ethereum.address,
              balance: userdatas.crypto.ethereum.balance,
            },
            ton: {
              address: ton || userdatas.crypto.ton.address,
              balance: userdatas.crypto.ton.balance,
            },
          };
          console.log(updatedCryptos);
          try {
            updateDoc(docRef, {
              crypto: updatedCryptos,
            });
            notify("Address updated");
          } catch (error) {
            console.error(error);
          }
        }}
      >
        save
      </Button>
    </section>
  );
}

export default SettingsAddress;
