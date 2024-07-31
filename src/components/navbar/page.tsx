import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { checkAuth } from "@/redux/slice/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaRegBell } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { RiDashboardLine, RiWallet3Line } from "react-icons/ri";
import "./style.scss";
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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth.auth);
  useEffect(() => {
    dispatch(checkAuth());
  }, [auth]);
  return (
    <div className="Navbar">
      {auth && (
        <>
          <div className="container">
            <Link href={"/dashboard"} className="logo">
              {/* <Image alt="logo" src={LogoImg} height={40} /> */}
              Nirva<p>Pay</p>
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
        </>
      )}
    </div>
  );
}

export default Navbar;
