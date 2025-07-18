import axios from "axios";
import { resolve } from "path";
import dotenv from "dotenv";
import signUrl from "./signUrl.js";

dotenv.config({ path: resolve(__dirname, "../.env") });

const NASA_API_KEY = process.env.NASA_API_KEY;
const MAP_API_KEY = process.env.MAP_API_KEY;
const MAP_URL_SIGNING_SECRET = process.env.MAP_URL_SIGNING_SECRET;

const nasaImagesUrl = `https://images-api.nasa.gov`;
const potdUrl = `https://api.nasa.gov/planetary/apod`;
const roverPhotosUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity`;
const roverManifestUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity`;
const mapApiUrl = `https://maps.googleapis.com/maps/api`;

const requestTimeout = 14000;

async function getImages(query: string, index = "20") {
    let serverResponse = {};
    const reqUrl = `${nasaImagesUrl}/search?q=${query}&media_type=image&page_size=${index}`;

    try {
        serverResponse = (
            await axios.get(reqUrl, {
                signal: AbortSignal.timeout(requestTimeout),
            })
        ).data;
    } catch (err) {
        console.error(
            "\x1b[31m",
            `[server-comms]`,
            "\x1b[0m",
            ": Encountered Error: \n",
            err
        );
    }

    return serverResponse;
}

async function getImage(imageId: string) {
    let serverResponse = {};
    const reqUrl = `${nasaImagesUrl}/search?nasa_id=${imageId}&media_type=image`;

    try {
        serverResponse = (
            await axios.get(reqUrl, {
                signal: AbortSignal.timeout(requestTimeout),
            })
        ).data;
    } catch (err) {
        console.error(
            "\x1b[31m",
            `[server-comms]`,
            "\x1b[0m",
            ": Encountered Error: \n",
            err
        );
    }

    return serverResponse;
}

async function getKeywordsMatches(keywords: string, index: string) {
    let serverResponse = {};
    const reqUrl = `${nasaImagesUrl}/search?keywords=${keywords}&media_type=image&page_size=${
        index ? index : 20
    }`;

    try {
        serverResponse = (
            await axios.get(reqUrl, {
                signal: AbortSignal.timeout(requestTimeout),
            })
        ).data;
    } catch (err) {
        console.error(
            "\x1b[31m",
            `[server-comms]`,
            "\x1b[0m",
            ": Encountered Error: \n",
            err
        );
    }

    return serverResponse;
}

async function getPotd() {
    let serverResponse = {};
    const reqUrl = `${potdUrl}?api_key=${NASA_API_KEY}`;

    try {
        serverResponse = (
            await axios.get(reqUrl, {
                signal: AbortSignal.timeout(requestTimeout),
            })
        ).data;
    } catch (err) {
        console.error(
            "\x1b[31m",
            `[server-comms]`,
            "\x1b[0m",
            ": Encountered Error: \n",
            err
        );
    }

    return serverResponse;
}

async function getRoverPhotos(request: { date: string }) {
    const date = request.date;

    let serverResponse = {};
    let manifestRequestResponse = {};

    const reqUrl = `${roverPhotosUrl}/photos?earth_date=${date}&api_key=${NASA_API_KEY}`;
    const manifestReqUrl = `${roverManifestUrl}?api_key=${NASA_API_KEY}`;

    try {
        serverResponse = (
            await axios.get(reqUrl, {
                signal: AbortSignal.timeout(requestTimeout),
            })
        ).data;

        manifestRequestResponse = (
            await axios.get(manifestReqUrl, {
                signal: AbortSignal.timeout(requestTimeout),
            })
        ).data.photo_manifest;
    } catch (err) {
        console.error(
            "\x1b[31m",
            `[server-comms]`,
            "\x1b[0m",
            ": Encountered Error: \n",
            err
        );
    }

    return {
        ...serverResponse,
        roverManifest: manifestRequestResponse,
    };
}

async function getStaticMap(
    latitude: string,
    longitude: string,
    width: string,
    height: string,
    zoom: string,
    isClient: boolean
) {
    const scale = isClient ? "1" : "2";

    let serverResponse;
    const reqUrl = `${mapApiUrl}/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&scale=${scale}&maptype=satellite&key=${MAP_API_KEY}`;

    try {
        serverResponse = (
            await axios.get(signUrl(reqUrl, MAP_URL_SIGNING_SECRET), {
                responseType: "arraybuffer",
                signal: AbortSignal.timeout(requestTimeout),
            })
        ).data;
    } catch (err) {
        console.error(
            "\x1b[31m",
            `[server-comms]`,
            "\x1b[0m",
            ": Encountered Error: \n",
            err
        );
    }

    return serverResponse;
}

export {
    getImages,
    getImage,
    getKeywordsMatches,
    getPotd,
    getRoverPhotos,
    getStaticMap,
};
