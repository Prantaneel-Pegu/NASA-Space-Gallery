"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImages = getImages;
exports.getImage = getImage;
exports.getKeywordsMatches = getKeywordsMatches;
exports.getPotd = getPotd;
exports.getRoverPhotos = getRoverPhotos;
exports.getStaticMap = getStaticMap;
const axios_1 = __importDefault(require("axios"));
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const signUrl_js_1 = __importDefault(require("./signUrl.js"));
dotenv_1.default.config({ path: (0, path_1.resolve)(__dirname, "../.env") });
const NASA_API_KEY = process.env.NASA_API_KEY;
const MAP_API_KEY = process.env.MAP_API_KEY;
const MAP_URL_SIGNING_SECRET = process.env.MAP_URL_SIGNING_SECRET;
const nasaImagesUrl = `https://images-api.nasa.gov`;
const potdUrl = `https://api.nasa.gov/planetary/apod`;
const roverPhotosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity`;
const mapApiUrl = `https://maps.googleapis.com/maps/api`;
const requestTimeout = 14000;
async function getImages(query, index = '20') {
    let serverResponse = {};
    const reqUrl = `${nasaImagesUrl}/search?q=${query}&media_type=image&page_size=${index}`;
    try {
        serverResponse = (await axios_1.default.get(reqUrl, { signal: AbortSignal.timeout(requestTimeout) })).data;
    }
    catch (err) {
        console.error("\x1b[31m", `[server-comms]`, "\x1b[0m", ": Encountered Error: \n", err);
    }
    return serverResponse;
}
async function getImage(imageId) {
    let serverResponse = {};
    const reqUrl = `${nasaImagesUrl}/search?nasa_id=${imageId}&media_type=image`;
    try {
        serverResponse = (await axios_1.default.get(reqUrl, { signal: AbortSignal.timeout(requestTimeout) })).data;
    }
    catch (err) {
        console.error("\x1b[31m", `[server-comms]`, "\x1b[0m", ": Encountered Error: \n", err);
    }
    return serverResponse;
}
async function getKeywordsMatches(keywords, index) {
    let serverResponse = {};
    const reqUrl = `${nasaImagesUrl}/search?keywords=${keywords}&media_type=image&page_size=${index ? index : 20}`;
    try {
        serverResponse = (await axios_1.default.get(reqUrl, { signal: AbortSignal.timeout(requestTimeout) })).data;
    }
    catch (err) {
        console.error("\x1b[31m", `[server-comms]`, "\x1b[0m", ": Encountered Error: \n", err);
    }
    return serverResponse;
}
async function getPotd() {
    let serverResponse = {};
    const reqUrl = `${potdUrl}?api_key=${NASA_API_KEY}`;
    try {
        serverResponse = (await axios_1.default.get(reqUrl, { signal: AbortSignal.timeout(requestTimeout) })).data;
    }
    catch (err) {
        console.error("\x1b[31m", `[server-comms]`, "\x1b[0m", ": Encountered Error: \n", err);
    }
    return serverResponse;
}
async function getRoverPhotos(request) {
    const date = request.date;
    let serverResponse = {};
    const reqUrl = `${roverPhotosUrl}/photos?earth_date=${date}&api_key=${NASA_API_KEY}`;
    try {
        serverResponse = (await axios_1.default.get(reqUrl, { signal: AbortSignal.timeout(requestTimeout) })).data;
    }
    catch (err) {
        console.error("\x1b[31m", `[server-comms]`, "\x1b[0m", ": Encountered Error: \n", err);
    }
    return serverResponse;
}
async function getStaticMap(latitude, longitude, width, height, zoom, isClient) {
    const scale = isClient ? '1' : '2';
    let serverResponse;
    const reqUrl = `${mapApiUrl}/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&scale=${scale}&maptype=satellite&key=${MAP_API_KEY}`;
    try {
        serverResponse = (await axios_1.default.get((0, signUrl_js_1.default)(reqUrl, MAP_URL_SIGNING_SECRET), { responseType: "arraybuffer", signal: AbortSignal.timeout(requestTimeout) })).data;
    }
    catch (err) {
        console.error("\x1b[31m", `[server-comms]`, "\x1b[0m", ": Encountered Error: \n", err);
    }
    return serverResponse;
}
