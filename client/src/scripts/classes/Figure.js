import * as THREE from "three";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import { PlayerTeams } from "../enums/PlayerTeams";
import GameManager from "../GameManager";
import ModelsManager from "../managers/ModelsManager";
import MapCreator from "../MapCreator";
import { getRandomElement, getRandomVector3 } from "../utilities/Random";
import { runWhenExist } from "../utilities/RunWhenExist";
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
        this.color = [0, 0, 0];
        this.data = data;

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

        this.model = ModelsManager.getModel(
            data.model,
            this.who.toLowerCase()
        ).children[0].clone();

        if (this.who === PlayerTeams.RED) this.model.rotation.y = Math.PI;
        this.model.scale.set(data.scale, data.scale, data.scale);

        if (data.offset && data.offset.length > 0) {
            if (data.offset.length === 2) {
                this.model.position = getRandomVector3(
                    data.offset[0],
                    data.offset[1]
                );
            } else if (data.offset.length > 2) {
                this.model.position.set(...getRandomElement(data.offset));
            } else {
                this.model.position.set(
                    data.offset[0].x,
                    data.offset[0].y,
                    data.offset[0].z
                );
            }
        }
        this.model.material = this.model.material.clone();
        this.add(this.model);

        this.lable = new FigureLabel(this);
    }

    update() {
        this.cursor.move(this);
        this.model.material.emissive = new THREE.Color(...this.color);
    }

    damageAnim(callback) {
        GameManager.instance.startAnim();
        new TWEEN.Tween(this.color)
            .to([0.75, 0, 0], 150)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(() => {
                this.color = [0, 0, 0];
            })
            .repeat(5)
            .onComplete(() => {
                this.color = [0, 0, 0];
                GameManager.instance.endAnim();
                if (callback) callback();
            })
            .start();
    }

    lateUpdate() {
        this.lable.update();
    }

    select() {
        this.cursor.show();
    }

    unselect() {
        let gm = GameManager.instance;
        gm.selectedFigure = null;
        this.cursor.hide();
    }

    makeAction(event, land) {
        this.unselect();
    }

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
        this.damageAnim(() => {
            this.lives -= damage;
            this.takeDamage = true;
            if (this.lives <= 0) {
                GameManager.instance.removeFigure(
                    this.mapPositionX,
                    this.mapPositionY
                );
            }
        });
    }

    capture() {}

    renew() {}

    static canBuy(data) {}

    static buy(data) {}

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
        gm.unselectFigureInUI();
        if (gm.selectedFigure === this) {
            gm.selectedFigure.unselect();
        } else {
            if (gm.selectedFigure != null) {
                gm.selectedFigure.unselect();
            }
            gm.selectedFigure = this;
            this.select();
        }
    }

    destroy() {
        let gm = GameManager.instance;
        runWhenExist(gm.sceneManager.scene, () => {
            this.onDestroy();
            gm.sceneManager.scene.remove(this);
        });
    }

    onDestroy() {
        this.lable.destroy();
    }
}
