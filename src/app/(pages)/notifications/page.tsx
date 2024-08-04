"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchUserById } from "@/redux/slice/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { PiNewspaperBold } from "react-icons/pi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./style.scss";
import { readNotif } from "@/redux/slice/transaction";
type Props = {};
type Userdatas = {
  notifications: any;
};
function Notifications({}: Props) {
  const dispatch = useAppDispatch();
  const userdatas: Userdatas[] = useAppSelector(
    (state) => state.auth.userdatas
  );
  const uid: Userdatas[] = useAppSelector((state) => state.auth.uid);
  useEffect(() => {
    dispatch(fetchUserById());
  }, []);
  return (
    <div className="Notifications container">
      <Tooltip id="receipt" />
      <Tooltip id="read" />
      <h1>Notifications</h1>
      {userdatas?.notifications?.map(
        (notification: {
          title: string;
          content: { date: string };
          unread: boolean;
        }) => {
          if (notification.title == "Transaction successful") {
            return (
              <div
                className={`notification ${
                  notification.unread ? "unread" : "read"
                }`}
                key={notification.content.date}
              >
                <div className="type">
                  {notification.title == "Transaction successful" ? (
                    <GrTransaction size={35} fill="green" />
                  ) : (
                    <IoMdInformationCircleOutline />
                  )}
                  <div className="info">
                    <div className="title">{notification.title}</div>
                    <div className="date">{notification.content.date}</div>
                  </div>
                </div>
                <div className="controls">
                  <Link
                    onClick={() => {
                      // dispatch(setTransaction(notification.content));
                      // router.push();
                    }}
                    href={`/success?transaction=${JSON.stringify(
                      notification.content
                    )}`}
                    target="_blank"
                    data-tooltip-id="receipt"
                    data-tooltip-content="Get receipt"
                  >
                    <PiNewspaperBold size={20} />
                  </Link>
                  <button
                    onClick={async () => {
                      dispatch(readNotif({ uid, notification })).then(() => {
                        dispatch(fetchUserById());
                      });
                    }}
                    data-tooltip-id="read"
                    data-tooltip-content={`Mark as 
                      ${notification.unread ? " read" : " unread"}
                      `}
                  >
                    <FaCheck size={20} />
                  </button>
                </div>
              </div>
            );
          }
        }
      )}
    </div>
  );
}

export default Notifications;
