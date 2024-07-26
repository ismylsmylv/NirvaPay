"use client";
import React, { useEffect } from "react";
import "./style.scss";
import Cards from "@/components/cards/page";
import Transfer from "@/components/transfer/page";
import Charts from "@/components/chart/page";
import { useRouter } from "next/navigation";
type Props = {};

function Dashboard({}: Props) {
  const router = useRouter();
  useEffect(() => {
    !localStorage.getItem("auth") && router.push("/account/login");
  }, []);
  return (
    <div className="Dashboard container ">
      {localStorage.getItem("auth") && (
        <>
          <div className="col">
            <Cards />
          </div>
          <div className="">
            <Transfer />
            <Charts />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
