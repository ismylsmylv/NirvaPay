import { Button } from "@mui/material";
import "./style.scss";
type Props = {};
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
              <button></button>
              <Button variant="outlined" color="error">
                {setting.button}
              </Button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default SettingsAccount;
