'use strict';

import { urlEncode } from './urlEncode.js';

/**
 * Update url
 * @param {String} searchValue Search value
 * @param {String} searchType Search type eg. 'videos' or 'photos'
 */

export const updateURL = function (searchValue, searchType) {
  const /** {String} */ root = window.location.origin;
  const /** {Object} */ filterObj = {
      query: searchValue,
    };
  const /** {String} */ searchQuery = urlEncode(filterObj);

  window.location = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;
};
