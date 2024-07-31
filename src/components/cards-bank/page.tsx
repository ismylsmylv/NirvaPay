import { useState } from "react";
import MastercardImg from "@/assets/img/mastercard.png";
import VisaImg from "@/assets/img/visa.png";
import { IoCopy, IoCopyOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
type Props = { userdatas: any };
function numberSpace(a: string) {
  const spaced =
    a.slice(0, 4) +
    " " +
    a.slice(4, 8) +
    " " +
    a.slice(8, 12) +
    " " +
    a.slice(12, 16);
  return spaced;
}
function CardsBank({ userdatas }: Props) {
  const [copy, setcopy] = useState(false);
  const details = [
    { title: "Cardholder name", value: userdatas?.card?.cardholder },
    { title: "Card number", value: userdatas?.card?.number },
    { title: "Expiry date", value: userdatas?.card?.expire },
    { title: "CVV", value: userdatas?.card?.cvv },
  ];
  const usage = 100000 - userdatas?.card?.balance;
  return (
    <div className="CardsBank">
      <>
        <div className="card">
          <div className="card-inner">
            <div className="front">
              {/* <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" /> */}
              <div className="row">
                {/* <Image alt="logo" src={LogoImg.src} height={30} width={120} /> */}
                <div className="logo">
                  Nirva<p>Pay</p>
                </div>
                <img
                  alt="logo"
                  src={
                    userdatas?.card &&
                    (Array.from(userdatas?.card?.number)[0] == 4
                      ? VisaImg.src
                      : Array.from(userdatas?.card?.number)[0] == 2
                      ? MastercardImg.src
                      : Array.from(userdatas?.card?.number)[0] == 5
                      ? MastercardImg.src
                      : "")
                  }
                  width={60}
                  height={60}
                />
              </div>
              <div className="row card-no">
                {
                  <p>
                    {userdatas?.card?.number &&
                      numberSpace(userdatas?.card?.number)}
                  </p>
                }
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
                <p>{userdatas?.card?.cardholder}</p>
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
                  this card remains the property of Nirvapay and must be
                  returned upon request
                </p>
              </div>
              <div className="row signature">
                <p>CUSTOMER SIGNATURE</p>
                <img
                  alt="logo"
                  src={
                    userdatas?.card &&
                    (Array.from(userdatas?.card?.number)[0] == 4
                      ? VisaImg.src
                      : Array.from(userdatas?.card?.number)[0] == 2
                      ? MastercardImg.src
                      : Array.from(userdatas?.card?.number)[0] == 5
                      ? MastercardImg.src
                      : "")
                  }
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="limits">
          <div className="heading">
            <p>monthly limits</p>
            <h1>${usage} of $100000</h1>
          </div>
          <div className="line">
            <div
              className="spent"
              style={{ width: `${100 - Math.round(usage / 1000)}%` }}
            ></div>
            <div
              className="remaining"
              style={{
                width: `${Math.round(usage / 1000)}%`,
              }}
            ></div>
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
                  <p>
                    {detail.title == "Card number"
                      ? numberSpace(detail.value)
                      : detail.value}
                  </p>
                  {copy ? <IoCopy /> : <IoCopyOutline />}
                </button>
              </div>
            );
          })}
        </div>
      </>
      <ToastContainer />
    </div>
  );
}

export default CardsBank;
