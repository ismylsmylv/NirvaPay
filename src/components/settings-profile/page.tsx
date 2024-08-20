"use client";
import { app } from "@/lib/firebase/config";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { getAuth, updatePassword, User } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";

type Props = {
  userdatas: any;
};

function SettingsProfile({ userdatas }: Props) {
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
  return (
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
          if (updateStatus.passwordUpdated) {
            updatePassword(user as User, password)
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
  );
}

export default SettingsProfile;
