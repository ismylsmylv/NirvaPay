import React, { useState } from "react";
import "./style.scss";
import LogoImg from "@/assets/img/logo.png";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { FaClipboard } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
type Props = {};
function CardsBank({ userdatas }: Props) {
  const [copy, setcopy] = useState(false);
  const details = [
    { title: "Cardholder name", value: userdatas?.card?.name },
    { title: "Card number", value: userdatas?.card?.number },
    { title: "Expiry date", value: userdatas?.card?.expire },
    { title: "CVV", value: userdatas?.card?.cvv },
  ];

  return (
    <div className="CardsBank">
      <ToastContainer />
      <div className="card">
        <div className="card-inner">
          <div className="front">
            {/* <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" /> */}
            <div className="row">
              <Image alt="logo" src={LogoImg.src} height={30} width={120} />
              <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="60px" />
            </div>
            <div className="row card-no">
              {<p>{userdatas?.card?.number}</p>}
              {/* <p>5244</p>
              <p>2150</p>
              <p>8252</p>
              <p>6420</p> */}
            </div>
            <div className="row card-holder">
              {/* <p>CARD HPLDER</p> */}
              {/* <p>VALID TILL</p> */}
            </div>
            <div className="row name">
              <p>JOE ALISON</p>
              <p>{userdatas?.card?.expire}</p>
            </div>
          </div>
          <div className="back">
            {/* <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" /> */}
            <div className="bar"></div>
            <div className="row card-cvv">
              <div>
                <img src="https://i.ibb.co/S6JG8px/pattern.png" />
              </div>
              <p>{userdatas?.card?.cvv}</p>
            </div>
            <div className="row card-text">
              <p>
                this card remains the property of Nirvapay and must be returned
                upon request
              </p>
            </div>
            <div className="row signature">
              <p>CUSTOMER SIGNATURE</p>
              <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="80px" />
            </div>
          </div>
        </div>
      </div>
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
        {details.map((detail) => {
          return (
            <div
              className={detail.title == "CVV" ? "detail cvv" : "detail"}
              key={detail.title}
              onMouseLeave={() => {
                setcopy(false);
              }}
            >
              <h1>{detail.title}</h1>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(detail.value);
                  setcopy(true);
                  toast.info(`${detail.title} copied to clipboard`, {
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
                <p> {detail.value}</p>
                {copy ? <FaClipboardCheck /> : <FaClipboard />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CardsBank;
