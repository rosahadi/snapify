'use strict';

import pexelClient from '../model/api-configure.js';

export const favorite = function (elem, type, id) {
  elem.addEventListener('click', function () {
    elem.setAttribute('disabled', '');

    const favoriteObj = JSON.parse(window.localStorage.getItem('favorite'));

    if (!favoriteObj[type][id]) {
      pexelClient.getDetail(type, id, function (data) {
        elem.classList.toggle('active');
        elem.removeAttribute('disabled');

        favoriteObj[type][id] = data;

        // Change the icon class to 'ph-fill ph-heart-straight'
        const iconElement = elem.querySelector('i');
        iconElement.classList.remove('ph-bold');
        iconElement.classList.add('ph-fill');

        window.localStorage.setItem('favorite', JSON.stringify(favoriteObj));
      });
    } else {
      elem.classList.toggle('active');
      elem.removeAttribute('disabled');

      delete favoriteObj[type][id];

      // Change the icon class back to 'ph-bold ph-heart-straight'
      const iconElement = elem.querySelector('i');
      iconElement.classList.remove('ph-fill');
      iconElement.classList.add('ph-bold');

      window.localStorage.setItem('favorite', JSON.stringify(favoriteObj));
    }
  });
};
