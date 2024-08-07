import Success from "@/components/success/page";
import React from "react";
import { Suspense } from "react";
type Props = {};

function SuccessPage({}: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Success />
    </Suspense>
  );
}

export default SuccessPage;
