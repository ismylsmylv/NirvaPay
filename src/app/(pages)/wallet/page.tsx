"use client";
import Cards from "@/components/cards/page";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { checkAuth, fetchUserById } from "@/redux/slice/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

function Wallet({}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.auth);
  const userdatas = useAppSelector((state) => state.auth.userdatas);
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchUserById());
    // !auth && router.push("/account/login");
  }, [auth, dispatch, router]);
  return (
    <div className="container">
      {auth && userdatas && <Cards userdatas={userdatas} />}
    </div>
  );
}

export default Wallet;
