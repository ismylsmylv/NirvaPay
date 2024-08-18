import { Button } from "@mui/material";
import "./style.scss";
type Props = {};

function SettingsAccount({}: Props) {
  return (
    <section className="SettingsAccount">
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
  );
}

export default SettingsAccount;
