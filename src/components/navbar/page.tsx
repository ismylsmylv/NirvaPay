import React from "react";
import { RiDashboardLine } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { useParams } from "next/navigation";
import { FaRegBell } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import "./style.scss";
import LogoImg from "@/assets/img/logo.png";
import Image from "next/image";
type Props = {};
const navs = [
  { icon: <RiDashboardLine />, name: "Dashboard", url: "/" },
  { icon: <IoWalletOutline />, name: "My Wallet", url: "/wallet" },
  { icon: <GrTransaction />, name: "Transactions", url: "/transactions" },
  { icon: <FaRegBell />, name: "Notifications", url: "/settings" },
  { icon: <IoSettingsOutline />, name: "Settings", url: "/settings" },
  { icon: <CgProfile />, name: "Settings", url: "/profile" },
];
function Navbar({}: Props) {
  return (
    <div className="Navbar">
      sdgdf
      <Image alt="logo" src={LogoImg} />
      <div className="list">
        {navs.map((nav) => {
          return (
            <div className="nav" key={nav.name}>
              {nav.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;
