'use strict';

import pexelClient from '../../js/model/api-configure.js';
import { collectionCard } from '../../js/view/collection_card.js';

const collectionGrid = document.querySelector('[data-collection-grid]');
const perPage = 40;
let currentPage = 1;
let totalPage = 0;

const renderCollections = function (currentPage) {
  pexelClient.featured({ per_page: perPage, page: currentPage }, data => {
    totalPage = Math.ceil(data.total_results / perPage);

    data.collections.forEach(collection => {
      const $collectionCard = collectionCard(collection);

      collectionGrid.appendChild($collectionCard);
    });

    isLoaded = true;
    if (currentPage >= totalPage) loader.style.display = 'none';
  });
};

renderCollections(currentPage);

// Event listener for infinite scroll
const loader = document.querySelector('[data-loader]');
let isLoaded = true;

window.addEventListener('scroll', function () {
  // Load more photos when the loader element is near the viewport and not exceeding total pages
  if (
    loader.getBoundingClientRect().top < window.innerHeight * 2 &&
    currentPage <= totalPage &&
    isLoaded
  ) {
    currentPage++;
    renderCollections(currentPage);
    isLoaded = false;
  }
});
