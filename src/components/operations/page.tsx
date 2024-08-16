"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchUserById } from "@/redux/slice/auth";
import Link from "next/link";
import { useEffect } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./style.scss";
type Props = {};
type Userdatas = {
  notifications: any;
};
function Operations({}: Props) {
  const dispatch = useAppDispatch();
  const userdatas: Userdatas[] = useAppSelector(
    (state) => state.auth.userdatas
  );
  const uid: Userdatas[] = useAppSelector((state) => state.auth.uid);
  let i = 0;
  useEffect(() => {
    dispatch(fetchUserById());
  }, []);
  return (
    <div className="Operations">
      <Tooltip id="receipt" />
      <Tooltip id="read" />
      <div className="heading">
        <h1>Recent operations</h1>
        <Link href={`/transactions`}>
          <MdOutlineKeyboardArrowRight size={30} color="white" />
        </Link>
      </div>

      {userdatas?.transactions?.length > 0 ? (
        <div className="operations">
          {userdatas?.transactions
            ?.toReversed()
            .map(
              (transaction: {
                title: string;
                content: { date: string };
                unread: boolean;
              }) => {
                if (i < 6) {
                  i++;
                  const date = parseISO(transaction.date);
                  const result = formatDistanceToNow(date, { addSuffix: true });
                  return (
                    <Link
                      className={`operation`}
                      key={transaction.date}
                      href={`/success?transaction=${JSON.stringify(
                        transaction
                      )}`}
                      target="_blank"
                    >
                      <div className="type">
                        {/* {transaction.title == "Transaction successful" ? ( */}

                        {userdatas.card.number == transaction.from ? (
                          <FaArrowUp
                            size={25}
                            className="expense"
                            fill="#ff0000"
                          />
                        ) : (
                          <FaArrowDown
                            size={25}
                            className="income"
                            fill="#008000"
                          />
                        )}

                        {/* <GrTransaction size={30} /> */}
                        {/* ) : ( */}
                        {/* <IoMdInformationCircleOutline /> */}
                        {/* )} */}
                        <div className="info">
                          <div className="title">Card to card</div>
                          <div className="date">{result}</div>
                        </div>
                      </div>
                      <div className="controls">
                        <div className="amount">${transaction.amount}</div>
                      </div>
                    </Link>
                  );
                }
              }
            )}
        </div>
      ) : (
        <h1 className="text-gray-400	">Nothing to show yet</h1>
      )}
    </div>
  );
}

export default Operations;
