import "./styles/PictureOfTheDay.css";
import { useState } from "react";
import { getPotd, getPotdPrototype } from "../services/communication";
import isEqual from "lodash.isequal";
import cloneDeep from "lodash.clonedeep";

function PictureOfTheDay() {
    const [potdResults, setPotdResults] = useState(getPotdPrototype);
    const [loaded, setLoaded] = useState(false);

    const errorCodes = {
        netError: "NET_ERR",
        reqLimitExceeded: "REQ_LIM_EXCEED",
        generalError: "Error",
    };
    const errorTexts = {
        netError: `Sorry, a network error occurred.`,
        reqLimitExceeded: `Too many requests, try again after 1 hour.`,
        generalError: `Sorry, an unexpected error occurred.`,
        miscError: ``,
    };

    const handleDownload = () => {
        const continueDownload = confirm(
            "The NASA APIs don't allow direct downloads from external sites (like this one). Do you want to open the original image instead, so you can save it manually?"
        );

        if (continueDownload) {
            window.location.href = potdResults.hdUrl;
        }
    };

    getPotd()
        .then((response) => {
            const responseClone = cloneDeep(response);

            const errorKey = Object.keys(errorCodes).find(
                (key) =>
                    errorCodes[key as keyof typeof errorCodes] ===
                    responseClone.error
            );
            if (errorKey)
                responseClone.error =
                    errorTexts[errorKey as keyof typeof errorTexts];

            if (!isEqual(responseClone, potdResults))
                setPotdResults(responseClone);
            setLoaded(true);
        })
        .catch((error: Error) => {
            errorTexts.miscError = `Unexpected error occured of type '${error.name}'.`;

            if (
                error instanceof Error &&
                error.message === errorCodes.netError
            ) {
                if (potdResults.error !== errorTexts.netError) {
                    setPotdResults({
                        ...getPotdPrototype,
                        error: errorTexts.netError,
                    });
                }
                console.warn(
                    `Encountered a network error. \nError message: ${
                        error.message || "none"
                    }`
                );
            } else if (
                error instanceof Error &&
                error.message === errorCodes.reqLimitExceeded
            ) {
                if (potdResults.error !== errorTexts.reqLimitExceeded) {
                    setPotdResults({
                        ...getPotdPrototype,
                        error: errorTexts.reqLimitExceeded,
                    });
                }
                console.warn(
                    `Too many requests. \nError message: ${
                        error.message || "none"
                    }`
                );
            } else if (
                error instanceof Error &&
                error.message === errorCodes.generalError
            ) {
                if (potdResults.error !== errorTexts.generalError) {
                    setPotdResults({
                        ...getPotdPrototype,
                        error: errorTexts.generalError,
                    });
                }
                console.warn(
                    `Encountered an Error. \nError message: ${
                        error.message || "none"
                    }`
                );
            } else {
                if (
                    potdResults.error !== error.message &&
                    potdResults.error !== errorTexts.miscError &&
                    !Object.values(errorTexts).includes(potdResults.error)
                ) {
                    setPotdResults({
                        ...getPotdPrototype,
                        error: error.message || errorTexts.miscError,
                    });
                }
                console.warn(`Encountered ${error.name}.`);
            }
        });

    if (potdResults.error) {
        return (
            <div id="Potd">
                <h1 id="potd-error">{potdResults.error}</h1>
            </div>
        );
    }

    if (loaded) {
        return (
            <div id="Potd">
                <h1 id="potd-heading">Picture of the Day</h1>
                <br />
                <p id="potd-date">{potdResults.date}</p>

                <div id="potd-main">
                    <figure id="potd-figure">
                        <img
                            id="potd-img"
                            src={potdResults.url}
                            alt={potdResults.title}
                        />
                        {potdResults.copyright ? (
                            <figcaption id="potd-copyright">
                                Image credit: {potdResults.copyright}
                            </figcaption>
                        ) : null}
                    </figure>

                    <div id="potd-data">
                        <p id="potd-title">{potdResults.title}</p>
                        <p id="potd-description">{potdResults.description}</p>
                        <code id="potd-img-address">
                            <p id="potd-address-heading">Image address:</p>
                            {potdResults.hdUrl ? (
                                <a
                                    href={potdResults.hdUrl}
                                    className="potd-img-link"
                                >
                                    <p>{potdResults.hdUrl}</p>
                                </a>
                            ) : (
                                <p>Not provided.</p>
                            )}
                        </code>
                        {/* <a
                            id="potd-download-link"
                            href={potdResults.hdUrl}
                            download
                        >
                            <p id="potd-download-text">Download Image</p>
                        </a> */}
                        <button
                            id="potd-download-link"
                            onClick={handleDownload}
                        >
                            <p id="potd-download-text">Download Image</p>
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div id="Potd">
                <div className="loader"></div>
            </div>
        );
    }
}

export default PictureOfTheDay;
