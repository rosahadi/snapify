'use strict';

import { addEventOnElements } from '../utils/event';

export const option = function (option, callback) {
  const optionBtns = option.querySelectorAll('[data-option-btn]');
  let lastSelectedOption = option.querySelector('[data-option-btn].selected');

  addEventOnElements(optionBtns, 'click', function () {
    lastSelectedOption.classList.remove('selected');
    this.classList.add('selected');
    lastSelectedOption = this;
    const selectedOptionValue = this.dataset.optionValue;
    callback(selectedOptionValue);
  });
};
