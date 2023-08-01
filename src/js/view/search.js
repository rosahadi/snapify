'use strict';

import { addEventOnElements } from '../utils/event.js';
import { ripple } from '../utils/ripple.js';
import { updateSearchHistory } from '../utils/search_history.js';
import { getSearchHistory } from '../utils/search_history.js';
import { updateURL } from '../utils/updateURL.js';
import { urlDecode } from '../utils/urlDecode.js';
import { option } from './search_option.js';

class SearchController {
  constructor() {
    this.searchView = document.querySelector('.search-view');
    this.searchTogglers = document.querySelectorAll('[data-search-toggler]');
    this.searchField = document.querySelector('.input-field');
    this.searchClearBtn = document.querySelector('[data-search-clear-btn]');
    this.searchOption = document.querySelector('[data-option="search"]');
    this.activeOptionBtn = this.searchOption.querySelector(
      '[data-option-btn].selected'
    );
    this.searchBtn = document.querySelector('[data-search-btn]');
    this.searchList = document.querySelector('.list');

    this.searchType = this.activeOptionBtn.dataset.optionValue;

    this.renderSearchList();
    this.setSearchFieldFromURL();
  }

  addEventListeners() {
    // Toggle the 'active' class on the search view when search togglers are clicked
    addEventOnElements(this.searchTogglers, 'click', () =>
      this.searchView.classList.toggle('active')
    );

    // Clear the search field when the search clear button is clicked
    this.searchClearBtn.addEventListener(
      'click',
      () => (this.searchField.value = '')
    );

    // Initializes and tracks the search type based on user-selected options.
    option(this.searchOption, optionValue => (this.searchType = optionValue));

    // Updates URL and search history upon search button click.
    this.searchBtn.addEventListener('click', () => this.onSearchButtonClick());

    //  Submit search when press on "Enter" key
    this.searchField.addEventListener('keydown', e =>
      this.onSearchFieldKeyDown(e)
    );
  }

  // Function to handle search button click
  onSearchButtonClick() {
    const searchValue = this.searchField.value.trim();
    if (searchValue) {
      updateSearchHistory(searchValue);
      updateURL(searchValue, this.searchType);
    }
  }

  // Function to handle "Enter" key press in the search field
  onSearchFieldKeyDown(event) {
    if (event.key === 'Enter' && this.searchField.value.trim()) {
      event.preventDefault();
      this.searchBtn.click();
    }
  }

  // Function to handle search item click in the search list
  onSearchItemClicked(historyItem) {
    this.searchField.value = historyItem;
    this.searchBtn.click();
  }

  // Function to render the search history list
  renderSearchList() {
    const searchHistory = getSearchHistory();
    const historyItems = Array.from(searchHistory);

    historyItems.forEach(historyItem => {
      const searchItem = document.createElement('button');
      searchItem.classList.add('list-item');

      searchItem.innerHTML = `
        <i class="ph ph-clock-counter-clockwise leading-icon"></i>
        <span class="body-large text">${historyItem}</span>
        <div class="state-layer"></div>
      `;

      ripple(searchItem);

      searchItem.addEventListener('click', () =>
        this.onSearchItemClicked(historyItem)
      );

      this.searchList.appendChild(searchItem);
    });
  }

  // Function to set the search field from the URL
  setSearchFieldFromURL() {
    const search = urlDecode(window.location.search.slice(1));
    if (search.query) {
      this.searchField.value = search.query;
    }
  }
}

export default new SearchController();
