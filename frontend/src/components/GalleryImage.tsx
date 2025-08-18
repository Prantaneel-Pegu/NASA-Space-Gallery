import "./styles/GalleryImage.css";
import { useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import LazyLoad from "react-lazy-load";
import { getImage, getImagePrototype } from "../services/communication";
import KeywordMatches from "./KeywordMatches";

type galleryParams = { id: string };

function GalleryImage() {
    const [imageData, setImageData] = useState(getImagePrototype);
    const [loaded, setLoaded] = useState(false);
    const scrollPosition = useRef(0);
    const params = useParams<galleryParams>();
    const oldParams = useRef<galleryParams>({ id: params.id || "" });
    const imageId = params.id;

    // Scroll to top
    window.scrollTo(0, 0);

    useLayoutEffect(() => {
        scrollTo(0, scrollPosition.current);
    });

    const handleDownload = () => {
        const continueDownload = confirm(
            "The NASA APIs don't allow direct downloads from external sites (like this one). Do you want to open the original image instead, so you can save it manually?"
        );

        if (continueDownload) {
            window.location.href = imageData.imageLink;
        }
    };

    useEffect(() => {
        if (imageId) {
            getImage(imageId)
                .then((response) => {
                    scrollPosition.current = Math.round(window.scrollY);
                    oldParams.current.id = imageId;
                    setImageData({ ...response });
                    setLoaded(true);
                })
                .catch((error: Error) => {
                    // If no keyword matches found, do this
                    console.log(error);
                    if (error instanceof TypeError) {
                        if (imageData.error !== error.name) {
                            setImageData({
                                ...getImagePrototype,
                                error: "No keyword matches found.",
                            });
                        }
                        console.log("Encountered TypeError");
                    } else if (
                        error instanceof Error &&
                        error.name === "Error"
                    ) {
                        if (imageData.error !== error.name) {
                            setImageData({
                                ...getImagePrototype,
                                error: `Sorry, an unexpected error occurred.`,
                            });
                        }
                        console.log(
                            `Encountered an Error. \nError message: ${
                                error.message || "none"
                            }`
                        );
                    } else {
                        if (imageData.error !== error.name) {
                            setImageData({
                                ...getImagePrototype,
                                error: `Unexpected error occured of type '${error.name}'.`,
                            });
                        }
                        console.log(`Encountered ${error.name}.`);
                    }
                });
        } else {
            setImageData({
                ...getImagePrototype,
                error: "Sorry, the requested image was not found.",
            });
        }
    }, [imageId, imageData.error]);

    // Display errors, if any. Also split the error message if a "\n" character is encountered.
    if (imageData.error !== "") {
        return (
            <div id="GalleryImage">
                <h1 id="error-info">
                    {imageData.error.split("\n").map((subStr) => (
                        <>
                            {subStr}
                            <br />
                        </>
                    ))}
                </h1>
            </div>
        );
    }

    if (loaded && params.id === oldParams.current.id) {
        return (
            <div id="GalleryImage">
                <div id="gi-main">
                    <div id="gallery-image-container">
                        <img
                            src={imageData.imageLink}
                            alt={imageData.title}
                            id="gallery-image"
                        />
                    </div>
                    <div id="gi-data">
                        <h1 id="gi-image-title">{imageData.title}</h1>
                        <br />
                        <p id="gi-description">{imageData.description}</p>
                        <br />
                        <code id="gallery-image-address">
                            <p id="gallery-address-heading">Image address:</p>
                            <a
                                href={imageData.imageLink}
                                className="gallery-img-link"
                            >
                                {imageData.imageLink}
                            </a>
                        </code>
                        <button
                            id="gallery-download-link"
                            onClick={handleDownload}
                        >
                            <p>Download Image</p>
                        </button>
                    </div>
                </div>
                <LazyLoad>
                    <KeywordMatches
                        keywords={imageData.keywords}
                        exclude={[imageData.id]}
                    />
                </LazyLoad>
            </div>
        );
    } else {
        return (
            <div id="GalleryImage">
                <div className="loader"></div>
            </div>
        );
    }
}

export default GalleryImage;
