"use client";
import React, { useEffect } from "react";
import "./style.scss";
import Cards from "@/components/cards/page";
import Transfer from "@/components/transfer/page";
import Charts from "@/components/operations/page";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { checkAuth, fetchUserById } from "@/redux/slice/auth";
import Operations from "@/components/operations/page";
type Props = {};

function Dashboard({}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.auth);
  const userdatas = useAppSelector((state) => state.auth.userdatas);
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchUserById());
    !auth && router.push("/account/login");
  }, [auth, dispatch, router]);
  return (
    <div className="Dashboard container ">
      {auth && userdatas && (
        <>
          <div className="col">
            <Cards userdatas={userdatas} />
          </div>
          <div className="">
            <Transfer userdatas={userdatas} />
            <div className="infos flex gap-4">
              <Operations />
              <Operations />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
