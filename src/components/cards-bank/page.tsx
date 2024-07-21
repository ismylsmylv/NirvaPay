import React from "react";
import "./style.scss";
type Props = {};

function CardsBank({}: Props) {
  return (
    <div className="CardsBank">
      <div className="card"></div>
      <div className="limits">
        <div className="heading">
          <p>monthly limits</p>
          <h1>$20000 of $100000</h1>
        </div>
        <div className="line">
          <div className="spent"></div>
          <div className="remaining"></div>
        </div>
      </div>
      <div className="seperator"></div>
      <div className="details">
        <div className="detail">
          <h1>cardholder name</h1>
          <p>john doe</p>
        </div>
        <div className="detail">
          <h1>issue date</h1>
          <p>02/23</p>
        </div>
        <div className="detail">
          <h1>expire date</h1>
          <p>02/29</p>
        </div>
      </div>
    </div>
  );
}

export default CardsBank;
