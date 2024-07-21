import React from "react";
import "./style.scss";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
type Props = {};

function Transfer({}: Props) {
  return (
    <div className="Transfer">
      <button>
        <div className="texts">
          <h1>top up</h1>
          <p>Instantly Fund Your Account</p>
        </div>
        <FaArrowUp size={40} />
      </button>
      <button>
        <div className="texts">
          <h1>withdraw</h1>
          <p>Fast and Secure Withdrawals</p>
        </div>
        <FaArrowDown size={40} />
      </button>
    </div>
  );
}

export default Transfer;
