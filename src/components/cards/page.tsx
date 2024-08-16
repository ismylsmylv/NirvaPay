"use client";
import React, { useState } from "react";
import "./style.scss";
import CardsBank from "../cards-bank/page";
import CardsCrypto from "../cards-crypto/page";
type Props = {
  userdatas: any;
};

function Cards({ userdatas }: Props) {
  const [active, setactive] = useState("bank");
  return (
    <div className="Cards">
      <div className="heading">
        <div className="headText">
          Welcome, {userdatas?.user?.split(" ")[0]}
        </div>
        {/* <div className="subText"></div> */}
        <div className="switch">
          <button
            className={active == "crypto" ? "active" : ""}
            onClick={() => {
              setactive("crypto");
            }}
          >
            <p> crypto wallet</p>
          </button>
          <button
            className={active == "bank" ? "active" : ""}
            onClick={() => {
              setactive("bank");
            }}
          >
            <p>bank wallet</p>
          </button>
        </div>
      </div>
      {active == "crypto" ? (
        <CardsCrypto userdatas={userdatas} />
      ) : (
        <CardsBank userdatas={userdatas} />
      )}
    </div>
  );
}

export default Cards;
