import axios, { AxiosError, isAxiosError } from "axios";

const nasaImagesUrl = `/api/images/search`;
const potdUrl = `/api/potd`;
const roverPhotosUrl = `/api/roverphotos/search`;

const requestTimeout = 15000;

async function getImages(
    query: string,
    index: number
): Promise<GetImageResults> {
    const imageLink: string[] = [];
    const imageBlurHash: string[] = [];
    const id: string[] = [];
    const title: string[] = [];
    const description: string[] = [];
    const results: JSX.Element[] = [];
    let numberOfResults: number = 0;
    let error: string = "";

    try {
        const response = await axios.get(
            `${nasaImagesUrl}?query=${query}&page_size=${index ? index : 20}`,
            { signal: AbortSignal.timeout(requestTimeout) }
        );
        console.log(
            `${nasaImagesUrl}?query=${query}&page_size=${index ? index : 20}`
        );

        const imageData = response.data.collection;
        const metaData = response.data.collection.metadata;
        numberOfResults = metaData["total_hits"];

        console.log(query, index);

        for (let i = 0; i < Math.min(numberOfResults, index || 20); i++) {
            imageLink.push(imageData.items[i].links[0]?.href);
            id.push(imageData.items[i].data[0]?.["nasa_id"]);
            title.push(imageData.items[i].data[0].title);

            // return the data and remove the enclosing quotes (both single and double) added by JSON.stringify
            // See info for this particular regex here: https://stackoverflow.com/a/19156197
            description.push(
                imageData.items[i].data[0].description?.replace(
                    /^["'](.+(?=["']$))["']$/,
                    "$1"
                )
            );
        }

        if (numberOfResults <= 0) {
            throw new Error("No results found.");
        }
    } catch (err) {
        if (err instanceof Error && err.message === "No results found.") {
            error = "Sorry, your search query did not match any images.";
            console.log(error);
        } else if (err instanceof AxiosError && err.response?.status) {
            error = `Network error. The NASA API is most probably overworked. \n
                     HTTP Status code: ${err.response?.status}`;
        } else if (err instanceof AxiosError && err.message === "canceled") {
            error = `Network Error. Your search request timed out.`;
        } else if (err instanceof AxiosError) {
            error = `Network error. The NASA API is most probably overworked.`;
        } else if (err instanceof TypeError && index > 20) {
            error = "Sorry, an unexpected network error occurred.";
            console.log(err);
        } else if (err instanceof TypeError) {
            error = "Sorry, your search query did not match any images.";
            console.log(err);
        } else if (err instanceof Error) {
            error = `Unexpected error occured of type '${err.name}'.`;
        } else {
            error = `Unexpected error occured of type '${err}'.`;
        }
    }

    return {
        imageLink: imageLink,
        imageBlurHash: imageBlurHash,
        id: id,
        title: title,
        description: description,
        results: results,
        numberOfResults: numberOfResults,
        error: error,
    };
}

async function getImage(imageId: string): Promise<GetImageResult> {
    let imageLink: string = "";
    const imageBlurHash: string = "";
    let id: string = "";
    let title: string = "";
    let description: string = "";
    let keywords: string[] = [];
    const result: JSX.Element | null = null;
    let numberOfResults: number = 0;
    let error: string = "";

    try {
        const response = await axios.get(
            `${nasaImagesUrl}?image_id=${imageId}`,
            { signal: AbortSignal.timeout(requestTimeout) }
        );
        const imageData = response.data.collection;

        imageLink = imageData.items[0].links[0].href;
        id = imageData.items[0].data[0]["nasa_id"];
        title = imageData.items[0].data[0].title;
        description = imageData.items[0].data[0].description;
        keywords = imageData.items[0].data[0].keywords;
        numberOfResults = response.data.collection.metadata["total_hits"];

        if (numberOfResults <= 0) {
            throw new Error("Requested image not found.");
        }
    } catch (err) {
        if (
            err instanceof Error &&
            err.message === "Requested image not found."
        ) {
            error = "Sorry, the requested image was not found.";
        } else if (err instanceof AxiosError && err.response?.status) {
            error = `Network error. The NASA API is most probably overworked. \n
                     HTTP Status code: ${err.response?.status}`;
        } else if (err instanceof AxiosError && err.message === "canceled") {
            error = `Network Error. Your search request timed out.`;
        } else if (err instanceof AxiosError) {
            error = `Network error. The NASA API is most probably overworked.`;
        } else if (err instanceof TypeError) {
            error = "Sorry, the requested image was not found.";
        } else if (err instanceof Error) {
            error = `Unexpected error occured of type '${err.name}'.`;
        } else {
            error = `Unexpected error occured of type '${err}'.`;
        }
    }

    return {
        imageLink: imageLink,
        imageBlurHash: imageBlurHash,
        id: id,
        title: title,
        description: description,
        keywords: keywords,
        result: result,
        numberOfResults: numberOfResults,
        error: error,
    };
}

async function getKeywordsMatches(
    keywords: string,
    index: number
): Promise<getKeywordsResults> {
    const imageLink: string[] = [];
    const imageBlurHash: string[] = [];
    const id: string[] = [];
    const title: string[] = [];
    const description: string[] = [];
    let numberOfResults: number = 0;
    let error: string = "";

    try {
        const response = await axios.get(
            `${nasaImagesUrl}?keywords=${keywords}&page_size=${
                index ? index : 20
            }`,
            { signal: AbortSignal.timeout(requestTimeout) }
        );

        const imageData = response.data.collection;
        const metaData = response.data.collection.metadata;
        numberOfResults = metaData["total_hits"];

        for (let i = 0; i < numberOfResults; i++) {
            if (
                imageData.items[i] &&
                imageData.items[i].links &&
                imageData.items[i].links[0].href &&
                imageData.items[i].data[0]["nasa_id"] &&
                imageData.items[i].data[0].title &&
                imageData.items[i].data[0].description
            ) {
                imageLink.push(imageData.items[i].links[0].href);
                id.push(imageData.items[i].data[0]["nasa_id"]);
                title.push(imageData.items[i].data[0].title);

                // return the data and remove the enclosing quotes (both single and double) added by JSON.stringify
                // See info for this particular regex here: https://stackoverflow.com/a/19156197
                description.push(
                    imageData.items[i].data[0].description.replace(
                        /^["'](.+(?=["']$))["']$/,
                        "$1"
                    )
                );
            }
        }

        if (numberOfResults <= 0) {
            throw new Error("No results found.");
        }
    } catch (err) {
        console.log(err);

        if (err instanceof Error && err.message === "No results found.") {
            error = "No keyword matches found.";
            console.log(err);
        } else if (err instanceof AxiosError && err.response?.status) {
            error = `Network error. The NASA API is most probably overworked. \n
                     HTTP Status code: ${err.response?.status}`;
        } else if (err instanceof AxiosError && err.message === "canceled") {
            error = `Network Error. The search request timed out.`;
        } else if (err instanceof AxiosError) {
            error = `Network error. The NASA API is most probably overworked.`;
        } else if (err instanceof TypeError) {
            error = `No keyword matches found.`;
            console.log(err);
        } else if (err instanceof Error) {
            error = `Unexpected error occured of type '${err.name}'.`;
        } else {
            error = `Unexpected error occured of type '${err}'.`;
        }
    }

    return {
        imageLink: imageLink,
        imageBlurHash: imageBlurHash,
        id: id,
        title: title,
        description: description,
        numberOfResults: numberOfResults,
        error: error,
    };
}

async function getPotd(): Promise<getPotdResults> {
    let copyright: string = "";
    let date: string = "";
    let description: string = "";
    let url: string = "";
    let hdUrl: string = "";
    let title: string = "";
    let error: string = "";

    try {
        const response = (
            await axios.get(potdUrl, {
                signal: AbortSignal.timeout(requestTimeout),
            })
        ).data;

        copyright = response.copyright;
        date = response.date;
        description = response.explanation;
        url = response.url;
        hdUrl = response.hdurl;
        title = response.title;
        error = response.error;
    } catch (err) {
        console.warn(err);
        if (typeof err === "string") error = err;
        if (isAxiosError(err)) {
            if (err.message === "Network Error") {
                error = "NET_ERR";
            } else if (err.message === `Request failed with status code 429`) {
                error = "REQ_LIM_EXCEED";
            }
        }
    }

    return {
        copyright: copyright,
        date: date,
        description: description,
        url: url,
        hdUrl: hdUrl,
        title: title,
        error: error,
    };
}

async function getRoverPhotos(
    request: GetRoverPhotosRequest,
    initialLoad: boolean
): Promise<getRoverPhotosResults> {
    const date = request.date;
    const photoIds: string[] = [];
    const photoUrls: string[] = [];
    let totalPhotos: string = "0";
    let error = "";

    console.log(`${roverPhotosUrl}?date=${date}`);

    try {
        const response = await axios.get(`${roverPhotosUrl}?date=${date}`, {
            signal: AbortSignal.timeout(requestTimeout),
        });

        console.log(response.data);

        const photos = response.data.photos;
        const roverManifest = response.data.roverManifest;

        totalPhotos = roverManifest.total_photos.toString();

        for (let i = 0; i < photos.length; i++) {
            photoUrls.push(photos[i]["img_src"]);
            photoIds.push(photos[i]["id"].toString());
        }

        if (photos.length <= 0) {
            throw new TypeError("No results found.");
        }

    } catch (err) {
        console.log("Encountered an Error: ", err);

        if (err instanceof AxiosError) {
            error = `Sorry, a network error occurred. There is probably an error on the server side.\n\nPlease try again later.`;
        } else if (err instanceof TypeError && initialLoad) {
            error = `Sorry, Curiosity did not take any pictures that day😢.`;
        } else if (err instanceof TypeError) {
            error = `Sorry, an unexpected network error occurred.`;
        } else {
            error = `Sorry, an internal error occurred. Please try again later.`;
        }
    }

    return {
        photoIds: photoIds,
        photoUrls: photoUrls,
        totalPhotos: totalPhotos,
        error: error,
    };
}

type GetRoverPhotosRequest = {
    date: string;
};

type GetImageResults = {
    imageLink: string[];
    imageBlurHash: string[];
    id: string[];
    title: string[];
    description: string[];
    results: JSX.Element[];
    numberOfResults: number;
    error: string;
};

type GetImageResult = {
    imageLink: string;
    imageBlurHash: string;
    id: string;
    title: string;
    description: string;
    keywords: string[];
    result: JSX.Element | null;
    numberOfResults: number;
    error: string;
};

type getPotdResults = {
    copyright: string;
    date: string;
    description: string;
    url: string;
    hdUrl: string;
    title: string;
    error: string;
};

type getKeywordsResults = {
    imageLink: string[];
    imageBlurHash: string[];
    id: string[];
    title: string[];
    description: string[];
    numberOfResults: number;
    error: string;
};

type getRoverPhotosResults = {
    photoIds: string[];
    photoUrls: string[];
    totalPhotos: string;
    error: string;
};

const getImagesPrototype: GetImageResults = {
    imageLink: [],
    imageBlurHash: [],
    id: [],
    title: [],
    description: [],
    results: [],
    numberOfResults: 0,
    error: "",
};

const getImagePrototype: GetImageResult = {
    imageLink: "",
    imageBlurHash: "",
    id: "",
    title: "",
    description: "",
    keywords: [],
    result: null,
    numberOfResults: 0,
    error: "",
};

const getKeywordsPrototype: getKeywordsResults = {
    imageLink: [],
    imageBlurHash: [],
    id: [],
    title: [],
    description: [],
    numberOfResults: 0,
    error: "",
};

const getPotdPrototype: getPotdResults = {
    copyright: "",
    date: "",
    description: "",
    url: "",
    hdUrl: "",
    title: "",
    error: "",
};

const getRoverPhotosPrototype: getRoverPhotosResults = {
    photoIds: [],
    photoUrls: [],
    totalPhotos: "0",
    error: "",
};

export {
    getImages,
    getImage,
    getKeywordsMatches,
    getPotd,
    getRoverPhotos,
    getImagesPrototype,
    getImagePrototype,
    getKeywordsPrototype,
    getPotdPrototype,
    getRoverPhotosPrototype,
};

export type {
    GetImageResults,
    GetImageResult,
    getPotdResults,
    getKeywordsResults,
    getRoverPhotosResults,
};
