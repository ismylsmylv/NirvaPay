"use client";
import HomeAbout from "@/components/home-about/page";
import HomeHero from "@/components/home-hero/page";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { checkAuth } from "@/redux/slice/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

function Homepage({}: Props) {
  const auth = useAppSelector((state) => state.auth.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(checkAuth());
    auth && router.push("/dashboard");
  }, []);
  return (
    <>
      {!auth && (
        <>
          <HomeHero />
          <HomeAbout />
        </>
      )}
    </>
  );
}

export default Homepage;
