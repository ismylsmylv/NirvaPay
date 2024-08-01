"use client";
import { FaDollarSign } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { checkAuth, fetchUserById, getUserById } from "@/redux/slice/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import VisaImg from "@/assets/img/visa.png";
import MastercardImg from "@/assets/img/mastercard.png";
import "./style.scss";
type Props = {};
function Sender({}: Props) {
  const [search, setSearch] = useState<string | null>(null);
  const [number, setNumber] = useState<number | string>("XXXX-XXXX-XXXX-XXXX");
  const [amount, setAmount] = useState<number | string>(0);
  const [error, seterror] = useState(" ");
  const searchParams = useSearchParams();
  const userdatas: any = useAppSelector((state) => state.auth.userdatas);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.auth);
  const reciever = useAppSelector((state) => state.auth.reciever);
  const router = useRouter();
  function hideNumber(number: string) {
    const updatedNumber = "**** " + number.slice(12, 16);
    return updatedNumber;
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearch(searchParams.get("reciever"));
      if (search) {
        dispatch(getUserById(search));
        setNumber(reciever);
      }
    }
    dispatch(checkAuth());
    dispatch(fetchUserById());
    !auth && router.push("/account/login");
  }, [searchParams, search, dispatch, auth, router, reciever]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <div>
        Send to {search} ,{JSON.stringify(reciever)}
      </div> */}
      <div className=" sender container">
        <form action="">
          <label htmlFor="number">Send to</label>
          <input
            id="number"
            type="number"
            value={number}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            onChange={(e) => {
              e.target.value.length > 16 &&
                seterror("Card number can't exceed 16 digits");
              e.target.value.length < 17 && seterror(" ");
              e.target.value.match(/^[0-9]+$/) == null &&
                seterror("Special characters aren't allowed");
              setNumber(e.target.value);
              e.target.value.length == 0 && seterror("");
            }}
            onMouseLeave={() => {
              seterror("");
            }}
          />
          <div className="error">{error}</div>
          <label htmlFor="amount">Amount</label>
          <div className="amountInput">
            <div className="icon">$</div>
            <input
              id="amount"
              type="text"
              value={amount}
              placeholder="Enter an amount"
              onChange={(e) => {
                // Number(e.target.value) >= 0 &&
                e.target.value.match(/^[0-9]+$/) != null &&
                  setAmount(Number(e.target.value));
                e.target.value.length == 0 && setAmount(0);
              }}
            />
          </div>
          <div className="buttons">
            <button
              onClick={(e) => {
                e.preventDefault();
                setAmount(Number(amount) + 5);
              }}
            >
              $5
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setAmount(Number(amount) + 10);
              }}
            >
              $10
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setAmount(Number(amount) + 20);
              }}
            >
              $20
            </button>
          </div>
          <div className="cardcontainer">
            <label>Pay from</label>
            <div className="card">
              <div className="content">
                <img
                  alt="logo"
                  src={
                    userdatas?.card &&
                    (Array.from(userdatas?.card?.number)[0] == 4
                      ? VisaImg.src
                      : Array.from(userdatas?.card?.number)[0] == 2
                      ? MastercardImg.src
                      : Array.from(userdatas?.card?.number)[0] == 5
                      ? MastercardImg.src
                      : "")
                  }
                  width={60}
                  height={60}
                />
                <div className="number">
                  {userdatas?.card?.number && hideNumber(userdatas.card.number)}
                </div>
              </div>
              <div className="balance">${10000 - userdatas?.card?.balance}</div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            proceed
          </button>
        </form>
      </div>
    </Suspense>
  );
}

export default Sender;
