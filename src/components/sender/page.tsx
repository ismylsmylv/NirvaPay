"use client";
import MastercardImg from "@/assets/img/mastercard.png";
import VisaImg from "@/assets/img/visa.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { checkAuth, fetchUserById, getUserById } from "@/redux/slice/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import {
  patchReciever,
  patchSender,
  setTransaction,
} from "@/redux/slice/transaction";
import "./style.scss";
type Props = {};
function Sender({}: Props) {
  const amounts = [5, 10, 20];
  const [search, setSearch] = useState<string | null>(null);
  const [number, setNumber] = useState<number | string>("");
  const [amount, setAmount] = useState<number | string>(0);
  const [error, seterror] = useState(" ");
  const [amountError, setAmountError] = useState(" ");
  const searchParams = useSearchParams();
  const userdatas: any = useAppSelector((state) => state.auth.userdatas);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.auth);
  const uid = useAppSelector((state) => state.auth.uid);
  const reciever = useAppSelector((state) => state.auth.reciever);
  const router = useRouter();
  const [proceeding, setproceeding] = useState(false);
  function hideNumber(number: string) {
    const updatedNumber = "**** " + number.slice(12, 16);
    return updatedNumber;
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearch(searchParams.get("reciever"));
      if (search) {
        dispatch(getUserById(search));
        setNumber(reciever?.card?.number);
      }
    }
    dispatch(checkAuth());
    dispatch(fetchUserById());
    // !auth && router.push("/account/login"); UNCOMMENT LATER
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
            required
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
              required
              id="amount"
              type="text"
              value={amount}
              placeholder="Enter an amount"
              onMouseLeave={() => {
                setAmountError("");
              }}
              onChange={(e) => {
                // Number(e.target.value) >= 0 &&
                e.target.value.match(/^[0-9]+$/) != null &&
                  setAmount(Number(e.target.value));
                e.target.value.length == 0 && setAmount(0);
                const remaining = userdatas?.card?.balance;
                Number(e.target.value) > remaining
                  ? setAmountError("Insufficient funds")
                  : setAmountError("");
              }}
            />
          </div>
          <div className="error">{amountError}</div>

          <div className="buttons">
            {amounts.map((addAmount) => {
              return (
                <button
                  key={addAmount}
                  onClick={(e) => {
                    const remaining = 10000 - userdatas?.card?.balance;
                    e.preventDefault();
                    Number(amount) > remaining
                      ? setAmountError("Insufficient funds")
                      : setAmountError("");
                    setAmount(Number(amount) + addAmount);
                  }}
                >
                  ${addAmount}
                </button>
              );
            })}
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
              <div className="balance">${userdatas?.card?.balance}</div>
            </div>
          </div>
          <button
            disabled={
              JSON.stringify(number)?.length === 0 ||
              amount === 0 ||
              amount > userdatas?.card?.balance ||
              proceeding
            }
            onClick={(e) => {
              e.preventDefault();
              if (JSON.stringify(number).length === 0) {
                seterror("Enter the card number");
              } else if (amount === 0) {
                setAmountError("Enter the amount");
              } else {
                const transaction = {
                  from: userdatas?.card?.number,
                  to: number,
                  amount: amount,
                  date: new Date().toISOString(),
                };
                const trData = {
                  docId: search,
                  newBalance: amount,
                  transactions: transaction,
                };
                const senderData = {
                  docId: uid,
                  newBalance: amount,
                  transactions: transaction,
                };
                dispatch(patchReciever(trData));
                dispatch(patchSender(senderData));
                dispatch(setTransaction(transaction));
                console.log(trData);
                setproceeding(true);
                setTimeout(() => {
                  router.push("/success");
                }, 2000);
              }
            }}
          >
            {proceeding ? "Processing" : "Proceed"}
          </button>
        </form>
      </div>
    </Suspense>
  );
}

export default Sender;
