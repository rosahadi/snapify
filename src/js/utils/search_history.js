'use strict';

const MAX_SEARCH_HISTORY_LENGTH = 8;

// Retrieve search history from localStorage
export const getSearchHistory = function () {
  const storedHistory = window.localStorage.getItem('search-history');
  return storedHistory ? new Set(JSON.parse(storedHistory)) : new Set();
};

// Save the updated search history to localStorage
const saveSearchHistory = function (searchHistory) {
  window.localStorage.setItem(
    'search-history',
    JSON.stringify(Array.from(searchHistory))
  );
};

// Update search history with a new search value
export const updateSearchHistory = function (searchValue) {
  let searchHistory = getSearchHistory();

  if (searchHistory.has(searchValue)) {
    searchHistory.delete(searchValue);
  }

  searchHistory = new Set([searchValue, ...searchHistory]);

  // If the history exceeds the limit, remove the oldest entry
  if (searchHistory.size > MAX_SEARCH_HISTORY_LENGTH) {
    const oldestEntry = Array.from(searchHistory).pop();
    searchHistory.delete(oldestEntry);
  }

  saveSearchHistory(searchHistory);
};
