'use strict';

/**
 * Encode an object into a URL-encoded string.
 * Converts key-value pairs of the input object into a single string
 * with key-value pairs joined by "&" and keys and values encoded for URL use.
 *
 * @param {Object} urlObj - The object containing key-value pairs for URL parameters.
 * @returns {String} - The URL-encoded string representing the input object's parameters.
 */

export const urlEncode = function (urlObj) {
  return Object.entries(urlObj)
    .join('&')
    .replace(/,/g, '=')
    .replace(/#/g, '%23');
};
