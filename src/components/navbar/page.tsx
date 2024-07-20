import React from "react";
import { RiDashboardLine } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { useParams } from "next/navigation";
import "./style.scss";
import LogoImg from "@/assets/img/logo.png";
import Image from "next/image";
type Props = {};
const navs = [
  { icon: <RiDashboardLine />, name: "Dashboard", url: "/" },
  { icon: <IoWalletOutline />, name: "My Wallet", url: "/wallet" },
  { icon: <GrTransaction />, name: "Transactions", url: "/transactions" },
  { icon: <IoSettingsOutline />, name: "Settings", url: "/settings" },
];
function Navbar({}: Props) {
  return (
    <div className="Navbar">
      <Image alt="logo" src={LogoImg} />
    </div>
  );
}

export default Navbar;
