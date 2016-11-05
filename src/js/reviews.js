'use strict';

var loadReview = require('./load.js');
var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
var reviewsFilter = document.querySelector('.reviews-filter');
var Review = require('./review.js');

reviewsFilter.classList.add('invisible');

var showReviews = function(reviewsItems) {
  var reviewList = document.querySelector('.reviews-list');
  reviewsItems.forEach
  (function(review) {
    // reviewList.appendChild(getReviewElement(review));
    var reviewObject = new Review(review);
    reviewList.appendChild(reviewObject.element);
  });
  reviewsFilter.classList.remove('invisible');
};

var reviews = function() {
  loadReview(REVIEWS_LOAD_URL, showReviews, '__jsonpCallback');
};

module.exports = reviews;
