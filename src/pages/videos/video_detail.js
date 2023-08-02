'use strict';

import themeManager from '../../js/view/theme';
import pexelClient from '../../js/model/api-configure';
import { ripple } from '../../js/utils/ripple.js';
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
const favoriteVidoes = JSON.parse(
  window.localStorage.getItem('favorite')
).videos;
console.log(JSON.parse(window.localStorage.getItem('favorite')));
const favoriteBtn = document.querySelector('[data-add-favorite]');
const videoId = window.location.search.split('=')[1];
const heartIcon = favoriteBtn.querySelector('.ph-heart-straight');

favoriteBtn.classList[favoriteVidoes[videoId] ? 'add' : 'remove'](
  'active',
  'ph-fill'
);

heartIcon.classList[favoriteVidoes[videoId] ? 'add' : 'remove']('ph-fill');
heartIcon.classList[favoriteVidoes[videoId] ? 'remove' : 'add']('ph-bold');

favorite(favoriteBtn, 'videos', videoId);

// Fetch video details and update the page content accordingly
const detailWrapper = document.querySelector('[data-detail-wrapper]');
const downloadLink = document.querySelector('[data-download-link]');
const downloadMenu = document.querySelector('[data-download-menu]');

pexelClient.getDetail('videos', videoId, data => {
  const {
    height,
    width,
    image,
    user: { name: author },
    video_files,
  } = data;

  const hdVideo = video_files.find(item => item.quality === 'hd');
  const { file_type, link } = hdVideo;

  downloadLink.href = link;

  video_files.forEach(item => {
    const { height, width, quality, link } = item;

    downloadMenu.innerHTML += `
      <a href="${link}" download class="menu-item">
        <span class="label-large text">${quality.toUpperCase()}</span>

        <span class="label-large trailing-text">${width}x${height}</span>

        <div class="state-layer"></div>
      </a>
    `;
  });

  detailWrapper.innerHTML = `
    <div class="detail-banner" style="aspect-ratio: ${width} / ${height};">
      <video poster="${image}" controls class="img-cover" data-video>
        <source src="${link}" type="${file_type}">
      </video>
    </div>

    <p class="title-small">Video by <span class="color-primary">${author}</span></p>
  `;
});
