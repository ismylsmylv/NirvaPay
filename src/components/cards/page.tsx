"use client";
import React, { useState } from "react";
import "./style.scss";
import CardsBank from "../cards-bank/page";
import CardsCrypto from "../cards-crypto/page";
type Props = {
  userdatas: any;
};

function Cards({ userdatas }: Props) {
  const [active, setactive] = useState(false);
  return (
    <div className="Cards">
      <div className="heading">
        <div className="headText">My Account</div>
        {/* <div className="subText"></div> */}
        <div className="switch">
          <button
            className={active ? "active" : ""}
            onClick={() => {
              setactive(!active);
            }}
          >
            crypto wallet
          </button>
          <button
            className={!active ? "active" : ""}
            onClick={() => {
              setactive(!active);
            }}
          >
            bank wallet
          </button>
        </div>
      </div>
      {active ? (
        <CardsCrypto userdatas={userdatas} />
      ) : (
        <CardsBank userdatas={userdatas} />
      )}
    </div>
  );
}

export default Cards;
