"use client";
import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import "./style.scss";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import "./style.scss";
import QRCode from "react-qr-code";
import { useAppSelector } from "@/redux/hooks/hooks";
var canvas = document.getElementById("canvas");

type Props = {};
function hideNumber(string: string) {
  const updatedString = string.slice(0, 4) + "********" + string.slice(12, 16);
  return updatedString;
}
function Transfer({ userdatas }: Props) {
  const [open, setOpen] = React.useState(false);
  const uid = useAppSelector((state) => state.auth.uid);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      <button className="left">
        <div className="back">
          <FaArrowUp size={130} />
        </div>
        <div className="texts">
          <h1>send</h1>
          <p>Transfer money instantly</p>
        </div>
        <div className="icon">
          <FaLongArrowAltUp size={30} color="#6119C5" />
        </div>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="qrmodal">
            <div className="logo">
              Nirva<p>Pay</p>
            </div>
            <div className="qr">
              <QRCode
                value={`${process.env.NEXT_PUBLIC_SEND_URL}/send?reciever=${uid}`}
                size={128}
              />
            </div>
            <div className="user">{userdatas?.card?.cardholder}</div>
            <div className="card">
              {userdatas?.card?.number && hideNumber(userdatas?.card?.number)}
            </div>
          </div>
        </Box>
      </Modal>

      <button className="right" onClick={handleOpen}>
        <div className="texts">
          <h1>receive</h1>
          <p>Get payments here.</p>
        </div>
        <div className="back">
          <FaArrowDown size={130} color="#3A0182" />
        </div>
        <div className="icon">
          <FaLongArrowAltDown size={30} color="#3A0182" />
        </div>
      </button>
    </div>
  );
}

export default Transfer;
