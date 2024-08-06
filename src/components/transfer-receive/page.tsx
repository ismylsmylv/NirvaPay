"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { FaArrowDown, FaLongArrowAltDown } from "react-icons/fa";
import { IoCopy, IoCopyOutline } from "react-icons/io5";
import QRCode from "react-qr-code";

type Props = {};
function hideNumber(string: string) {
  const updatedString = string.slice(0, 4) + "********" + string.slice(12, 16);
  return updatedString;
}
function TransferReceive({ style, userdatas }: Props) {
  const [copy, setcopy] = useState(false);
  const uid = useAppSelector((state) => state.auth.uid);
  const [recieveopen, setRecieveOpen] = React.useState(false);
  const handleRecieveOpen = () => setRecieveOpen(true);
  const handleRecieveClose = () => {
    setRecieveOpen(false);
  };
  return (
    <>
      <Modal
        open={recieveopen}
        onClose={handleRecieveClose}
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
            <div
              className="link"
              onMouseLeave={() => {
                setcopy(false);
              }}
              onClick={() => {
                setcopy(true);
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_SEND_URL}/send?reciever=${uid}`
                );
              }}
            >
              {copy ? (
                <>
                  <p>Link copied</p>
                  <IoCopy />
                </>
              ) : (
                <>
                  <p>Copy link</p>
                  <IoCopyOutline size={20} fill="gray" />
                </>
              )}
            </div>
          </div>
        </Box>
      </Modal>

      <button className="right" onClick={handleRecieveOpen}>
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
    </>
  );
}

export default TransferReceive;
