import Button from "../Button/Button";
import styles from "./FigurePlace.module.css";

function FigurePlace({isSelected, figure, onClick}) {
    return (
        <div className={styles.wrapper}>
            <Button
                w="calc((20vw - 4rem) / 3)"
                h="calc((20vw - 4rem) / 3)"
                color={isSelected ? "var(--akcent)" : "var(--main)"}
                hoverColor={
                    isSelected ? "var(--akcent-dark)" : "var(--main-dark)"
                }
                onClick={() => onClick(figure.id)}
            >
                {figure.name}
            </Button>
        </div>
    );
}

export default FigurePlace;
