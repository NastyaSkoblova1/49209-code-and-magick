'use strict';

var load = require('./load.js');
var Review = require('./review.js');
var REVIEWS_LOAD_URL = '/api/reviews';
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewList = document.querySelector('.reviews-list');
var reviewsControlsMore = document.querySelectorAll('reviews-controls-more');
var activeFilter = 'reviews-all';
var pageNumber = 0;
var pageSize = 3;
reviewsFilter.classList.add('invisible');

var showReviews = function(reviewsItems) {
  reviewsItems.forEach(function(review) {
    // reviewList.appendChild(getReviewElement(review));
    var reviewObject = new Review(review);
    reviewList.appendChild(reviewObject.element);
  });
  reviewsFilter.classList.remove('invisible');
};

var loadReview = function(filter, currentPageNumber) {
  load(REVIEWS_LOAD_URL, {
    from: currentPageNumber * pageSize,
    to: currentPageNumber * pageSize + pageSize,
    filter: filter
  }, showReviews);
};

var changeFilter = function(filterID) {
  reviewList.innerHTML = '';
  activeFilter = filterID;
  pageNumber = 0;
  loadReview(filterID, pageNumber);
};

reviewsFilter.addEventListener('change', function(evt) {
  if (evt.target.classList.contains('reviews-filter-item')) {
    changeFilter(evt.target.id);
  }
});

module.exports = reviews;
