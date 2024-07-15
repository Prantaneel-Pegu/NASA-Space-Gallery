import './styles/SearchResults.css';
import { getImages, GetImageResults } from '../services/communication';
import SearchResultsImage from './SearchResultsImage';
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";  
import { Link, useSearchParams } from 'react-router-dom';
import isEqual from 'lodash.isequal';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import cloneDeep from 'lodash.clonedeep';

type SearchQuery = {
    query: string
}

type SearchResult = GetImageResults;

type SearchResultsProps = {
    searchQuery: SearchQuery,
    setSearchQuery: Dispatch<SetStateAction<SearchQuery>>,
    searchResult: SearchResult,
    setSearchResult: Dispatch<SetStateAction<GetImageResults>>,
    newSubmitEvent: boolean,
    setNewSubmitEvent: Dispatch<SetStateAction<boolean>>,
    clickBackEvent: boolean,
    setClickBackEvent: Dispatch<SetStateAction<boolean>>,
}

function SearchResults (props: SearchResultsProps) {    
    const [searchParams] = useSearchParams();
    const searchQuery = { ...props.searchQuery, query: searchParams.get('search') || "" } ;
    const lastSearchQuery = useRef<SearchQuery>(cloneDeep(searchQuery));
    const searchResult = props.searchResult;
    const lastSearchResult = useRef<SearchResult>(cloneDeep(searchResult));
    const setSearchResult = props.setSearchResult;
    const newSubmitEvent = props.newSubmitEvent;
    const setNewSubmitEvent = props.setNewSubmitEvent;
    const [numberOfResults, setNumberOfResults] = useState(0);
    const clickBackEvent = props.clickBackEvent;
    const setClickBackEvent = props.setClickBackEvent;
    const loadedCounter = useRef(0);
    const scrollPosition = useRef(0);

    useLayoutEffect(() => {
        if (newSubmitEvent || clickBackEvent) scrollPosition.current = 0;
        scrollTo(0, scrollPosition.current);
    }, [searchResult, searchQuery.query, newSubmitEvent, clickBackEvent])

    useEffect(() => {

        // If useEffect reruns unnecessarily, return
        if (!newSubmitEvent) return;  
        
        // If query is empty, return from useeffect.
        if (!searchQuery.query.toString().trim()) return;

        if (searchQuery.query !== lastSearchQuery.current.query) loadedCounter.current = 0;
        
        getImages(searchQuery.query, loadedCounter.current).then(response => {
            console.warn("IMAGES RECEIVED", scrollPosition.current);
            lastSearchQuery.current.query = searchQuery.query;

            const newSearchResult: GetImageResults = {
                ...searchResult, 
                imageLink: response.imageLink,
                id: response.id,
                title: response.title,
                description: response.description,
                numberOfResults: response.numberOfResults,
                error: response.error
            }
            setNumberOfResults(newSearchResult.numberOfResults);

            const resultTiles = [];
        
            // If errors are present, return to display them
            if (newSearchResult.error !== "") {
                const errorElement = <div id="sr-error" key="SR-ERROR-ELEMENT">
                                        <h3 id="error-info">
                                            {newSearchResult.error.split('\n').map((subStr, id) => <p key={id}>{subStr}<br /></p>)}
                                        </h3>
                                     </div>;
                console.log(searchQuery.query, lastSearchQuery.current.query);
                
                resultTiles.push(errorElement);
                setSearchResult({...searchResult, results: resultTiles, error: newSearchResult.error});
                setNumberOfResults(0);
                setNewSubmitEvent(false);
                lastSearchResult.current = {...searchResult, results: resultTiles, error: newSearchResult.error};
                console.log(searchQuery.query, lastSearchQuery.current.query);
                
                console.error("ENCOUNTERED ERROR IN USEEFFECT", {...searchResult, results: resultTiles, error: newSearchResult.error});  
                return;
            }
   
            for(let i = 0; i < Math.min(newSearchResult.numberOfResults, newSearchResult.imageLink.length); i++) {
                const imageLink = newSearchResult.imageLink[i];
                const id = newSearchResult.id[i];
                const title = newSearchResult.title[i]; 
                const description = newSearchResult.description[i];              
            
                const descriptionLength = 70;
                const descriptionShort = description.length > descriptionLength ? description.substring(0, descriptionLength - 3) + "..." : description;
    
                resultTiles.push(                                  
                                    <Link to={`/gallery/${id}`} className="search-results-link" key={id}>
                                        <article className="results-tile">                                        
                                            <SearchResultsImage src={imageLink} alt={title} classes="results-image" />
                                            <p className="results-description">
                                                {descriptionShort}
                                            </p>
                                        </article>
                                    </Link>                    
                                )
            }
            console.log(resultTiles);
            newSearchResult.results = resultTiles;

            setNewSubmitEvent(false);
            setClickBackEvent(false);
            if (!isEqual(newSearchResult, searchResult)) {
                setSearchResult(newSearchResult);
                lastSearchResult.current = cloneDeep(newSearchResult);
                console.warn("IMAGES SET");
            }

            if (loadedCounter.current === 0) loadedCounter.current = newSearchResult.imageLink.length;

            console.log(newSearchResult);          
        })
        .catch((error: Error) => { 
            // If getImages did not return any data, then do this
            if (error instanceof TypeError) {
                setSearchResult({...searchResult, error: 'Sorry, your search query did not match any images.'})
                console.log('Encountered TypeError', error);            
            } else if (error instanceof Error && error.name === "Error") {
                if (searchResult.error !== error.name) {
                    setSearchResult({...searchResult, error: `Sorry, an unexpected error occurred.`});
                }
                console.log(`Encountered an Error. \nError message: ${error.message || 'none'}`);
            } else {
                setSearchResult({...searchResult, error: `Unexpected error occured of type '${error.name}'.`});
                console.log(`Encountered ${error.name}.`);
            }
        })
    }, [searchQuery.query, setSearchResult, searchResult, newSubmitEvent, setNewSubmitEvent, clickBackEvent, setClickBackEvent])

    function loadMoreImages(numberOfImages = 20) { 
        console.log("TRIGGERED!", loadedCounter.current + numberOfImages, scrollPosition.current);
             
        getImages(searchQuery.query, loadedCounter.current + numberOfImages)
            .then(response => {
                scrollPosition.current = Math.round(window.scrollY);
                console.log("LOADED MORE", scrollPosition.current);
                console.log(loadedCounter, loadedCounter.current + numberOfImages, window.scrollY, scrollPosition.current);

                const newSearchResult: GetImageResults = { 
                    imageLink: response.imageLink,
                    imageBlurHash: response.imageBlurHash,
                    id: response.id,
                    title: response.title,
                    description: response.description,
                    results: [],
                    numberOfResults: response.numberOfResults,
                    error: response.error
                }

                console.log(newSearchResult);
                
                const resultTiles = [];

                if (newSearchResult.error !== "") {
                    resultTiles.push(...searchResult.results!);
                    resultTiles.pop();
                    resultTiles.push(
                        <div id="sr-error" key="SR-ERROR-ELEMENT">
                            <h3 id="error-info">
                                {newSearchResult.error.split('\n').map((subStr, id) => <p key={id}>{subStr}<br /></p>)}
                            </h3>
                        </div>
                    )
                    setSearchResult({...searchResult, results: resultTiles, error: newSearchResult.error});
                    lastSearchResult.current = cloneDeep(newSearchResult);
                    console.error("ENCOUNTERED ERROR IN LOADMORE", {...searchResult, results: resultTiles, error: newSearchResult.error});               
                    return;
                }

                for (let i = 0; i < Math.min(newSearchResult.numberOfResults, newSearchResult.imageLink.length); i++) {
                    const imageLink = newSearchResult.imageLink[i];
                    const id = newSearchResult.id[i];
                    const title = newSearchResult.title[i];
                    const description = newSearchResult.description[i];
                    
                    const descriptionLength = 70;
                                     
                    if (imageLink && id && title && description) {
                        const descriptionShort = description.length > descriptionLength ? description.substring(0, descriptionLength - 3) + "..." : description;
            
                        resultTiles.push(                                                    
                                            <Link to={`/gallery/${id}`} className="search-results-link" key={id}>
                                                <article className="results-tile">                                        
                                                    <SearchResultsImage src={imageLink} alt={title} classes="results-image" />
                                                    <p className="results-description">
                                                        {descriptionShort}
                                                    </p>
                                                </article>
                                            </Link>                            
                                        )
                    }
                }
                console.log(loadedCounter.current + numberOfImages);
                
                loadedCounter.current += numberOfImages;
                console.log(loadedCounter.current + numberOfImages);
                if (!isEqual(searchResult, {...newSearchResult, results: resultTiles})) {
                    setSearchResult({...newSearchResult, results: resultTiles});
                    lastSearchResult.current = cloneDeep(newSearchResult);
                    console.log("New results", {...newSearchResult, results: resultTiles});
                }
            })
    }

    useEffect(() => {
        loadMoreImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickBackEvent])

    console.log(searchResult);

    // If query is empty, return null
    if (!searchQuery.query.toString().trim()) return null;    

    if (lastSearchQuery.current.query !== searchQuery.query) return <div className="loader"></div>

    return (   
        <div id="SearchResults">
            <h3 id="top-matches">
                {numberOfResults ? `${numberOfResults} matches for "${searchQuery.query.toString()}":` : null}
            </h3>
            <div className="results-grid">
                <InfiniteScroll 
                    next={loadMoreImages} 
                    hasMore={(searchResult.numberOfResults !== searchResult.imageLink.length) && searchResult.error === "" || newSubmitEvent || clickBackEvent }    
                    children={
                        searchResult.error === "" ? 
                        <ResponsiveMasonry columnsCountBreakPoints={{320: 1, 550: 2, 900: 3, 1200: 4}}>
                            <Masonry gutter='2em'>
                                {searchResult.results}
                            </Masonry>
                        </ResponsiveMasonry> : searchResult.results
                    } 
                    loader={<div className="loader"></div>}     
                    dataLength={searchResult.imageLink.length}
                    scrollThreshold={0.9}>
                </InfiniteScroll>
            </div>    
        </div>
    )
}

export default SearchResults;