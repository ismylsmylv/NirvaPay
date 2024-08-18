"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { checkAuth, fetchUserById } from "@/redux/slice/auth";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./style.scss";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "@/lib/firebase/config";
import SettingsProfile from "@/components/settings-profile/page";
import SettingsAddress from "@/components/settings-address/page";
import SettingsAccount from "@/components/settings-account/page";
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
