import "./styles/ApiDocs.css";

function ApiDocs() {
    return (
        <div id="ApiDocs">
            <h1 id="api-doc-heading">API Docs</h1>

            <p id="api-address">
                The API is located at{" "}
                <a href="./api" id="api-link" target="_blank">
                    /api
                </a>
                .
            </p>
            <p id="api-return-data">
                It returns data in a JSON format, except for satellite map
                requests, which are returned as png images.
            </p>

            <div id="api-info">
                <p id="api-info-p">
                    The API can handle 6 different types of requests:
                </p>

                <ul id="api-req-types-list">
                    <li className="api-req-types-item">
                        <a
                            href="./api-docs#req-by-qs"
                            className="api-req-type-link"
                        >
                            Request by Query string
                        </a>
                    </li>
                    <li className="api-req-types-item">
                        <a
                            href="./api-docs#req-by-id"
                            className="api-req-type-link"
                        >
                            Request by Image ID
                        </a>
                    </li>
                    <li className="api-req-types-item">
                        <a
                            href="./api-docs#req-by-keywords"
                            className="api-req-type-link"
                        >
                            Request by Keywords
                        </a>
                    </li>
                    <li className="api-req-types-item">
                        <a
                            href="./api-docs#potd-req"
                            className="api-req-type-link"
                        >
                            POTD Request
                        </a>
                    </li>
                    <li className="api-req-types-item">
                        <a
                            href="./api-docs#c-rover-req"
                            className="api-req-type-link"
                        >
                            Curiosity Rover photos request
                        </a>
                    </li>
                    <li className="api-req-types-item">
                        <a
                            href="./api-docs#sat-img-req"
                            className="api-req-type-link"
                        >
                            Satellite Map Request
                        </a>
                    </li>
                </ul>

                <div id="api-usage-info">
                    <h2 id="usage-title">Usage</h2>

                    <article id="req-by-qs" className="usage-types">
                        <h3 className="usage-types-head">
                            Request by Query string
                        </h3>
                        <br />
                        <p className="usage-types-desc">
                            The API can receive a query string to search for at
                            '/api/images/search'. A 'query' parameter is
                            required with the value set to the string.
                            Optionally, an additional 'page_size' parameter can
                            be given which will decide the number of results
                            returned in the response. Default page size is 20.
                        </p>
                        <code className="usage-example-code">
                            <p className="usage-example-head">
                                Example query:{" "}
                            </p>
                            <a
                                href="./api/images/search?query=space&page_size=50"
                                className="usage-example-code-link"
                                target="_blank"
                            >
                                /api/images/search?query=space&page_size=50
                            </a>
                        </code>
                    </article>

                    <article id="req-by-id" className="usage-types">
                        <h3 className="usage-types-head">
                            Request by Image ID
                        </h3>
                        <br />
                        <p className="usage-types-desc">
                            The API can receive an 'image_id' parameter at
                            '/api/images/search'. It will search for an image
                            with the requested id and if one is found, then it
                            is returned. Otherwise '{"{ }"}' is returned.
                        </p>
                        <code className="usage-example-code">
                            <p className="usage-example-head">
                                Example query:{" "}
                            </p>
                            <a
                                href="./api/images/search?image_id=PIA14417"
                                className="usage-example-code-link"
                                target="_blank"
                            >
                                /api/images/search?image_id=PIA14417
                            </a>
                        </code>
                    </article>

                    <article id="req-by-keywords" className="usage-types">
                        <h3 className="usage-types-head">
                            Request by Keywords
                        </h3>
                        <br />
                        <p className="usage-types-desc">
                            The API can receive a 'keywords' parameter at
                            '/api/images/search'. This parameter should contain
                            all requested keywords in a comma separated string.
                            Optionally, an additional 'page_size' parameter can
                            be given. On receiving a request with the 'keywords'
                            parameter set, the API will search for images that
                            match the given keywords and return them. Default
                            page size is 20.
                        </p>
                        <code className="usage-example-code">
                            <p className="usage-example-head">
                                Example query:{" "}
                            </p>
                            <a
                                href="./api/images/search?keywords=space,galaxy&page_size=30"
                                className="usage-example-code-link"
                                target="_blank"
                            >
                                /api/images/search?keywords=space,galaxy&page_size=30
                            </a>
                        </code>
                    </article>

                    <article id="potd-req" className="usage-types">
                        <h3 className="usage-types-head">POTD Request</h3>
                        <br />
                        <p className="usage-types-desc">
                            You can request NASA's POTD (Picture Of The Day) for
                            today at '/api/potd'. The response comes in a JSON
                            format with various data such as POTD image url,
                            description of the POTD, date and copright info etc.
                        </p>
                        <code className="usage-example-code">
                            <p className="usage-example-head">POTD address: </p>
                            <a
                                href="./api/potd"
                                className="usage-example-code-link"
                                target="_blank"
                            >
                                /api/potd
                            </a>
                        </code>
                    </article>

                    <article id="c-rover-req" className="usage-types">
                        <h3 className="usage-types-head">
                            Curiosity Rover Photos Request
                        </h3>
                        <br />
                        <p className="usage-types-desc">
                            You can request for photos captured by NASA's Mars
                            rover 'Curiosity' on a particular date at
                            '/api/roverphotos/search'. A request must include a
                            'date' parameter in the format YYYY-MM-DD.
                        </p>
                        <code className="usage-example-code">
                            <p className="usage-example-head">
                                Example query:{" "}
                            </p>
                            <a
                                href="./api/roverphotos/search?date=2015-06-03"
                                className="usage-example-code-link"
                                target="_blank"
                            >
                                /api/roverphotos/search?date=2015-06-03
                            </a>
                        </code>
                    </article>

                    <article id="sat-img-req" className="usage-types">
                        <h3 className="usage-types-head">
                            Satellite Map Request
                        </h3>
                        <br />
                        <p className="usage-types-desc">
                            You can request for the satellite image of a place
                            marked by two coordinates at '/api/staticmap'. The
                            response comes in the form of a png image.
                            <br />
                            <br />
                            The request must specify 5 different parameters:
                        </p>

                        <ul id="sat-req-params-list">
                            <li className="sat-req-param">
                                'lat': Latitude of the place. Valid values range
                                from 90 to -90.
                            </li>
                            <li className="sat-req-param">
                                'long': Longitude of the place. Valid values
                                range from 180 to -180.
                            </li>
                            <li className="sat-req-param">
                                'zoom': The amount by which the image is to be
                                zoomed in. Higher values mean greater zoom.
                                Valid values are 1-21.
                            </li>
                            <li className="sat-req-param">
                                'width': The width of the image.
                            </li>
                            <li className="sat-req-param">
                                'height': The width of the height.
                            </li>
                        </ul>

                        <code className="usage-example-code">
                            <p className="usage-example-head">
                                Example query:{" "}
                            </p>
                            <a
                                href="./api/staticmap?lat=38&long=-94&zoom=3&width=450&height=400"
                                className="usage-example-code-link"
                                target="_blank"
                            >
                                /api/staticmap?lat=38&long=-94&zoom=3&width=450&height=400
                            </a>
                        </code>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default ApiDocs;
