import React from "react";
import "./style.scss";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import "./style.scss";
type Props = {};

function Transfer({}: Props) {
  return (
    <div className="Transfer">
      <button className="left">
        <div className="back">
          <FaArrowUp size={130} />
        </div>
        <div className="texts">
          <h1>top up</h1>
          <p>Instantly Fund Your Account</p>
        </div>
        <div className="icon">
          <FaLongArrowAltUp size={30} color="#6119C5" />
        </div>
      </button>
      <button className="right">
        <div className="texts">
          <h1>withdraw</h1>
          <p>Fast and Secure Withdrawals</p>
        </div>
        <div className="back">
          <FaArrowDown size={130} color="#3A0182" />
        </div>
        <div className="icon">
          <FaLongArrowAltDown size={30} color="#3A0182" />
        </div>
      </button>
    </div>
  );
}

export default Transfer;
