'use strict';

import pexelClient from '../../js/model/api-configure.js';
import { gridInit, updateGrid } from '../../js/utils/masonry_grid.js';
import { videoCard } from '../../js/view/video_card.js';
import { urlDecode } from '../../js/utils/urlDecode.js';

const $videoGrid = document.querySelector('[data-video-grid]');
const $title = document.querySelector('[data-title]');
const videoGrid = gridInit($videoGrid);
const perPage = 40;
let currentPage = 1;
let totalPage = 0;

// Extract and decode the search query from the URL
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);

// Set the title and document title based on the search query
let title = searchObj ? `${searchObj.query} videos` : 'Popular videos';
$title.textContent = title;
document.title = title;

// Function to render videos on the page
const renderVideo = function (currentPage) {
  const handleVideoData = function (data) {
    totalPage = Math.ceil(data.total_results / perPage);

    data.videos.forEach(video => {
      const $videoCard = videoCard(video);
      updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.columns);
    });

    isLoaded = true;

    if (currentPage >= totalPage) loader.style.display = 'none';
  };

  if (searchObj) {
    pexelClient.searchItems(
      'videos',
      { ...searchObj, per_page: perPage, page: currentPage },
      handleVideoData
    );
  } else {
    pexelClient.popularVideos(
      { per_page: perPage, page: currentPage },
      handleVideoData
    );
  }
};

renderVideo(currentPage);

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
    renderVideo(currentPage);
    isLoaded = false;
  }
});
