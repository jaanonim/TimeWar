import GameManager from "../../scripts/GameManager";
import Tooltip from "../Tooltip";
import styles from "./FigurePlace.module.css";

function FigurePlace({ isSelected, figure, onClick, disabled = true }) {
    return (
        <Tooltip figure={figure}>
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
                            : "_" +
                              GameManager.instance.player.team.toLowerCase()
                    }.png)`,
                }}
                onClick={() => {
                    if (!disabled) onClick(figure.id);
                }}
            ></div>
        </Tooltip>
    );
}

export default FigurePlace;
