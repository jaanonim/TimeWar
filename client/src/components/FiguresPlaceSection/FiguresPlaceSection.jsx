import FigurePlace from "../FigurePlace";
import styles from "./FiguresPlaceSection.module.css";

function FiguresPlaceSection({name, figures, select, selecting}) {
    let places = figures.map((figure) => {
        return (
            <FigurePlace
                key={figure.name}
                figure={figure}
                isSelected={figure.id === select} onClick={selecting}
            />
        )
    });

    return (
        <div>
            <h3 className={styles.header}>{name}</h3>
            <div className={styles.items}>
                {places}
            </div>
        </div>
    );
}

export default FiguresPlaceSection;
