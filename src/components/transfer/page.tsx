"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
} from "react-icons/fa";
import { IoCopy, IoCopyOutline } from "react-icons/io5";
import QRCode from "react-qr-code";
import "./style.scss";
import { useRouter } from "next/navigation";
import TransferReceive from "../transfer-receive/page";
import TransferSend from "../transfer-send/page";

type Props = {
  userdatas: any;
};

function Transfer({ userdatas }: Props) {
  const [recieveopen, setRecieveOpen] = React.useState(false);
  const [sendopen, setSendOpen] = React.useState(false);

  const router = useRouter();

  const handleSendOpen = () => setRecieveOpen(true);
  const handleSendClose = () => {
    setRecieveOpen(false);
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#131313",
    border: "2px solid #6119C5",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="Transfer">
      <TransferSend style={style} />

      {/* recieve */}
      <TransferReceive style={style} userdatas={userdatas} />
    </div>
  );
}

export default Transfer;
