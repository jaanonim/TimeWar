import { useState } from "react";
import Settings from "../../scripts/utilities/Settings";
import Checkbox from "../Checkbox";

function SettingsCheckbox(props) {
  const [v, setV] = useState(Settings.instance.get(props.name));
  return (
    <Checkbox
      onChange={(v) => {
        Settings.instance.set(props.name, v);
        setV(v);
      }}
      checked={Settings.instance.get(props.name)}
    >
      {props.text}
    </Checkbox>
  );
}
export default SettingsCheckbox;
