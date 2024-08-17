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
type Props = {};

function Settings({}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const auth = useAppSelector((state) => state.auth.auth);
  const userdatas = useAppSelector((state) => state.auth.userdatas);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({
    passwordUpdated: false,
    usernameUpdated: false,
    emailUpdated: false,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const auth = getAuth();

  const user = auth.currentUser;
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchUserById());
    // !auth && router.push("/account/login");
    // userdatas && setemail(userdatas.email);
    // userdatas && setusername(userdatas.user);
  }, [auth, dispatch, router, userdatas]);
  {
    /* uid */
  }
  return (
    <>
      {auth && userdatas && (
        <>
          {/* {JSON.stringify(userdatas)} */}
          <div className="Settings container">
            <section>
              <h1>Profile details</h1>
              <div className="input">
                <TextField
                  id="standard-basic"
                  label="Username"
                  variant="standard"
                  value={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                    setUpdateStatus((prevState) => ({
                      ...prevState,
                      usernameUpdated: true,
                    }));
                  }}
                />
              </div>
              <div className="input">
                <TextField
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                    setUpdateStatus((prevState) => ({
                      ...prevState,
                      emailUpdated: true,
                    }));
                  }}
                />
              </div>
              <div className="input">
                <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Update password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                      setUpdateStatus((prevState) => ({
                        ...prevState,
                        passwordUpdated: true,
                      }));
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <Button
                className="updateBtn"
                variant="contained"
                onClick={() => {
                  console.log(user);
                  if (updateStatus.passwordUpdated) {
                    updatePassword(user, password)
                      .then(() => {
                        // Update successful.
                        console.log("update success");
                      })
                      .catch((error) => {
                        // An error ocurred
                        // ...
                        console.log(error);
                      });
                  }
                  if (updateStatus.usernameUpdated) {
                    const db = getFirestore(app);
                    const docRef = doc(db, "users", userdatas.uid);

                    try {
                      updateDoc(docRef, {
                        user: username,
                      });
                    } catch (error) {
                      console.error(error);
                    }
                  }
                  if (updateStatus.emailUpdated) {
                    const db = getFirestore(app);
                    const docRef = doc(db, "users", userdatas.uid);

                    try {
                      updateDoc(docRef, {
                        email: email,
                      });
                    } catch (error) {
                      console.error(error);
                    }
                  }
                }}
              >
                Update
              </Button>
            </section>
            <section>
              <h1>Addresses</h1>
            </section>
            <section>
              <h1>Manage account</h1>
              <ul>
                <li>
                  <p>log out</p>
                  <button></button>
                  <Button variant="outlined" color="error">
                    log out
                  </Button>
                </li>
                <li>
                  <p>suspend account</p>
                  <Button variant="outlined" color="error">
                    suspend
                  </Button>
                </li>
                <li>
                  <p>delete account</p>
                  <Button variant="outlined" color="error">
                    delete
                  </Button>
                </li>
              </ul>
            </section>
          </div>
        </>
      )}
    </>
  );
}

export default Settings;
