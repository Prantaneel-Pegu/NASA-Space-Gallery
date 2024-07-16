"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const dateformat_1 = __importDefault(require("dateformat"));
const comms_js_1 = require("./comms.js");
dotenv_1.default.config({ path: "../" });
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3001') || 3001;
// '/' must be at the last because it catches every path. Similarly '/gallery/*' must be before '/gallery'.
const appPaths = ['/gallery/*', '/gallery', '/potd', '/coordinate-imagery', '/mars-gallery', '/api-docs', '/about', '/error', '/'];
const appDir = path_1.default.resolve(__dirname, `../dist`);
const errorPage = path_1.default.resolve(__dirname, `../dist/errorpage.html`);
app.set('trust proxy', 1 /* number of proxies between user and server */);
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000, // 1 minute
    limit: 200, // Limit each IP to 200 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api', limiter);
app.get('/api/images/search', (req, res) => {
    const reqUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("\x1b[36m", "[server]", "\x1b[0m", ": Received request: ", reqUrl);
    const imageId = req.query.image_id;
    const query = req.query.query;
    const keywords = req.query.keywords;
    let page_size = req.query.page_size;
    if (!page_size)
        page_size = '20';
    try {
        if (typeof imageId === 'string') {
            (0, comms_js_1.getImage)(imageId)
                .then(serverResponse => {
                res.json(serverResponse);
                res.status(200).end();
            });
        }
        else if (typeof query === 'string' && typeof page_size === 'string') {
            (0, comms_js_1.getImages)(query, page_size)
                .then(serverResponse => {
                res.json(serverResponse);
                res.status(200).end();
            });
        }
        else if (typeof keywords === 'string' && typeof page_size === 'string') {
            (0, comms_js_1.getKeywordsMatches)(keywords, page_size)
                .then(serverResponse => {
                res.json(serverResponse);
                res.status(200).end();
            });
        }
        else {
            console.error("\x1b[31m", `[server]`, "\x1b[0m", ": Error: Invalid parameters given.");
            res.json({
                date: (0, dateformat_1.default)(new Date(), "mm-dd-yyyy hh:MM:ss TT"),
                error: "Invalid parameters given."
            });
        }
    }
    catch (error) {
        console.error("\x1b[31m", `[server]`, "\x1b[0m", ": Encountered an error: ", error);
        res.json({});
    }
});
app.get('/api/potd', (req, res) => {
    const reqUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("\x1b[36m", "[server]", "\x1b[0m", ": Received request: ", reqUrl);
    try {
        (0, comms_js_1.getPotd)()
            .then(serverResponse => {
            res.json(serverResponse);
        });
    }
    catch (error) {
        console.error("\x1b[31m", `[server]`, "\x1b[0m", ": Encountered an error: ", error);
        res.json({});
    }
});
app.get('/api/roverphotos/search', (req, res) => {
    const reqUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("\x1b[36m", "[server]", "\x1b[0m", ": Received request: ", reqUrl);
    const date = req.query.date;
    try {
        if (typeof date === 'string') {
            (0, comms_js_1.getRoverPhotos)({ date: date })
                .then(serverResponse => {
                res.json(serverResponse);
            });
        }
        else {
            console.error("\x1b[31m", `[server]`, "\x1b[0m", ": Error: Invalid parameters given.");
            res.json({
                date: (0, dateformat_1.default)(new Date(), "mm-dd-yyyy hh:MM:ss TT"),
                error: "Invalid parameters given."
            });
        }
    }
    catch (error) {
        console.error("\x1b[31m", `[server]`, "\x1b[0m", ": Encountered an error: ", error);
        res.json({});
    }
});
app.get('/api/staticmap', (req, res) => {
    const reqUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("\x1b[36m", "[server]", "\x1b[0m", ": Received request: ", reqUrl);
    const latitude = req.query.lat;
    const longitude = req.query.long;
    const width = req.query.width;
    const height = req.query.height;
    const zoom = req.query.zoom;
    // Is this a request from our website or an API request from a client?
    const isClient = !req.query.isClient ? true : false;
    try {
        if (typeof latitude === 'string' && typeof longitude === 'string' && typeof width === 'string' && typeof height === 'string' && typeof zoom === 'string') {
            (0, comms_js_1.getStaticMap)(latitude, longitude, width, height, zoom, isClient)
                .then(serverResponse => {
                res.setHeader('content-type', 'image/png');
                res.end(serverResponse, 'binary');
            });
        }
        else {
            console.error("\x1b[31m", `[server]`, "\x1b[0m", ": Error: Invalid parameters given.");
            res.json({
                date: (0, dateformat_1.default)(new Date(), "mm-dd-yyyy hh:MM:ss TT"),
                error: "Invalid parameters given."
            });
        }
    }
    catch (error) {
        console.error("\x1b[31m", `[server]`, "\x1b[0m", ": Encountered an error: ", error);
        res.json({});
    }
});
app.get('/api', (req, res) => {
    const reqUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("\x1b[36m", "[server]", "\x1b[0m", ": Received request: ", reqUrl);
    res.json({
        message: "Welcome! This is the API address. Take a look at the API docs for info on usage."
    });
});
app.use(appPaths, express_1.default.static(appDir));
app.get('*', (req, res) => {
    const reqUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("\x1b[36m", "[server]", "\x1b[0m", ": Received request: ", reqUrl);
    res.sendFile(errorPage);
});
app.listen(port, () => {
    console.log("\x1b[32m", `[server]`, "\x1b[0m", `: Server is running at http://localhost:${port}.`);
});
