'use strict';

// import { API_KEY } from '../utils/API_KEY.js';
import { urlEncode } from '../utils/urlEncode.js';

class PexelsClient {
  /**
   * Constructor: Initialize the API_KEY and root URLs.
   * @param {string} API_KEY - Your Pexels API key.
   */
  constructor(API_KEY) {
    this.API_KEY = process.env.API_KEY;
    this.root = {
      default: 'https://api.pexels.com/v1/',
      videos: 'https://api.pexels.com/videos/',
    };
  }

  /**
   * Asynchronous function to fetch data from Pexels API.
   * @param {string} url - The URL to fetch data from.
   * @param {Function} successCallback - The callback function to handle successful API response.
   */
  async fetchData(url, successCallback) {
    try {
      const res = await fetch(url, {
        headers: { Authorization: this.API_KEY },
      });

      // Check if the response is not OK
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      // Call the successCallback with the fetched data.
      successCallback(data);
    } catch (err) {
      // Catch and handle any errors that occurred during the API request.
      console.error('Error occurred during API request:', err);
    }
  }

  /**
   * Method to search for photos or videos using specified parameters.
   * @param {String} type - Item type ('photos' or 'videos').
   * @param {Object} parameters - URL Object with search parameters.
   * @param {Function} callback - Callback function to handle the fetched data.
   */
  searchItems(type, parameters, callback) {
    const requestUrl =
      type === 'videos'
        ? `${this.root.videos}search?${urlEncode(parameters)}`
        : `${this.root.default}search?${urlEncode(parameters)}`;

    this.fetchData(requestUrl, callback);
  }

  /**
   * Method to get the detail of a single photo or video by its ID.
   * @param {String} type - Item type ('photos' or 'videos').
   * @param {String} id - Item ID.
   * @param {Function} callback - Callback function to handle the fetched data.
   */
  getDetail(type, id, callback) {
    const requestUrl =
      type === 'videos'
        ? `${this.root.videos}videos/${id}`
        : `${this.root.default}photos/${id}`;

    this.fetchData(requestUrl, callback);
  }

  /**
   * Method to get curated photos using specified parameters.
   * @param {Object} parameters - URL Object with parameters.
   * @param {Function} callback - Callback function to handle the fetched data.
   */
  curated(parameters, callback) {
    const requestUrl = `${this.root.default}curated?${urlEncode(parameters)}`;
    this.fetchData(requestUrl, callback);
  }

  /**
   * Get Popular videos
   * @param {Object} parameters Url Object
   * @param {Function} callback Callback function
   */
  popularVideos(parameters, callback) {
    const requestUrl = `${this.root.videos}popular?${urlEncode(parameters)}`;
    this.fetchData(requestUrl, callback);
  }

  /**
   * Get featured collections
   * @param {String} id - Video ID.
   * @param {Function} callback - Callback function to handle the fetched data.
   */
  featured(parameters, callback) {
    const requestUrl = `${this.root.default}collections/featured?${urlEncode(
      parameters
    )}`;
    this.fetchData(requestUrl, callback);
  }

  /**
   * Method to get featured collections using specified parameters.
   * @param {Object} parameters - URL Object with parameters.
   * @param {Function} callback - Callback function to handle the fetched data.
   */
  collectionDetail(id, parameters, callback) {
    const requestUrl = `${this.root.default}/collections/${id}?${urlEncode(
      parameters
    )}`;
    this.fetchData(requestUrl, callback);
  }
}

export default new PexelsClient(process.env.API_KEY);
