import React, { useState } from "react";
import "./style.scss";
import { toast, ToastContainer } from "react-toastify";
import { FaClipboard } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
type Props = {
  crypto: {
    name: string;
    img: string;
    balance: string;
    address: string;
    short: string;
  };
};

function CardCrypto({ crypto }: Props) {
  const [copy, setcopy] = useState(false);
  return (
    <>
      <div
        className="CardCrypto"
        onMouseLeave={() => {
          setcopy(false);
        }}
      >
        <div className="content">
          <div className="name">{crypto.name}</div>
          <div className="balance">
            <div className="count">
              {crypto.balance} {crypto.short}
            </div>
          </div>
          <button
            onClick={() => {
              setcopy(true);
              navigator.clipboard.writeText(crypto.address);
              toast.info(`Address copied to clipboard`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }}
          >
            {copy ? (
              <>
                <FaClipboardCheck color="gray" /> Address copied
              </>
            ) : (
              <>
                <FaClipboard color="gray" /> Copy Adress
              </>
            )}
          </button>
        </div>
        <img src={crypto.img} alt="" />
      </div>
    </>
  );
}

export default CardCrypto;
