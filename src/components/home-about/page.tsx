import React from "react";
import "./style.scss";
import { BsArrowRight } from "react-icons/bs";
type Props = {};

function HomeAbout({}: Props) {
  return (
    <div className="HomeAbout">
      <div className="container">
        <div className="head">
          How it
          <br />
          Works <BsArrowRight size={40} />
        </div>
        <div className="flow">
          <div className="elem">
            <div className="number">1</div>
            <h1>register</h1>
            <p>Register yourself as a customer</p>
          </div>
          {/* <div className="dashed dashed1"></div> */}
          <div className="elem">
            <div className="number">2</div>
            <h1>add new card</h1>
            <p>Card for you to use our services</p>
          </div>
          {/* <div className="dashed dashed2"></div> */}
          <div className="elem">
            <div className="number">3</div>
            <h1>success</h1>
            <p>Use NirvaPay in peace</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAbout;
