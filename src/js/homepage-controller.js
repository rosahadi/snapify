'use strict';

import 'core-js/stable';

import pexelClient from './model/api-configure';
import { photoCard } from './view/photo_card.js';
import { gridInit } from './utils/masonry_grid.js';
import { updateGrid } from './utils/masonry_grid.js';
import { videoCard } from './view/video_card';
import { collectionCard } from './view/collection_card';

//  Render curated photos in home page
const photoGrid = document.querySelector('[data-photo-grid]');

photoGrid.innerHTML = '<div class="skeleton"></div>'.repeat(18);

pexelClient.curated({ page: 1, per_page: 20 }, function (data) {
  photoGrid.innerHTML = '';
  const grid = gridInit(photoGrid);

  data.photos.forEach(photo => {
    const $photoCard = photoCard(photo);

    updateGrid($photoCard, grid.columnsHeight, grid.columns);
  });
});

// Render popular videos in home page
const videoGrid = document.querySelector('[data-video-grid]');

videoGrid.innerHTML = '<div class="skeleton"></div>'.repeat(18);

pexelClient.popularVideos({ page: 1, per_page: 20 }, function (data) {
  videoGrid.innerHTML = '';
  const grid = gridInit(videoGrid);
  data.videos.forEach(video => {
    const $videoCard = videoCard(video);
    updateGrid($videoCard, grid.columnsHeight, grid.columns);
  });
});

//Render collections in home page
const collectionsGrid = document.querySelector('[data-collection-grid]');

pexelClient.featured({ per_page: 15 }, function (data) {
  data.collections.forEach(collection => {
    const $collectionCard = collectionCard(collection);

    collectionsGrid.appendChild($collectionCard);
  });
});
