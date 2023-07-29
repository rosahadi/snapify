'use strict';

import { ripple } from '../utils/ripple.js';
import { favorite } from './favorite.js';
import { hoverOnPlay } from '../utils/hoverOnPlay.js';

/**
 * Create video card
 * @param {Object} video Video object
 * @returns {NodeElement} Video card
 */
export const videoCard = function (video) {
  const root = window.location.origin;

  const { height, width, id, image, video_files } = video;

  const videoSd = video_files.find(
    file => file.width < 1000 && file.quality === 'sd'
  );

  const { file_type, link } = videoSd;

  const favoriteObj = JSON.parse(window.localStorage.getItem('favorite'));

  const card = document.createElement('div');
  card.classList.add('card', 'grid-item', 'vidoe');

  card.innerHTML = ` <div class="card-banner" style="--width:${width}; --height: ${height}">
                       <video
                          poster="${image}"
                          loop
                          muted
                          preload="none"
                          class="img-cover"
                          data-video
                        >
                          <source
                            src="${link}"
                            type="${file_type}"
                          />
                        </video>
                      </div>

                      <div class="card-content">
                        <button
                          class="icon-btn small ${
                            favoriteObj.videos[id] ? 'active' : ''
                          }"
                          aria-label="Add to favorite"
                          data-ripple
                          data-favorite-btn
                        >
                          <i
                            class="${
                              favoriteObj.photos[id] ? 'ph-fill' : 'ph-bold'
                            } ph-heart-straight leading-icon"
                            aria-hidden="true"
                          ></i>
                      
                          <div class="state-layer"></div>
                        </button>
                      </div>

                      <span class="card-badge" data-card-badge>
                        <i class="ph-bold ph-play" aria-hidden="true"></i>
                      </span>

                      <a
                        href="${root}/pages/videos/video_detail.html?id=${id}"
                        class="state-layer"
                      ></a>`;

  const rippleElems = [card, document.querySelector('[data-ripple]')];

  rippleElems.forEach(rippleElem => {
    ripple(rippleElem);
  });

  const favoriteBtn = card.querySelector('[data-favorite-btn]');

  favorite(favoriteBtn, 'videos', id);

  hoverOnPlay(card);

  return card;
};
