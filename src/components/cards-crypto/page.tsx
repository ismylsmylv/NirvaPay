import React from "react";
import CardCrypto from "../card-crypto/page";
import "./style.scss";
type Props = {
  userdatas: any;
};
function CardsCrypto({ userdatas }: Props) {
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
    <div className="CardsCrypto">
      {cryptos.map((elem) => {
        return <CardCrypto crypto={elem} key={elem.name} />;
      })}
    </div>
  );
}

export default CardsCrypto;
