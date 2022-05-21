import GameManager from "../../scripts/GameManager";
import styles from "./FigurePlace.module.css";

function FigurePlace({ isSelected, figure, onClick, disabled = true }) {
  return (
    <div
      className={
        styles.box +
        " " +
        (disabled ? styles.disabled : " ") +
        " " +
        (isSelected ? styles.selected : "")
      }
      style={{
        backgroundImage: `url(/img/thumbnails/${figure.image}${
          GameManager.instance.player.team == ""
            ? ""
            : "_" + GameManager.instance.player.team.toLowerCase()
        }.png)`,
      }}
      onClick={() => {
        if (!disabled) onClick(figure.id);
      }}
    ></div>
  );
}

export default FigurePlace;
