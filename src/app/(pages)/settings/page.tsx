import React from "react";
import "./style.scss";
import { Button, TextField } from "@mui/material";
type Props = {};

function Settings({}: Props) {
  return (
    <div className="Settings container">
      <section>
        <h1>Profile details</h1>
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          value={"asd"}
        />
        <TextField id="standard-basic" label="Standard" variant="standard" />
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
  );
}

export default Settings;
