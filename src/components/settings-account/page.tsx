"use client";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./style.scss";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#131313",
  border: "2px solid #6119C5",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
type Props = {
  userdatas: any;
};
const settings = [
  {
    heading: "Log out",
    sub: "Sign out and end your session",
    button: "log out",
  },
  {
    heading: "Suspend account",
    sub: "Temporarily disable your account",
    button: "suspend",
  },
  {
    heading: "Delete account",
    sub: "Permanently remove your account",
    button: "delete",
  },
];
function SettingsAccount({}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <section className="SettingsAccount">
      <h1>Manage account</h1>
      <ul>
        {settings.map((setting) => {
          return (
            <li key={setting.heading}>
              <div>
                <h2>{setting.heading}</h2>
                <p>{setting.sub}</p>
              </div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  if (setting.heading == "Log out") {
                    handleOpen();
                    //   localStorage.removeItem("auth");
                    //   router.push("/");
                  }
                }}
              >
                {setting.button}
              </Button>
            </li>
          );
        })}
      </ul>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <h2 id="parent-modal-title">Log out?</h2>
          <p id="parent-modal-description">This will end current session </p>
          <div className="flex items-center justify-between my-2 mt-10">
            <Button
              style={{ alignSelf: "center", backgroundColor: "#6119C5" }}
              variant="contained"
              color="secondary"
              onClick={() => {
                handleClose();
              }}
            >
              cancel
            </Button>
            <Button
              style={{ alignSelf: "center" }}
              variant="contained"
              color="error"
              onClick={() => {
                localStorage.removeItem("auth");
                router.push("/");
              }}
            >
              log out
            </Button>
          </div>
        </Box>
      </Modal>
    </section>
  );
}

export default SettingsAccount;
