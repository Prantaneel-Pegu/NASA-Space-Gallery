/* Modified from https://developers.google.com/maps/documentation/maps-static/digital-signature#node-js
   NOTE: WILL ONLY WORK ON A NODE.JS SERVER */
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const url = __importStar(require("node:url"));
/**
 * Convert from 'web safe' base64 to true base64.
 *
 * @param  {string} safeEncodedString The code you want to translate
 *                                    from a web safe form.
 * @return {string}
 */
function removeWebSafe(safeEncodedString) {
    return safeEncodedString.replace(/-/g, '+').replace(/_/g, '/');
}
/**
 * Convert from true base64 to 'web safe' base64
 *
 * @param  {string} encodedString The code you want to translate to a
 *                                web safe form.
 * @return {string}
 */
function makeWebSafe(encodedString) {
    return encodedString.replace(/\+/g, '-').replace(/\//g, '_');
}
/**
 * Takes a base64 code and decodes it.
 *
 * @param  {string} code The encoded data.
 * @return {string}
 */
function decodeBase64Hash(code) {
    // "new Buffer(...)" is deprecated. Use Buffer.from if it exists.
    return Buffer.from ? Buffer.from(code, 'base64') : new Buffer(code, 'base64');
}
/**
 * Takes a key and signs the data with it.
 *
 * @param  {string} key  Your unique secret key.
 * @param  {string} data The url to sign.
 * @return {string}
 */
function encodeBase64Hash(key, data) {
    return (0, node_crypto_1.createHmac)('sha1', key).update(data).digest('base64');
}
/**
 * Sign a URL using a secret key.
 *
 * @param  {string} path   The url you want to sign.
 * @param  {string} secret Your unique secret key.
 * @return {string}
 */
function signUrl(path, signingSecret) {
    const uri = url.parse(path);
    const safeSecret = decodeBase64Hash(removeWebSafe(signingSecret));
    const hashedSignature = makeWebSafe(encodeBase64Hash(safeSecret, uri.path));
    return url.format(uri) + '&signature=' + hashedSignature;
}
exports.default = signUrl;
