import { FormEvent, useState } from 'react';
import './styles/CoordinateImagery.css';

type Coordinates = {
    latitude: string,
    longitude: string,
    zoom: string
}

const coordinatePrototype: Coordinates = {
    latitude: "",
    longitude: "",
    zoom: ""
}

function CoordinateImagery () {
    const [coordinates, setCoordinates] = useState<Coordinates>({...coordinatePrototype});
    const [imgLoaded, setImgLoaded] = useState(false);
    const [searchPending, setSearchPending] = useState(false);
    const [imgLoadStartTime, setImgLoadStartTime] = useState(0);
    const [imgLoadEndTime, setImgLoadEndTime] = useState(0);
    const [imgTimedOut, setImageTimedOut] = useState(false);
    const imageTimeout = 14000;
    const imageWidth = 400;
    const imageHeight = 400;

    const [mainImageSrc, setMainImageSrc] = useState(`/api/staticmap?lat=${coordinates.latitude}&long=${coordinates.longitude}&zoom=${coordinates.zoom}&width=${imageWidth}&height=${imageHeight}&isClient=false`);

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();

        const ciForm = e.currentTarget;
        const newCoordinates: Coordinates = 
            { 
                latitude: new FormData(ciForm).get("latitude")?.toString() || "",
                longitude: new FormData(ciForm).get("longitude")?.toString() || "",
                zoom: new FormData(ciForm).get("zoom")?.toString() || "4"
            }; 
        
        switch(newCoordinates.zoom) {
            case "1": 
                newCoordinates.zoom = "12";
                break;
            case "2": 
                newCoordinates.zoom = "14";
                break;
            case "3": 
                newCoordinates.zoom = "16";
                break;
            case "4": 
                newCoordinates.zoom = "18";
                break;
            case "5": 
                newCoordinates.zoom = "20";
                break;
            default:
                newCoordinates.zoom = "18";
        }
        
        setMainImageSrc(`/api/staticmap?lat=${newCoordinates.latitude}&long=${newCoordinates.longitude}&zoom=${newCoordinates.zoom}&width=${imageWidth}&height=${imageHeight}&isClient=false&random=${Math.random()}`)
        console.log(mainImageSrc,newCoordinates);
        setCoordinates(newCoordinates);
        setImgLoaded(false);
        setSearchPending(true);
        setImageTimedOut(false);
        setImgLoadStartTime(performance.now());
        setTimeout(() => {
            setImageTimedOut(true);
        }, imageTimeout)

    }

    console.log(coordinates, mainImageSrc);

    return (
        <div id="CoordinateImagery">
            <h1 id="ci-heading">
                Coordinate Satellite Imagery
            </h1>
            <p id="ci-desc">
                Find satellite imagery for a given coordinate.
            </p>

            <div id="ci-main">
                <form method="POST" id="ci-form" onSubmit={handleSubmit}>
                    <fieldset id="ci-form-fieldset">
                        <legend id="ci-form-legend">
                            &nbsp;&nbsp;Enter Geo-coordinate data: &nbsp;
                        </legend>

                        <div id="ci-form-latitude-container">
                            <label id="ci-form-lat-label" htmlFor="ci-form-latitude">
                                Latitude: &nbsp;&nbsp;
                            </label>
                            <input type="number" max="90" min="-90" step="any" maxLength={10} id="ci-form-latitude" name='latitude' required />
                        </div>

                        <div id="ci-form-longitude-container">
                            <label id="ci-form-lon-label" htmlFor="ci-form-longitude">
                                Longitude:
                            </label>
                            <input type="number" max="180" min="-180" step="any" maxLength={11} id="ci-form-longitude" name='longitude' required />
                        </div>

                        <div id="ci-form-zoom-container">
                            <label id="ci-form-zoom-label" htmlFor="ci-form-zoom">
                                Zoom Level:
                            </label>
                            <select name="zoom" id="ci-form-zoom" defaultValue="4" required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                        <button id="ci-form-submit-btn" type='submit'>Submit</button>
                    </fieldset>
                </form>

                {(!imgLoaded && searchPending && !imgTimedOut) ? <div className="loader"></div> : null}

                {(imgTimedOut && !imgLoaded) ?
                    <div id="ci-img-timedout">
                        <h2 id="ci-timedout-h2">
                            Sorry, your request timed out.
                        </h2>
                        <p id="ci-timedout-desc">
                            There is probably an error on the server side. Please try again later.
                        </p>
                    </div>
                    :
                    null
                }

                {(coordinates.latitude && coordinates.longitude) ?
                    <div id="ci-img-data" style={imgLoaded ? {} : { display: 'none' }}>
                        <div id="ci-img-data-container">
                            <div id="ci-main-image-container" style={imgLoaded ? {} : { display: 'none' }}>
                                <img src={coordinates.latitude ? mainImageSrc : ""} alt="Coordinate image captured by a satellite" id="ci-main-image" onLoad={() => {
                                    setImgLoadEndTime(performance.now());
                                    setImgLoaded(true);
                                    setSearchPending(false);
                                }} style={imgLoaded ? {} : { display: 'none' }} />
                            </div>

                            <p id="ci-img-load-time" style={(imgLoaded && ((imgLoadEndTime - imgLoadStartTime) > 0)) ? {} :
                                { display: 'none' }}>
                                Finished loading in {(imgLoadEndTime - imgLoadStartTime) / 1000}s.
                            </p>
                        </div>
                    </div>
                    :
                    null
                }
            </div>

        </div>
    )
}

export default CoordinateImagery;