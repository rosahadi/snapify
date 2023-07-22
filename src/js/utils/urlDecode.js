'use strict';

/**
 * Decodes a URL query string by replacing special characters.
 * @param {string} urlString - The URL query string to be decoded.
 * @returns {Object} - URL object.
 */

export const urlDecode = function (urlString) {
  return Object.fromEntries(
    urlString
      .replace(/%23/g, '#')
      .replace(/%20/g, ' ')
      .split('&')
      .map(i => i.split('='))
  );
};
