const defaultSettings = {
    "camera.fov": 75,
    "camera.movmentSpeed": 15,
    "camera.rotatmentSpeed": 1,
    "renderer.antialias": true,
    "renderer.shadowMap.enabled": true,
    "renderer.pixelRatio": 1,
    "shadow.mapSize.width": 64,
    "shadow.mapSize.height": 64,
};

export default class Settings {
    static _instance = null;

    static get instance() {
        if (Settings._instance == null) {
            Settings._instance = new Settings();
        }
        return Settings._instance;
    }

    constructor() {
        let localStorageSettings = {};
        try {
            localStorageSettings = JSON.parse(localStorage.getItem("settings"));
        } catch (e) {}
        this.settings = {
            ...defaultSettings,
            ...localStorageSettings,
        };

        localStorage.setItem("settings", JSON.stringify(this.settings));
    }

    setDefaults() {
        this.settings = { ...defaultSettings };
        this.save();
    }

    set(key, value) {
        this.settings[key] = value;
        this.save();
    }

    get(key) {
        return this.settings[key];
    }

    save() {
        localStorage.setItem("settings", JSON.stringify(this.settings));
    }
}
