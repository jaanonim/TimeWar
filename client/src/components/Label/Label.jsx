import ProgressBar from "../ProgressBar";

function Label(props) {
  return (
    <div>
      {props.name}
      <ProgressBar size={props.maxLives} value={props.lives}></ProgressBar>
    </div>
  );
}
export default Label;
