"use client";
import { app } from "@/lib/firebase/config";
import React, { useState } from "react";
import "./style.scss";
import Image from "next/image";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
type Props = {
  userdatas: any;
};

function SettingsAddress({ userdatas }: Props) {
  const [input, setinput] = useState("");
  const [btc, setbtc] = useState("");
  const [eth, seteth] = useState("");
  const [ton, setton] = useState("");
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
      <h1>Addresses</h1>
      <p>{JSON.stringify(userdatas)}</p>
      {cryptos.map((cryptoAddress) => {
        return (
          <div className="row" key={cryptoAddress.name}>
            {JSON.stringify(userdatas?.crypto?.[cryptoAddress.name])} crypto
            <div className="info">
              <Image src={cryptoAddress.img} alt="" height={50} width={50} />
              <p>{cryptoAddress.name}</p>
            </div>
            <input
              type="text"
              placeholder="address"
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
          </div>
        );
      })}
      <button
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
          } catch (error) {
            console.error(error);
          }
        }}
      >
        save
      </button>
    </section>
  );
}

export default SettingsAddress;
