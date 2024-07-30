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
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchUserById());
  }, []);
  !auth && router.push("/account/login");
  return (
    <div className="Dashboard container ">
      {auth && (
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
