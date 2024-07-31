"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

function Send({}: Props) {
  const searchParams = useSearchParams();

  const search = searchParams.get("reciever");
  return <div>Send to {search}</div>;
}

export default Send;
