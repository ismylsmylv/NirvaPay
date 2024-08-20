"use client";
import SettingsAccount from "@/components/settings-account/page";
import SettingsAddress from "@/components/settings-address/page";
import SettingsProfile from "@/components/settings-profile/page";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { checkAuth, fetchUserById } from "@/redux/slice/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./style.scss";
type Props = {};

function Settings({}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const auth = useAppSelector((state) => state.auth.auth);
  const userdatas = useAppSelector((state) => state.auth.userdatas);

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchUserById());
    // !auth && router.push("/account/login");
    // userdatas && setemail(userdatas.email);
    // userdatas && setusername(userdatas.user);
  }, [dispatch, router, userdatas]);
  {
    /* uid */
  }
  return (
    <>
      {userdatas && (
        <>
          {/* {JSON.stringify(userdatas)} */}
          <div className="Settings container">
            <SettingsProfile userdatas={userdatas} />
            <SettingsAddress userdatas={userdatas} />
            <SettingsAccount userdatas={userdatas} />
          </div>
        </>
      )}
    </>
  );
}

export default Settings;
