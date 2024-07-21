import React from "react";
import "./style.scss";
import Cards from "@/components/cards/page";
import Transfer from "@/components/transfer/page";
import Charts from "@/components/chart/page";
type Props = {};

function Dashboard({}: Props) {
  return (
    <div className="Dashboard container ">
      <div className="col">
        <Cards />
      </div>
      <div className="">
        <Transfer />
        <Charts />
      </div>
    </div>
  );
}

export default Dashboard;
