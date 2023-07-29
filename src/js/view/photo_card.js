'use strict';

import { ripple } from '../utils/ripple.js';
import { favorite } from './favorite.js';

/**
 * Create photo card
 * @param {Object} photo Photo object
 * @returns {NodeElement} Photo card element
 */

export const photoCard = function (photo) {
  const root = window.location.origin;

  const {
    alt,
    avg_color: backdropColor,
    height,
    width,
    id,
    src: { large },
  } = photo;

  const card = document.createElement('div');
  card.classList.add('card', 'grid-item');
  card.style.backgroundColor = backdropColor;

  const favoriteObj = JSON.parse(window.localStorage.getItem('favorite'));

  card.innerHTML = ` <figure
                         class="card-banner"
                         style="--width: ${width}; --height:${height}"
                       >
                         <img
                           src="${large}"
                           width="${width}"
                           height="${height}"
                           alt="${alt}"
                           loading="lazy"
                           class="img-cover"
                         />
                       </figure>
  
                       <div class="card-content">
                         <button
                           class="icon-btn small ${
                             favoriteObj.photos[id] ? 'active' : ''
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
  
                       <a href="${root}/pages/photos/photos.html?id=${id}" class="state-layer"></a>`;

  const cardBanner = card.querySelector('img');

  cardBanner.addEventListener('load', function () {
    this.animate({ opacity: 1 }, { duration: 400, fill: 'forwards' });
  });

  const rippleElems = [card, card.querySelector('[data-ripple]')];

  rippleElems.forEach(rippleElem => ripple(rippleElem));

  const favoriteBtn = card.querySelector('[data-favorite-btn]');
  favorite(favoriteBtn, 'photos', id);

  return card;
};
