'use strict';

import pexelClient from '../../js/model/api-configure.js';
import { gridInit, updateGrid } from '../../js/utils/masonry_grid.js';
import { photoCard } from '../../js/view/photo_card.js';
import { urlDecode } from '../../js/utils/urlDecode.js';

const $photoGrid = document.querySelector('[data-photo-grid]');
const $title = document.querySelector('[data-title]');
const photoGrid = gridInit($photoGrid);
const perPage = 40;
let currentPage = 1;
let totalPage = 0;

// Extract and decode the search query from the URL
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);

// Set the title and document title based on the search query
let title = searchObj ? `${searchObj.query} photos` : 'Curated photos';
$title.textContent = title;
document.title = title;

// Function to render photos on the page
const renderPhotos = function (currentPage) {
  // Handle the fetched photos data from the API
  const handlePhotosData = function (data) {
    totalPage = Math.ceil(data.total_results / perPage);

    data.photos.forEach(photo => {
      const $photoCard = photoCard(photo);
      updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.columns);
    });

    isLoaded = true;

    if (currentPage >= totalPage) loader.style.display = 'none';
  };

  // Fetch photos based on the search query or use curated photos if no search query
  if (searchObj) {
    pexelClient.searchItems(
      'photos',
      { ...searchObj, per_page: perPage, page: currentPage },
      handlePhotosData
    );
  } else {
    pexelClient.curated(
      { per_page: perPage, page: currentPage },
      handlePhotosData
    );
  }
};

renderPhotos(currentPage);

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
    renderPhotos(currentPage);
    isLoaded = false;
  }
});
