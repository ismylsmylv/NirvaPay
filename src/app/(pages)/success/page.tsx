"use client";
import { GoVerified } from "react-icons/go";
import React from "react";
import "./style.scss";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
type Props = {};
type Transaction = {
  from: string;
  to: string;
  date: string;
};
function Success({}: Props) {
  const completedTransaction: Transaction | any = useAppSelector(
    (state) => state.transaction.completedTransaction
  );
  const router = useRouter();
  return (
    <div className="Success container">
      <GoVerified size={40} fill="green" />
      <h1>transaction successful</h1>

      <div className="line">
        <div className="name">Receipt number</div>
        <div className="value">{completedTransaction.id || "x"}</div>
      </div>
      <div className="line">
        <div className="name">Amount</div>
        <div className="value">${completedTransaction.amount}</div>
      </div>
      <div className="line">
        <div className="name">Paid by</div>
        <div className="value">{completedTransaction.from}</div>
      </div>
      <div className="line">
        <div className="name">Enroll to</div>
        <div className="value">{completedTransaction.to}</div>
      </div>
      <div className="line">
        <div className="name">Date</div>
        <div className="value">{completedTransaction.date}</div>
      </div>
      <button
        onClick={(e) => {
          router.push("dashboard");
        }}
      >
        continue
      </button>
    </div>
  );
}

export default Success;
// {"from":"5313779039123482","to":"4630141858671729","amount":20,"date":"2024-08-02T15:27:12.809Z"}
