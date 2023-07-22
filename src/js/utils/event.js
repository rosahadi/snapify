'use strict';

/**
 * Adds an event listener to multiple DOM elements.
 *
 * @param {Array<HTMLElement>} elements - An array of DOM elements to which the event listener will be attached.
 * @param {string} eventType - A string representing the type of event (e.g., 'click', 'mouseover', 'keydown', etc.).
 * @param {Function} callback - The callback function that will be executed when the specified event is triggered.
 */

export const addEventOnElements = function (elements, eventType, callback) {
  elements.forEach(element => {
    element.addEventListener(eventType, callback);
  });
};
