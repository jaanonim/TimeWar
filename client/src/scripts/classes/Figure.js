import * as THREE from "three";
import { PlayerTeams } from "../enums/PlayerTeams";
import GameManager from "../GameManager";
import ModelsManager from "../managers/ModelsManager";
import MapCreator from "../MapCreator";
import { getRandomElement, getRandomVector3 } from "../utilities/Random";
import Cursor from "./Cursor";
import FigureLabel from "./FigureLabel";

export default class Figure extends THREE.Object3D {
    static createModel(data, who) {
        if (ModelsManager.models[data.model] === undefined) {
            return null;
        }

        const model = ModelsManager.getModel(
            data.model,
            who.toLowerCase()
        ).children[0].clone();

        if (who === PlayerTeams.RED) model.rotation.y = Math.PI;
        model.scale.set(data.scale, data.scale, data.scale);

        if (data.offset && data.offset.length > 0) {
            if (data.offset.length === 2) {
                model.position = getRandomVector3(
                    data.offset[0],
                    data.offset[1]
                );
            } else if (data.offset.length > 2) {
                model.position.set(...getRandomElement(data.offset));
            } else {
                model.position.set(
                    data.offset[0].x,
                    data.offset[0].y,
                    data.offset[0].z
                );
            }
        }
        return model;
    }

    constructor(who, positionX, positionY, type, data) {
        super();
        this.figureId = data.id;
        this.figureType = type;
        this.who = who;
        this.mapPositionX = positionX;
        this.mapPositionY = positionY;
        this.name = data.name;
        this.image = data.image;
        this.description = data.description;
        this.lives = data.lives;
        this.maxLives = data.maxLives;
        this.price = data.price;
        this.takeDamage = false;
        this.highlighted = false;

        this.place(positionX, positionY);
        this.setupModel(data);

        this.cursor = new Cursor(true);
        this.cursor.hide();
        GameManager.instance.sceneManager.scene.add(this.cursor);
    }

    setupModel(data) {
        this.model = Figure.createModel(data, this.who);
        if (this.model == null) {
            console.error("Model not found");
            return;
        }
        this.model.material = this.model.material.clone();
        this.add(this.model);

        this.lable = new FigureLabel(this);
    }

    update() {
        this.cursor.move(this);
    }

    lateUpdate() {
        this.lable.update();
    }

    select() {
        this.cursor.show();
    }

    unselect() {
        this.cursor.hide();
    }

    makeAction(event, land) {}

    place(x, y) {
        this.mapPositionX = x;
        this.mapPositionY = y;
        let land = MapCreator.instance.mapObjects[x][y];
        if (land.figure != null) return false;
        this.position.set(land.position.x, 0, land.position.z);
        land.figure = this;
        return true;
    }

    makeDamage(damage) {
        this.lives -= damage;
        this.takeDamage = true;
        if (this.lives <= 0) {
            GameManager.instance.removeFigure(
                this.mapPositionX,
                this.mapPositionY
            );
        }
    }

    capture() {}

    renew() {}

    canBuy(getSupply) {
        return getSupply().supply >= this.price;
    }

    buy(getSupply) {
        return getSupply().takeSupply(this.price);
    }

    placeAction() {}

    //HOOKS
    onHoverEnter(event) {
        this.highlighted = true;
    }

    onHoverExit(event) {
        this.highlighted = false;
    }

    onRightClick(event) {}

    onLeftClick(event) {
        let gm = GameManager.instance;
        if (gm.selectedFigure === this) {
            gm.selectedFigure.unselect();
            gm.selectedFigure = null;
        } else {
            if (gm.selectedFigure != null) {
                gm.selectedFigure.unselect();
            }
            gm.selectedFigure = this;
            this.select();
        }
    }

    onDestroy() {
        this.lable.destroy();
    }
}
