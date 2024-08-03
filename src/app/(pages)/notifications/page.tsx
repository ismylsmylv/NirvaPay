"use client";
import { FaCheck } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchUserById } from "@/redux/slice/auth";
import { useEffect } from "react";
import { GrTransaction } from "react-icons/gr";
import { PiNewspaperBold } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import "./style.scss";
type Props = {};

function Notifications({}: Props) {
  const dispatch = useAppDispatch();
  const userdatas = useAppSelector((state) => state.auth.userdatas);
  useEffect(() => {
    dispatch(fetchUserById());
  }, []);
  return (
    <div className="Notifications container">
      <h1>Notifications</h1>
      {userdatas?.notifications?.map((notification) => {
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
                <button>
                  <PiNewspaperBold size={20} />
                </button>
                <button>
                  <FaCheck size={20} />
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Notifications;
