import React from "react";
import { RiDashboardLine } from "react-icons/ri";
import { RiWallet3Line } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { useParams } from "next/navigation";
import { FaRegBell } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import "./style.scss";
import LogoImg from "@/assets/img/logo.png";
import Image from "next/image";
import Link from "next/link";
type Props = {};
const navs = [
  { icon: <RiDashboardLine size={25} />, name: "Dashboard", url: "/" },
  { icon: <RiWallet3Line size={25} />, name: "My Wallet", url: "/wallet" },
  {
    icon: <GrTransaction size={25} />,
    name: "Transactions",
    url: "/transactions",
  },
  { icon: <FaRegBell size={25} />, name: "Notifications", url: "/settings" },
  { icon: <IoSettingsOutline size={25} />, name: "Settings", url: "/settings" },
  // { icon: <CgProfile />, name: "Settings", url: "/profile" },
];
function Navbar({}: Props) {
  return (
    <div className="Navbar">
      <div className="container">
        <Link href={"/dashboard"}>
          <Image alt="logo" src={LogoImg} height={40} />
        </Link>
        <div className="list">
          {navs.map((nav) => {
            return (
              <Link href={nav.url} className="nav" key={nav.name}>
                {nav.icon}
              </Link>
            );
          })}
          <div className="profile">
            <h1>Hello, Thomas</h1>
            <img
              src="https://www.rcwlitagency.com/media/5954/stagg-1.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
