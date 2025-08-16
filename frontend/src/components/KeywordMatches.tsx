import "./styles/KeywordMatches.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import cloneDeep from "lodash.clonedeep";
import isEqual from "lodash.isequal";
import {
    getKeywordsMatches,
    getKeywordsPrototype,
    getKeywordsResults,
} from "../services/communication";
import SearchResultsImage from "./SearchResultsImage";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type Props = {
    keywords: string[];
    exclude: string[];
};

function KeywordMatches({ keywords, exclude }: Props) {
    const [serverResponse, setServerResponse] =
        useState<getKeywordsResults>(getKeywordsPrototype);
    const [keywordResults, setKeywordResults] = useState<JSX.Element[]>([]);
    const [loaded, setLoaded] = useState(false);
    const loadedCounter = useRef(0);
    const keywordsStr = keywords?.join() || "";
    const excludeJSON = JSON.stringify(exclude);

    const getKMFromServer = useCallback<() => void>(() => {
        console.log("IN CALLBACK", serverResponse);

        const idsToExclude = JSON.parse(excludeJSON);

        getKeywordsMatches(keywordsStr, loadedCounter.current)
            .then((response) => {
                setServerResponse(response);

                const newServerResponse = cloneDeep(response);
                console.log("GOT RESPONSE: ", newServerResponse);

                const resultTiles: JSX.Element[] = [];

                if (newServerResponse.error !== "") {
                    const errorElement = (
                        <div id="km-error-element" key="KM-ERROR-ELEMENT">
                            <p id="km-error-info">
                                {newServerResponse.error
                                    .split("\n")
                                    .map((subStr, id) => (
                                        <span key={id}>
                                            {subStr}
                                            <br />
                                        </span>
                                    ))}
                            </p>
                        </div>
                    );

                    resultTiles.push(errorElement);
                    setKeywordResults([...resultTiles]);
                    setLoaded(true);
                    console.error(
                        "ENCOUNTERED ERROR IN USEEFFECT",
                        ...resultTiles
                    );
                    return;
                }

                for (
                    let i = 0;
                    i < Math.min(newServerResponse.numberOfResults - 1, 20);
                    i++
                ) {
                    const imageLink = newServerResponse.imageLink[i];
                    const id = newServerResponse.id[i];
                    const title = newServerResponse.title[i];
                    const description = newServerResponse.description[i];

                    const descriptionLength = 70;
                    const descriptionShort =
                        description.length > descriptionLength
                            ? description.substring(0, descriptionLength - 3) +
                              "..."
                            : description;

                    if (!idsToExclude.includes(id)) {
                        resultTiles.push(
                            <Link
                                to={`/gallery/${id}`}
                                className="keyword-matches-link"
                                key={id}
                            >
                                <article className="keyword-matches-tile">
                                    <SearchResultsImage
                                        src={imageLink}
                                        alt={title}
                                        classes="keyword-matches-image"
                                    />
                                    <p className="keyword-matches-description">
                                        {descriptionShort}
                                    </p>
                                </article>
                            </Link>
                        );
                    }
                }

                if (!isEqual(keywordResults, resultTiles)) {
                    console.log(keywordResults, newServerResponse);
                    setKeywordResults(resultTiles);
                }
                if (loadedCounter.current === 0) loadedCounter.current += 20;
                setLoaded(true);
            })
            .catch((error: Error) => {
                // If no keyword matches found, do this
                if (error instanceof TypeError) {
                    if (serverResponse.error !== "No keyword matches found.") {
                        setServerResponse({
                            ...getKeywordsPrototype,
                            error: "No keyword matches found.",
                        });
                        console.log(`Encountered TypeError.`);
                    }
                    console.log("Encountered TypeError");
                } else if (error instanceof Error && error.name === "Error") {
                    if (
                        serverResponse.error !==
                        `Sorry, an unexpected error occurred.`
                    ) {
                        setServerResponse({
                            ...getKeywordsPrototype,
                            error: `Sorry, an unexpected error occurred.`,
                        });
                    }
                    console.log(
                        `Encountered an Error. \nError message: ${
                            error.message || "none"
                        }`
                    );
                } else {
                    if (serverResponse.error === "") {
                        setServerResponse({
                            ...getKeywordsPrototype,
                            error: `Unexpected error occured of type '${error.name}'.`,
                        });
                    }
                    console.log(`Encountered ${error.name}.`);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("IN USEEFFECT");
        getKMFromServer();
        console.log("EXITING USEEFFECT");
    }, [getKMFromServer]);

    function loadMoreMatches(numberToLoad = 20) {
        console.log("IN LOAD MORE", serverResponse);

        getKeywordsMatches(
            keywordsStr,
            loadedCounter.current + numberToLoad
        ).then((serverResponse) => {
            setServerResponse(serverResponse);
            const resultTiles: JSX.Element[] = [];

            if (serverResponse.error !== "") {
                const errorElement = (
                    <div id="km-error-element" key="KM-ERROR-ELEMENT">
                        <p id="km-error-info">
                            {serverResponse.error
                                .split("\n")
                                .map((subStr, id) => (
                                    <span key={id}>
                                        {subStr}
                                        <br />
                                    </span>
                                ))}
                        </p>
                    </div>
                );

                resultTiles.push(...keywordResults);
                resultTiles.pop();
                resultTiles.push(errorElement);
                setKeywordResults([...resultTiles]);
                console.log(resultTiles);

                console.error("ENCOUNTERED ERROR IN USEEFFECT", resultTiles);
                return;
            }

            console.log(
                serverResponse.numberOfResults,
                numberToLoad + loadedCounter.current
            );

            for (
                let i = 0;
                i <
                Math.min(
                    serverResponse.numberOfResults,
                    numberToLoad + loadedCounter.current
                );
                i++
            ) {
                const imageLink = serverResponse.imageLink[i];
                const id = serverResponse.id[i];
                const title = serverResponse.title[i];
                const description = serverResponse.description[i];

                const descriptionLength = 70;
                const descriptionShort =
                    description?.length > descriptionLength
                        ? description.substring(0, descriptionLength - 3) +
                          "..."
                        : description;

                if (![...exclude].includes(id)) {
                    resultTiles.push(
                        <Link
                            to={`/gallery/${id}`}
                            className="keyword-matches-link"
                            key={id}
                        >
                            <article className="keyword-matches-tile">
                                <SearchResultsImage
                                    src={imageLink}
                                    alt={title}
                                    classes="keyword-matches-image"
                                />
                                <p className="keyword-matches-description">
                                    {descriptionShort}
                                </p>
                            </article>
                        </Link>
                    );
                }
            }
            loadedCounter.current += numberToLoad;

            console.log(keywordResults, resultTiles, loadedCounter.current);

            if (!isEqual(keywordResults, resultTiles)) {
                setKeywordResults(resultTiles);
                console.log(keywordResults, resultTiles);
            }
        });
    }

    if (loaded) {
        return (
            <>
                <div id="KeywordMatches">
                    {!serverResponse.error &&
                    serverResponse.numberOfResults - exclude.length >
                        keywordResults.length ? (
                        <h3 id="keyword-matches-heading">
                            See more pictures like this:
                        </h3>
                    ) : null}
                    <div className="keyword-matches-grid">
                        <InfiniteScroll
                            next={loadMoreMatches}
                            hasMore={
                                serverResponse.numberOfResults -
                                    exclude.length >
                                    keywordResults.length &&
                                serverResponse.error === ""
                            }
                            children={
                                serverResponse.error ? (
                                    keywordResults.length === 1 ? (
                                        keywordResults
                                    ) : (
                                        <ResponsiveMasonry
                                            columnsCountBreakPoints={{
                                                320: 1,
                                                550: 2,
                                                900: 3,
                                                1200: 4,
                                            }}
                                        >
                                            <Masonry gutter="2em">
                                                {keywordResults}
                                            </Masonry>
                                        </ResponsiveMasonry>
                                    )
                                ) : (
                                    <ResponsiveMasonry
                                        columnsCountBreakPoints={{
                                            320: 1,
                                            550: 2,
                                            900: 3,
                                            1200: 4,
                                        }}
                                    >
                                        <Masonry gutter="2em">
                                            {keywordResults}
                                        </Masonry>
                                    </ResponsiveMasonry>
                                )
                            }
                            loader={<div className="loader"></div>}
                            dataLength={keywordResults.length}
                            scrollThreshold={0.8}
                            style={{ overflow: "visible" }}
                        >
                            {/* overflow: "visible" is necessary or or it will provide unnecessary scrollbars */}
                        </InfiniteScroll>
                    </div>
                </div>
            </>
        );
    } else
        return (
            <>
                <div className="loader"></div>
            </>
        );
}

export default KeywordMatches;
