'use strict';

import { ripple } from '../utils/ripple';

/**
 * Create collection card
 * @param {Object} collection Collection object
 * @returns {NodeElement} Collection card
 */

export const collectionCard = function (collection) {
  const root = window.location.origin;

  const { description, id, media_count, photos_count, title, videos_count } =
    collection;

  const card = document.createElement('div');
  card.classList.add('grid-card', 'two-line', 'list-item');
  card.setAttribute('title', title);

  card.innerHTML = `
  <div>
  <h3 class="body-large">${title}</h3>

  <p class="body-medium label">${media_count} media</p>
</div>

<a href="${root}/pages/collections/collection_detail.html?collectionId=${id}&title=${title}" class="state-layer"></a>
`;

  ripple(card);

  return card;
};
