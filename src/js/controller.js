'use strict';

import 'core-js/stable';

import { ripple } from './utils/ripple';
import themeManager from './view/theme.js';
import searchController from './view/search.js';
import { addEventOnElements } from './utils/event';

window.addEventListener('DOMContentLoaded', () => {
  // Instantiate the ThemeManager
  themeManager.addEventListeners();

  // Instantiate the SearchController
  searchController.addEventListeners();
});

// Header on-scroll state
const header = document.querySelector('.header');
window.addEventListener('scroll', function () {
  header.classList[window.scrollY > 60 ? 'add' : 'remove']('active');
});

// Add ripple effect to elements with the 'data-ripple' attribute
const rippleElems = document.querySelectorAll('[data-ripple]');
rippleElems.forEach(rippleElem => ripple(rippleElem));

// Navbar toggle
const navbar = document.querySelector('.navigation');
const navbarTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('.overlay');

addEventOnElements(navbarTogglers, 'click', function () {
  navbar.classList.toggle('show');
  overlay.classList.toggle('active');
});