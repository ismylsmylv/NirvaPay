"use client";
import React, { useEffect } from "react";
import "./style.scss";
import Cards from "@/components/cards/page";
import Transfer from "@/components/transfer/page";
import Charts from "@/components/chart/page";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { checkAuth, fetchUserById } from "@/redux/slice/auth";
type Props = {};

function Dashboard({}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.auth);
  const userdatas = useAppSelector((state) => state.auth.userdatas);
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchUserById());
    console.log(userdatas);
  }, []);
  !auth && router.push("/account/login");
  return (
    <div className="Dashboard container ">
      {auth && userdatas && (
        <>
          <div className="col">
            <Cards userdatas={userdatas} />
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
