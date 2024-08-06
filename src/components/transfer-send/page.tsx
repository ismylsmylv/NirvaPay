"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchUserByCardNumber } from "@/redux/slice/auth";
import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import "animate.css";
import "./style.scss";
type Props = {};

function TransferSend({ style }: Props) {
  const [sendOpen, setSendOpen] = React.useState(false);
  const [card, setcard] = useState(0);
  const cardholder = useAppSelector((state) => state.auth.cardholder);
  const dispatch = useAppDispatch();
  const handleSendOpen = () => {
    setSendOpen(true);
  };
  const handleSendClose = () => {
    setSendOpen(false);
  };
  return (
    <>
      <Modal
        open={sendOpen}
        onClose={handleSendClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="box">
            <div className="logo">
              Nirva<p>Pay</p>
            </div>
            <input
              required
              value={card}
              type="text"
              maxLength={16}
              onChange={(e) => {
                e.target.value.match(/^[0-9]+$/) != null &&
                  setcard(Number(e.target.value));
              }}
              placeholder="enter the recipient card number"
            />
            {card}
            {cardholder && <p className="animate__fadeInDown">{cardholder}</p>}
            <button
              onClick={() => {
                console.log(card);
                // dispatch(fetchUserByCardNumber(card));
              }}
            >
              continue
            </button>
          </div>
        </Box>
      </Modal>

      <button
        className="left"
        onClick={() => {
          handleSendOpen();
        }}
      >
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
    </>
  );
}

export default TransferSend;
