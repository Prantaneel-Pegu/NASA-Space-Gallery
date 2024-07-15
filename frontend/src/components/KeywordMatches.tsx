import './styles/KeywordMatches.css';
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';
import { getKeywordsMatches, getKeywordsPrototype, getKeywordsResults } from '../services/communication';
import SearchResultsImage from "./SearchResultsImage";
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useDebouncedCallback } from 'use-debounce';

type Props = {
    keywords: string[],
    exclude: string[]
}

function KeywordMatches ({ keywords, exclude }: Props) {
    const [serverResponse, setServerResponse] = useState<getKeywordsResults>(getKeywordsPrototype);
    const [keywordResults, setKeywordResults] = useState<JSX.Element[]>([]);
    const [loaded, setLoaded] = useState(false);
    const loadedCounter = useRef(0);
    const keywordsStr = keywords?.join() || "";
    const excludeJSON = JSON.stringify(exclude);

    const getKMFromServer = useCallback<() => void>(() => {
        console.warn("IN CALLBACK", serverResponse);
        
        const idsToExclude = JSON.parse(excludeJSON);

        getKeywordsMatches(keywordsStr)
            .then(response => {
                setServerResponse(response);
                
                const newServerResponse = cloneDeep(response); 
                console.log("GOT RESPONSE: ", newServerResponse); 

                const resultTiles: JSX.Element[] = [];

                if (newServerResponse.error !== "") {
                    const errorElement = <div id="KeywordMatches">
                                            <p id="km-error-info">
                                                {newServerResponse.error.split('\n').map((subStr, id) => <p key={id}>{subStr}<br /></p>)}
                                            </p>
                                         </div>

                    resultTiles.push(errorElement);
                    setKeywordResults([...resultTiles]);
                    console.error("ENCOUNTERED ERROR IN USEEFFECT", ...resultTiles);                    
                    return;
                } 
                
                for(let i = 0; i < Math.min(newServerResponse.numberOfResults - 1, 20); i++) {
                    const imageLink = newServerResponse.imageLink[i];
                    const id = newServerResponse.id[i];
                    const title = newServerResponse.title[i];
                    const description = newServerResponse.description[i];
                    
                    const descriptionLength = 70;
                    const descriptionShort = description.length > descriptionLength ? description.substring(0, descriptionLength - 3) + "..." : description;
            
                    if (!idsToExclude.includes(id)) {
                        resultTiles.push(
                                <Link to={`/gallery/${id}`} className="keyword-matches-link" key={id}>
                                    <article className="keyword-matches-tile">                                        
                                        <SearchResultsImage src={imageLink} alt={title} classes="keyword-matches-image" />
                                        <p className="keyword-matches-description">
                                            {descriptionShort}
                                        </p>
                                    </article>
                                </Link>
                        )
                    }    
                }

                if (!isEqual(keywordResults, resultTiles)) {
                    console.log(keywordResults, newServerResponse);
                    setKeywordResults(resultTiles)
                }
                if (loadedCounter.current === 0) loadedCounter.current += 20;
                setLoaded(true);
            })
            .catch((error: Error) => { 
                // If no keyword matches found, do this
                if (error instanceof TypeError) {
                    if (serverResponse.error !== 'No keyword matches found.') {
                        setServerResponse({...getKeywordsPrototype, error: 'No keyword matches found.'})
                        console.log(`Encountered TypeError.`);
                    }
                    console.log('Encountered TypeError');            
                } else if (error instanceof Error && error.name === "Error") {
                    if (serverResponse.error !== `Sorry, an unexpected error occurred.`) {
                        setServerResponse({...getKeywordsPrototype, error: `Sorry, an unexpected error occurred.`});                       
                    }
                    console.log(`Encountered an Error. \nError message: ${error.message || 'none'}`);
                } else {
                    if (serverResponse.error === "") {
                        setServerResponse({...getKeywordsPrototype, error: `Unexpected error occured of type '${error.name}'.`});
                    }
                    console.log(`Encountered ${error.name}.`);
                }
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    useEffect(() => {  
        console.warn("IN USEEFFECT");
        getKMFromServer()
        console.warn("EXITING USEEFFECT");
    }, [getKMFromServer]);

    function loadMoreMatches(numberToLoad = 20) {
        console.log("IN LOAD MORE", serverResponse);
        
        const resultTiles: JSX.Element[] = [];

        for (let i = 0; i < Math.min(serverResponse.imageLink.length, numberToLoad + loadedCounter.current); i++) {
            const imageLink = serverResponse.imageLink[i];
            const id = serverResponse.id[i];
            const title = serverResponse.title[i] ;
            const description = serverResponse.description[i];

            const descriptionLength = 70;
            const descriptionShort = description.length > descriptionLength ? description.substring(0, descriptionLength - 3) + "..." : description;

            if (![...exclude].includes(id)) {
                resultTiles.push(
                        <Link to={`/gallery/${id}`} className="keyword-matches-link" key={id}>
                            <article className="keyword-matches-tile">
                                <SearchResultsImage src={imageLink} alt={title} classes="keyword-matches-image" />
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
    }

    const debouncedLoadMoreMatches = useDebouncedCallback((numberToLoad = 20) => loadMoreMatches(numberToLoad), 3000);

    // Display errors, if any. Also split the error message if a "\n" character is encountered.
    if (serverResponse.error !== "") {
        return (
            <div id="KeywordMatches">
                <h2 id="error-info">
                    {serverResponse.error.split('\n').map((subStr, id) => <p key={id}>{subStr}<br /></p>)}
                </h2>
            </div>
        )
    }

    if (loaded) {
            return (
                <>
                    <div id="KeywordMatches">
                        {!serverResponse.error && 
                            <h3 id="keyword-matches-heading">
                                See more pictures like this:
                            </h3>
                        }
                        <div className="keyword-matches-grid">
                            <InfiniteScroll 
                                next={debouncedLoadMoreMatches} 
                                hasMore={(serverResponse.imageLink.length - exclude.length !== keywordResults.length) && serverResponse.error === ""} 
                                children={
                                    serverResponse.error === "" ? 
                                    <ResponsiveMasonry columnsCountBreakPoints={{320: 1, 550: 2, 900: 3, 1200: 4}}>
                                        <Masonry gutter='2em'>
                                            {keywordResults}
                                        </Masonry>
                                    </ResponsiveMasonry> : keywordResults
                                    } 
                                loader={<div className="loader"></div>} 
                                dataLength={keywordResults.length}
                                scrollThreshold={0.8}
                                style={{overflow: "visible"}}> 
                                {/* overflow: "visible" is necessary or or it will provide unnecessary scrollbars */}
                            </InfiniteScroll>
                        </div>
                    </div>
                </>
            ) 
        } 
    else return (
            <>
                <div className="loader"></div>
            </> 
        )
}

export default KeywordMatches;