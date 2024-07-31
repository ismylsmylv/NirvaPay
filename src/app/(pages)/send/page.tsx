"use client";
import Sender from "@/components/sender/page";
import { Suspense } from "react";

type Props = {};

function Send({}: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Sender />
    </Suspense>
  );
}

export default Send;
