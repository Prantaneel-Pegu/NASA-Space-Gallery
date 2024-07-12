/* Modified from https://developers.google.com/maps/documentation/maps-static/digital-signature#node-js 
   NOTE: WILL ONLY WORK ON A NODE.JS SERVER */

'use strict'

import { createHmac } from "node:crypto";
import * as url from "node:url";

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
  return createHmac('sha1', key).update(data).digest('base64');
}

/**
 * Sign a URL using a secret key.
 *
 * @param  {string} path   The url you want to sign.
 * @param  {string} secret Your unique secret key.
 * @return {string}
 */
function signUrl(path , signingSecret) {
  const uri = url.parse(path);
  const safeSecret = decodeBase64Hash(removeWebSafe(signingSecret));
  const hashedSignature = makeWebSafe(encodeBase64Hash(safeSecret, uri.path));

  return url.format(uri) + '&signature=' + hashedSignature;
}

export default signUrl;
