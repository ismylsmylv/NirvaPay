import React from "react";
import CardCrypto from "../card-crypto/page";
import "./style.scss";
type Props = {};
const cryptos = [
  {
    name: "bitcoin",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png",
    balance: "0.9",
    address: "1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71",
    short: "BTC",
  },

  {
    name: "ethereum",
    img: "https://i.pinimg.com/736x/de/49/55/de495504a51163548744bd1d7a0b499d.jpg",
    balance: "5.6",
    address: "0xb794f5ea0ba39494ce839613fffba74279579268",
    short: "ETH",
  },
  {
    name: "ton",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3d/The_open_network_logo.svg",
    balance: "43",
    address: "EQAWzEKcdnykvXfUNouqdS62tvrp32bCxuKS6eQrS6ISgcLo",
    short: "TON",
  },
];
function CardsCrypto({}: Props) {
  return (
    <div className="CardsCrypto">
      {cryptos.map((elem) => {
        return <CardCrypto crypto={elem} key={elem.name} />;
      })}
    </div>
  );
}

export default CardsCrypto;
