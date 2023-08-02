'use strict';

import { gridInit, updateGrid } from '../../js/utils/masonry_grid.js';
import { photoCard } from '../../js/view/photo_card.js';
import { videoCard } from '../../js/view/video_card.js';
import { option } from '../../js/view/btn_option.js';

// Favorite option button

const favoriteOption = document.querySelector('[data-option="favorite"]');
const activeOptionBtn = favoriteOption.querySelector(
  '[data-option-btn].selected'
);

let favType = activeOptionBtn.dataset.optionValue;
console.log(favType);

option(favoriteOption, optionValue => {
  favType = optionValue;

  $favGrid.innerHTML = '';
  favGrid = gridInit($favGrid);
  loadFav(favType, favGrid);
});

const $favGrid = document.querySelector('[data-fav-grid]');
let favGrid = gridInit($favGrid);
console.log(favGrid);

const favData = JSON.parse(window.localStorage.getItem('favorite'));

const loadFav = function (type, gridItem) {
  console.log(gridItem);
  Object.values(favData[type]).forEach(item => {
    let card;

    if (favType === 'photos') {
      card = photoCard(item);
    }
    if (favType === 'videos') {
      card = videoCard(item);
    }

    updateGrid(card, gridItem.columnsHeight, gridItem.columns);
  });
};

loadFav(favType, favGrid);
