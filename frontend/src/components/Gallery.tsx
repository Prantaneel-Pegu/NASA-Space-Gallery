import './styles/Gallery.css';
import { useLayoutEffect, useRef, useState } from 'react';
import SearchComponent from './SearchComponent';
import { GetImageResults, getImages, getImagesPrototype } from '../services/communication';
import { Link, useSearchParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import SearchResultsImage from './SearchResultsImage';
import isEqual from 'lodash.isequal';

function Gallery () {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState({ query: searchParams.get('search') || "" });
    const [searchResult, setSearchResult] = useState(getImagesPrototype);
    const [newSubmitEvent, setNewSubmitEvent] = useState(false);
    const [galleryImages, setGalleryImages] = useState({...getImagesPrototype, errorElement: <></>});
    const imagesLoaded = useRef(0);
    const galleryImageQuery = useRef('andromeda');
    const initialLoad = useRef(true);
    const scrollPosition = useRef(0);
    const searchBox = document.querySelector<HTMLInputElement>("search-box");

    // Scroll to top
    window.scrollTo(0,0);

    useLayoutEffect(() => {
        if (newSubmitEvent) scrollPosition.current = 0;
        scrollTo(0, scrollPosition.current);
    }, [newSubmitEvent, galleryImages])

    function loadGalleryImages(numberToLoad = 20) {
        console.log("Loading Gallery Images", imagesLoaded.current + numberToLoad);
        getImages(galleryImageQuery.current, imagesLoaded.current + numberToLoad)
            .then(rawServerResponse => {
                const serverResponse: GetImageResults & {errorElement: JSX.Element} = {...rawServerResponse, errorElement: <></>}
                console.log("Loaded gallery images", serverResponse);

                scrollPosition.current = Math.round(window.scrollY);
                initialLoad.current = false;
                setGalleryImages(serverResponse);

                const resultTiles = [];

                if (serverResponse.error !== "") {
                    resultTiles.push(...galleryImages.results);
                    const errorElement = <div id="gallery-error">
                                            <p id="gallery-error-text">
                                                {serverResponse.error}
                                            </p>
                                        </div>

                    setGalleryImages({...serverResponse, results: resultTiles, errorElement: errorElement});
                    console.error("Encountered error in gallery images: ", serverResponse.error);
                    return;
                } 

                for (let i = 0; i < Math.min(imagesLoaded.current + numberToLoad, serverResponse.numberOfResults); i++) {
                    const imageLink = serverResponse.imageLink[i];
                    const id = serverResponse.id[i];
                    const title = serverResponse.title[i];
                    const description = serverResponse.description[i];
                    // const descriptionLength = 70;
                                     
                    if (imageLink && id && title && description) {        
                        // const descriptionShort = description.length > descriptionLength ? description.substring(0, descriptionLength - 3) + "..." : description;
            
                        resultTiles.push(
                                            <Link key={id} to={`/gallery/${id}`} className="gallery-image-link">
                                                <article className="gallery-image-tile">                                        
                                                    <SearchResultsImage src={imageLink} alt={title} classes="gallery-image" />
                                                </article>
                                            </Link>
                                        )               
                    }
                }
                console.log(scrollPosition.current, Math.round(window.scrollY));
                
                imagesLoaded.current += numberToLoad;     

                const newGalleryImages: GetImageResults = {...rawServerResponse, results: resultTiles}
                if (!isEqual(galleryImages, newGalleryImages))
                    setGalleryImages({...newGalleryImages, errorElement: <></>});
                    console.log("New Gallery Images: ", newGalleryImages, resultTiles);
            });
    }

    if (initialLoad.current) loadGalleryImages();

    // Set search query to latest search params
    if (searchParams.get('search') !== null && searchParams.get('search') !== searchQuery.query) {
        setSearchQuery({ query: searchParams.get('search') || "" });
    } else if (searchParams.get('search') === null && searchQuery.query !== "") {
        setSearchQuery({ query: "" });
    }

    if (searchParams.get('search') === null && searchBox) {
        searchBox.value = "";
    }

    if (searchQuery.query.trim() !== "") {
        return (
            <div id="Gallery">
                <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchResult={searchResult} setSearchResult={setSearchResult} newSubmitEvent={newSubmitEvent} setNewSubmitEvent={setNewSubmitEvent} />
            </div>
        )
    }
    
    console.log(galleryImages.numberOfResults, galleryImages.results.length);
    
    return (
        <div id="Gallery">
            <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchResult={searchResult} setSearchResult={setSearchResult} newSubmitEvent={newSubmitEvent} setNewSubmitEvent={setNewSubmitEvent} />
            <div id="gallery-image-grid">
                <InfiniteScroll 
                    next={loadGalleryImages} 
                    hasMore={((galleryImages.numberOfResults !== galleryImages.results.length) && galleryImages.error === "") || initialLoad.current} 
                    children={
                        (galleryImages.error === "") ? 
                        <ResponsiveMasonry columnsCountBreakPoints={{320: 1, 550: 2, 900: 3, 1200: 4}}>
                            <Masonry gutter='2em'>
                                {galleryImages.results}
                            </Masonry>
                        </ResponsiveMasonry> 
                        : 
                        <>
                            <ResponsiveMasonry columnsCountBreakPoints={{320: 1, 550: 2, 900: 3, 1200: 4}}>
                                <Masonry gutter='2em'>
                                    {galleryImages.results}
                                </Masonry>
                            </ResponsiveMasonry>
                            <br />
                            <br />
                            <br />
                            <br />
                            {galleryImages.errorElement}
                        </>
                    } 
                    loader={<div className="loader"></div>} 
                    dataLength={galleryImages.results.length}
                    scrollThreshold={0.8}>
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default Gallery;