import React from "react";
import "./style.scss";
import LogoImg from "@/assets/img/logo.png";
import Image from "next/image";
type Props = {};

function CardsBank({}: Props) {
  return (
    <div className="CardsBank">
      <div className="card">
        <div className="card-inner">
          <div className="front">
            {/* <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" /> */}
            <div className="row">
              <Image alt="logo" src={LogoImg.src} height={30} width={120} />
              <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="60px" />
            </div>
            <div className="row card-no">
              <p>5244</p>
              <p>2150</p>
              <p>8252</p>
              <p>6420</p>
            </div>
            <div className="row card-holder">
              {/* <p>CARD HPLDER</p> */}
              {/* <p>VALID TILL</p> */}
            </div>
            <div className="row name">
              <p>JOE ALISON</p>
              <p>10 / 25</p>
            </div>
          </div>
          <div className="back">
            {/* <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" /> */}
            <div className="bar"></div>
            <div className="row card-cvv">
              <div>
                <img src="https://i.ibb.co/S6JG8px/pattern.png" />
              </div>
              <p>824</p>
            </div>
            <div className="row card-text">
              <p>
                this is a virtual card design using HTML and CSS. You can aslo
                design something like this.
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
        <div className="detail">
          <h1>cardholder name</h1>
          <p>john doe</p>
        </div>
        <div className="detail">
          <h1>card number</h1>
          <p>2345 0209 4985 9238</p>
        </div>
        <div className="detail">
          <h1>expiry date</h1>
          <p>02/29</p>
        </div>
        <div className="detail">
          <h1>CVV</h1>
          <p>229</p>
        </div>
      </div>
    </div>
  );
}

export default CardsBank;
