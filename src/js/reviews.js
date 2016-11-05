'use strict';

var loadReview = require('./load.js');
var getReviewElement = require('./review.js');
var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
var reviewsFilter = document.querySelector('.reviews-filter');
var Review = require('./review.js');

reviewsFilter.classList.add('invisible');

var showReviews = function(reviewsItems) {
  var reviewList = document.querySelector('.reviews-list');
  reviewsItems.forEach(function(review) {
    // reviewList.appendChild(getReviewElement(review));
    reviewList.appendChild(new Review(getReviewElement(review)));
  });
  reviewsFilter.classList.remove('invisible');
};

var reviews = function() {
  loadReview(REVIEWS_LOAD_URL, showReviews, '__jsonpCallback');
};

module.exports = reviews;
