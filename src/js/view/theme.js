'use strict';

class ThemeManager {
  constructor() {
    this.themeButton = document.querySelector('.theme-btn');

    this.setThemePreference();
  }

  // Set the theme based on user preference or system preference
  setThemePreference() {
    const userPreference = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    const theme = userPreference || systemPreference;
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Function to toggle the theme between light and dark
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  // Add event listener to the theme button for theme toggling
  addEventListeners() {
    this.themeButton.addEventListener('click', this.toggleTheme.bind(this));
  }
}

export default new ThemeManager();
