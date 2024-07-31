"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

type Props = {};

function Send({}: Props) {
  const [search, setSearch] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearch(searchParams.get("reciever"));
    }
  }, [searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>Send to {search}</div>
    </Suspense>
  );
}

export default Send;
