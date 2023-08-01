'use strict';

import themeManager from '../../js/view/theme';
import pexelClient from '../../js/model/api-configure';
import { ripple } from '../../js/utils/ripple.js';
import { gridInit, updateGrid } from '../../js/utils/masonry_grid.js';
import { photoCard } from '../../js/view/photo_card.js';
import { favorite } from '../../js/view/favorite.js';
import { menu } from '../../js/view/menu.js';

window.addEventListener('DOMContentLoaded', function () {
  // Instantiate the ThemeManager
  themeManager.addEventListeners();
});

// Enable ripple effect
const rippleElems = document.querySelectorAll('[data-ripple');
rippleElems.forEach(rippleElem => ripple(rippleElem));

// Page transition - Hide content on loadstart and reveal it on DOMContentLoaded
window.addEventListener('loadstart', function () {
  document.body.style.opacity = '0';
});

window.addEventListener('DOMContentLoaded', function () {
  document.body.style.opacity = '1';
});

// Menu toggle
const menuWrappers = document.querySelectorAll('[data-menu-wrapper]');

menuWrappers.forEach(menuWrapper => menu(menuWrapper));

// Add to favorites
const favoritePhotos = JSON.parse(
  window.localStorage.getItem('favorite')
).photos;
const favoriteBtn = document.querySelector('[data-add-favorite]');
const photoId = window.location.search.split('=')[1];
const heartIcon = favoriteBtn.querySelector('.ph-heart-straight');

favoriteBtn.classList[favoritePhotos[photoId] ? 'add' : 'remove'](
  'active',
  'ph-fill'
);

heartIcon.classList[favoritePhotos[photoId] ? 'add' : 'remove']('ph-fill');
heartIcon.classList[favoritePhotos[photoId] ? 'remove' : 'add']('ph-bold');

favorite(favoriteBtn, 'photos', photoId);

// Fetch photo details and update the page content accordingly
const detailWrapper = document.querySelector('[data-detail-wrapper]');
const downloadLink = document.querySelector('[data-download-link]');
const downloadMenu = document.querySelector('[data-download-menu]');

pexelClient.getDetail('photos', photoId, data => {
  const { alt, avg_color, height, width, photographer, src } = data;

  // Update download link with the original photo source
  downloadLink.href = src.original;

  Object.entries(src).forEach(item => {
    const [key, value] = item;
    downloadMenu.innerHTML += `
      <a href="${value}" download class="menu-item" data-ripple data-menu-item>
        <span class="label-large text">${key}</span>

        <div class="state-layer"></div>
      </a>
    `;
  });

  detailWrapper.innerHTML = `
  <figure class="detail-banner" style="aspect-ratio: ${width} / ${height}; background-color: ${avg_color}">
    <img src="${src.large2x}" width="${width}" height="${height}" alt="${alt}" class="img-cover">
  </figure>

  <p class="title-small">Photograph by <span class="color-primary">${photographer}</span></p>
`;

  const detailImg = detailWrapper.querySelector('.img-cover');

  detailImg.style.opacity = 0;

  detailImg.addEventListener('load', function () {
    this.animate(
      {
        opacity: 1,
      },
      { duration: 300, fill: 'forwards' }
    );

    if (alt) {
      pexelClient.searchItems(
        'photos',
        { query: alt, page: 1, per_page: 30 },
        data => {
          loadSimilarPhotos(data);
        }
      );
    } else {
      loader.style.display = 'none';
      $photoGrid.innerHTML = '<p>No similar photo found.</p>';
    }
  });
});

// Function to load similar photos and update the photo grid
const $photoGrid = document.querySelector('[data-photo-grid]');
const photoGrid = gridInit($photoGrid);
const loader = document.querySelector('[data-loader]');

const loadSimilarPhotos = function (data) {
  data.photos.forEach(photo => {
    const card = photoCard(photo);

    updateGrid(card, photoGrid.columnsHeight, photoGrid.columns);

    loader.style.display = 'none';
  });
};
