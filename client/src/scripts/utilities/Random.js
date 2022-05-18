import * as THREE from "three";

const defaultCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
const getRandomString = (length, charset = defaultCharset) => {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return result;
};

const getRandomFloat = (min, max, decimals = 2) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
};

const getRandomVector3 = (min, max) => {
    const x = getRandomFloat(min.x, max.x);
    const y = getRandomFloat(min.y, max.y);
    const z = getRandomFloat(min.z, max.z);
    return new THREE.Vector3(x, y, z);
};

const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

export {getRandomFloat, getRandomVector3, getRandomElement, getRandomString};
