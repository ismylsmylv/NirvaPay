"use client";
import MastercardImg from "@/assets/img/mastercard.png";
import VisaImg from "@/assets/img/visa.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  fetchUserByCardNumber,
  updateCardholder,
  updateInfo,
  updateVerified,
} from "@/redux/slice/auth";
import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import { MdCreditCard } from "react-icons/md";
import "./style.scss";
import { useRouter } from "next/navigation";
type Props = {};

function TransferSend({ style }: Props) {
  const [sendOpen, setSendOpen] = React.useState(false);
  const [card, setcard] = useState<number>();
  const router = useRouter();
  const [image, setimage] = useState("");
  // const [verified, setverified] = useState(false);
  const info = useAppSelector((state) => state.auth.info);
  const cardholder = useAppSelector((state) => state.auth.cardholder);
  const verified = useAppSelector((state) => state.auth.verified);
  const dispatch = useAppDispatch();
  const handleSendOpen = () => {
    setSendOpen(true);
  };
  const handleSendClose = () => {
    setSendOpen(false);
    dispatch(updateVerified(false));
    dispatch(updateInfo());
    dispatch(updateCardholder());
    setcard("");
    setimage("");
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
            <div className="input flex justify-start items-center gap-4">
              <div className="imgCont">
                {image ? (
                  <img alt="logo" src={image} width={60} height={60} />
                ) : (
                  <MdCreditCard size={25} fill="gray" />
                )}
              </div>

              <input
                required
                value={card}
                type="text"
                maxLength={16}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^[0-9]+$/.test(value)) {
                    setcard(value);
                    if (value.startsWith("4")) {
                      setimage(VisaImg.src);
                    } else if (value.startsWith("2") || value.startsWith("5")) {
                      setimage(MastercardImg.src);
                    } else {
                      setimage("");
                    }
                  }
                }}
                placeholder="enter the recipient card number"
              />
            </div>
            <div className="details">
              <h1>{info}</h1>
              {verified && (
                <p className="animate__fadeInDown">{cardholder.user}</p>
              )}
            </div>
            <button
              // disabled={!verified}
              onClick={() => {
                dispatch(fetchUserByCardNumber(card));
                if (verified) {
                  const redirectHolder = cardholder || {};
                  handleSendClose();
                  router.push(
                    `${process.env.NEXT_PUBLIC_SEND_URL}/send?reciever=${redirectHolder.uid}`
                  );
                } else {
                }
              }}
            >
              {verified ? "Proceed to transfer" : "continue"}
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
