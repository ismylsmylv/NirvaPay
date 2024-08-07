"use client";

import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";

import "./style.scss";

type Props = {};
type Transaction = {
  id?: string;
  amount?: string;
  from?: string;
  to?: string;
  date?: string;
};

function Success({}: Props) {
  const completedTransaction: Transaction | any = useAppSelector(
    (state) => state.transaction.completedTransaction
  );
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const transactionData = searchParams.get("transaction");
      if (transactionData) {
        setTransaction(JSON.parse(transactionData));
      }
    }
    // !auth && router.push("/account/login"); UNCOMMENT LATER
  }, [searchParams, router]);

  return (
    <div className="Success container">
      <GoVerified size={40} fill="green" />
      <h1>Transaction Successful</h1>

      <div className="line">
        <div className="name">Receipt Number</div>
        <div className="value">{transaction.id || "undefined"}</div>
      </div>
      <div className="line">
        <div className="name">Amount</div>
        <div className="value">${transaction.amount || "undefined"}</div>
      </div>
      <div className="line">
        <div className="name">Paid By</div>
        <div className="value">{transaction.from || "undefined"}</div>
      </div>
      <div className="line">
        <div className="name">Enroll To</div>
        <div className="value">{transaction.to || "undefined"}</div>
      </div>
      <div className="line">
        <div className="name">Date</div>
        <div className="value">{transaction.date || "undefined"}</div>
      </div>
      <button
        onClick={(e) => {
          router.push("/dashboard");
        }}
      >
        Continue
      </button>
    </div>
  );
}

export default Success;
