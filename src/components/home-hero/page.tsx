import React from "react";
import "./styles.scss";
import { TbCardsFilled } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import Phone from "@/assets/img/image-Photoroom (2).png";
type Props = {};

function HomeHero({}: Props) {
  return (
    <div className="HomeHero container">
      <div className="left">
        <div className="head">
          easy, fast & <br />
          secure payments
        </div>
        <p className="subText">
          Our payment platform ensures seamless and secure transactions,
          <br />
          allowing you to make payments with ease and peace of mind
        </p>
        <div className="control">
          <button>get started</button>
          {/* <div className="users">100+</div> */}
        </div>
        <div className="statistics">
          <TbCardsFilled size={50} />
          <div className="stat">
            <div className="number">$2m+</div>
            <div className="info">transactions</div>
          </div>
          <div className="stat">
            <div className="number">2k+</div>
            <div className="info">active users</div>
          </div>
        </div>
        <div className="rating">
          <div className="number">4.8</div>
          <div className="info">
            <p>Top rated on trustpilot</p>
            <div className="stars">
              <FaStar color="yellow" />
              <FaStar color="yellow" />
              <FaStar color="yellow" />
              <FaStar color="yellow" />
              <FaStar color="yellow" />
            </div>
          </div>
        </div>
      </div>
      <div className="phone">
        <img src={Phone.src} alt="" />
      </div>
    </div>
  );
}

export default HomeHero;
