import './styles/MarsPhotos.css';
import { FormEvent, useRef, useState } from 'react';
import { getRoverPhotos, getRoverPhotosPrototype } from '../services/communication';
import isEqual from 'lodash.isequal';
import cloneDeep from 'lodash.clonedeep';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type PhotosRequest = {
    date: string
}

const PhotosRequestPrototype: PhotosRequest = {
    date: ""
}

function MarsPhotos () {

    const [photosRequest, setPhotosRequest] = useState(PhotosRequestPrototype);
    const [photosResponse, setPhotosResponse] = useState<JSX.Element[]>([]);
    const [rawServerResponse, setRawServerResponse] = useState(cloneDeep(getRoverPhotosPrototype));
    const [totalDayPhotos, setTotalDayPhotos] = useState("0");
    const [totalRoverPhotos, setTotalRoverPhotos] = useState("");
    const [requestPending, setRequestPending] = useState(false);
    const [dateToday, setDateToday] = useState("");
    const [loaded, setLoaded] = useState(false);
    const loadedCounter = useRef(0);

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Form submitted.");

        const mpForm = e.currentTarget;
        const newPhotosRequest: PhotosRequest = 
        { 
            date: new FormData(mpForm).get("date")?.toString() || "",
        }; 

        if (!isEqual(photosRequest, newPhotosRequest)) setPhotosRequest(newPhotosRequest);
        
        setRequestPending(true);
        setLoaded(false);   
        setRawServerResponse(cloneDeep(getRoverPhotosPrototype));
        getRoverPhotos(newPhotosRequest, true)
            .then((photos) => {
                setRequestPending(false);
                setLoaded(true);
                setRawServerResponse(photos);
                console.log(photos.totalPhotos);
                
                if (photos.photoUrls.length) {
                    setTotalDayPhotos(photos.photoUrls.length.toString());
                    setTotalRoverPhotos(photos.totalPhotos);
                }
                                        
                console.log(photos, newPhotosRequest, photos.photoUrls.length);

                const photoTiles: JSX.Element[] = [];

                if (photos.error !== "") {
                    const errorElement = <div id="mp-error" key="MP-ERROR-ELEMENT">
                                            <p id="mp-error-info">
                                                {photos.error.split('\n').map((subStr, id) => <span key={id}>{subStr}<br /></span>)}
                                            </p>
                                         </div>;
                    
                    photoTiles.push(errorElement);
                    setPhotosResponse([...photoTiles]);
                    console.error("ENCOUNTERED ERROR IN USEEFFECT", ...photoTiles);  
                    return;
                }

                for (let i = 0; i < Math.min(photos.photoUrls.length, 20); i++) {
                    const id = photos.photoIds[i];
                    const url = photos.photoUrls[i];

                    photoTiles.push(
                            <article className="mp-photo-tile" key={id}>
                                <img src={url} alt={`A photo captured by the Curiosity rover. Photo id: ${id}`} className="mp-photo-tile-img" />
                            </article>
                    )
                }

                console.log(photosResponse, photoTiles);
    
                if (!isEqual(photosResponse, photoTiles)) {
                    setPhotosResponse(photoTiles);
                    console.log("YAY", photosResponse, photoTiles);
                }
                if (loadedCounter.current === 0) loadedCounter.current += 20;
            })
    }

    function loadMorePhotos(numberOfPhotos = 20) {
        console.warn("TRIGGERED!", loadedCounter.current + numberOfPhotos);

        getRoverPhotos(photosRequest, false)
        .then((photos) => {
            setRawServerResponse(photos);
            
            if (photos.photoUrls.length) setTotalDayPhotos(photos.photoUrls.length.toString());
                
            console.log(photos, photosRequest, photos.totalPhotos);

            const photoTiles: JSX.Element[] = [];

            if (photos.error !== "") {
                photoTiles.push(...photosResponse);
                photoTiles.pop();
                photoTiles.push(
                    <div id="mp-error" key="MP-ERROR-ELEMENT">
                        <p id="mp-error-info">
                            {photos.error.split('\n').map((subStr, id) => <span key={id}>{subStr}<br /></span>)}
                        </p>
                    </div>
                )
                setPhotosResponse([...photoTiles]);
                console.error("ENCOUNTERED ERROR IN LOADMORE", ...photoTiles);               
                return;
            }

            for (let i = 0; i < Math.min(numberOfPhotos + loadedCounter.current, photos.photoUrls.length); i++) {
                const id = photos.photoIds[i];
                const url = photos.photoUrls[i];

                photoTiles.push(
                        <article className="mp-photo-tile" key={id}>
                            <img src={url} alt={`A photo captured by the Curiosity rover. Photo id: ${id}`} className="mp-photo-tile-img" />
                        </article>
                )
            }

            loadedCounter.current += numberOfPhotos;

            console.log(photosResponse,photoTiles, loadedCounter.current);
                
            if (!isEqual(photosResponse, photoTiles)) {
                setPhotosResponse(photoTiles);
                console.log(photosResponse, photoTiles);
            }
        })
    }

    function getDateToday() {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = (today.getMonth() + 1).toString(); // Months start at 0
        let dd = today.getDate().toString();

        if (parseInt(dd) < 10) dd = '0' + dd;
        if (parseInt(mm) < 10) mm = '0' + mm;

        return (yyyy + '-' + mm + '-' + dd)
    }

    if (dateToday === "") setDateToday(getDateToday());
    
    return (
        <div id="MarsPhotos">
            <h1 id="mp-heading">
                Mars Rover Photos
            </h1>
            <p id="mp-desc">
                See some of the most awe-inspiring pictures taken by NASA's Curiosity rover - operational since 9/7/2012.     
                <br />
                <br />
                Total photos taken: {totalRoverPhotos ||  "~695670"}           
            </p>
            
            <form id="mp-form" method="POST" onSubmit={handleSubmit}>
                <fieldset id="mpf-fieldset">
                    <legend id="mpf-fieldset-legend">
                        &nbsp;&nbsp;Select a date: &nbsp;
                    </legend>

                    <div id="mpf-date-container">
                        <input type="date" id="mpf-date" name="date" min="2012-08-06" max={dateToday} defaultValue="2015-06-03" required/>
                    </div>

                    <button id="mpf-submit-btn" type="submit">
                        Submit
                    </button>
                </fieldset>
            </form>

            { (requestPending && !loaded) ? 
                    <div className="loader"></div> 
                    : 
                    (photosResponse.length > 0 && loaded ? 
                        <div id="mp-results">
                            {rawServerResponse.error !== "" ? 
                            (photosResponse.length > 1 ? 
                            <p id="mp-results-total">
                                Curiosity took {totalDayPhotos} photos that day: 
                            </p> 
                            : 
                            null) 
                            : 
                            <p id="mp-results-total">
                                Curiosity took {totalDayPhotos} photos that day: 
                            </p>}
                            <InfiniteScroll 
                                next={loadMorePhotos} 
                                hasMore={(rawServerResponse.photoUrls.length !== photosResponse.length) && rawServerResponse.error === ""} 
                                children={
                                    rawServerResponse.error === "" ? 
                                    <ResponsiveMasonry columnsCountBreakPoints={{320: 1, 550: 2, 900: 3, 1200: 4}}>
                                        <Masonry gutter='2em'>
                                            {photosResponse}
                                        </Masonry>
                                    </ResponsiveMasonry> : photosResponse
                                } 
                                loader={<div className="loader"></div>} 
                                dataLength={photosResponse.length}
                                scrollThreshold={0.8}>
                            </InfiniteScroll>
                        </div> 
                        :
                        null
                    )
            }
        </div>
    )
}

export default MarsPhotos;