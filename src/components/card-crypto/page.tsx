import React from "react";
import "./style.scss";
import { toast, ToastContainer } from "react-toastify";
type Props = {
  crypto: {
    name: string;
    img: string;
    balance: string;
    address: string;
  };
};

function CardCrypto({ crypto }: Props) {
  return (
    <>
      <ToastContainer />
      <div className="CardCrypto">
        <div className="content">
          <div className="name">{crypto.name}</div>
          <div className="balance">{crypto.balance}</div>
          <button
            onClick={() => {
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
            copy address
          </button>
        </div>
        <img src={crypto.img} alt="" />
      </div>
    </>
  );
}

export default CardCrypto;
