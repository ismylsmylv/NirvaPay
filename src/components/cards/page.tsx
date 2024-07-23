"use client";
import React, { useState } from "react";
import "./style.scss";
import CardsBank from "../cards-bank/page";
import CardsCrypto from "../cards-crypto/page";
type Props = {};

function Cards({}: Props) {
  const [active, setactive] = useState(true);
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
      {active ? <CardsCrypto /> : <CardsBank />}
    </div>
  );
}

export default Cards;
