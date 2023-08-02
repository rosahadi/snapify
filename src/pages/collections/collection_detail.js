'use strict';

import pexelClient from '../../js/model/api-configure';
import { gridInit, updateGrid } from '../../js/utils/masonry_grid.js';
import { photoCard } from '../../js/view/photo_card.js';
import { videoCard } from '../../js/view/video_card.js';
import { urlDecode } from '../../js/utils/urlDecode';

const $collectionGrid = document.querySelector('[data-collection-grid]');
const $title = document.querySelector('[data-title]');
const collectionGrid = gridInit($collectionGrid);
const perPage = 40;
let currentPage = 1;
let totalPage = 0;

const collectionObj = urlDecode(window.location.search.slice(1));
console.log(collectionObj);

$title.textContent = `${collectionObj.title} collections`;
document.title = `${collectionObj.title} collections`;

const renderCollection = function (currentPage) {
  pexelClient.collectionDetail(
    collectionObj.collectionId,
    { per_page: perPage, page: currentPage },
    function (data) {
      totalPage = Math.ceil(data.total_results / perPage);

      console.log(data);

      data.media.forEach(item => {
        let cardType = item.type.toLowerCase();

        let card;

        if (cardType === 'photo') {
          card = photoCard(item);
        }
        if (cardType === 'video') {
          card = videoCard(item);
        }

        updateGrid(card, collectionGrid.columnsHeight, collectionGrid.columns);

        isLoaded = true;
        if (currentPage >= totalPage) loader.style.display = 'none';
      });
    }
  );
};

renderCollection(currentPage);

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
    renderCollection(currentPage);
    isLoaded = false;
  }
});
