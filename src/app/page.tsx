"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { checkAuth } from "@/redux/slice/auth";
import { useEffect } from "react";
import Dashboard from "./(pages)/dashboard/page";
import Homepage from "./(pages)/home/page";

export default function Home() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.auth);
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return <>{auth ? <Dashboard /> : <Homepage />}</>;
}
