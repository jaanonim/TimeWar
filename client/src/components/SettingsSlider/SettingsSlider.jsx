import { useState } from "react";
import Settings from "../../scripts/utilities/Settings";
import Slider from "../Slider";

function SettingsSlider(props) {
  const [v, setV] = useState(Settings.instance.get(props.name));
  return (
    <Slider
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={(v) => {
        Settings.instance.set(props.name, v);
        setV(v);
      }}
      value={Settings.instance.get(props.name)}
    >
      {props.text}
    </Slider>
  );
}
export default SettingsSlider;
