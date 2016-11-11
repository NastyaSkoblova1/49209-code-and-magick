'use strict';

var load = require('./load.js');
var Review = require('./review.js');

var Reviews = function() {
  this.REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
  this.reviewsFilter = document.querySelector('.reviews-filter');
  this.reviewList = document.querySelector('.reviews-list');
  this.reviewsControlsMore = document.querySelector('.reviews-controls-more');
  this.activeFilter = 'reviews-all';
  this.pageNumber = 0;
  this.pageSize = 3;

  this.showFilters();
  this.attachEvents();
};

Reviews.prototype.showFilters = function() {
  this.reviewsFilter.classList.add('invisible');
};

Reviews.prototype.hideFilters = function() {
  this.reviewsFilter.classList.remove('invisible');
};

Reviews.prototype.showControls = function() {
  this.reviewsControlsMore.classList.remove('invisible');
};

Reviews.prototype.showReviews = function(reviewsItems) {
  var self = this;
  reviewsItems.forEach(function(review) {
    // reviewList.appendChild(getReviewElement(review));
    var reviewObject = new Review(review);
    self.reviewList.appendChild(reviewObject.element);
  });
};

Reviews.prototype.loadReview = function(filter, currentPageNumber) {
  load(this.REVIEWS_LOAD_URL, {
    from: currentPageNumber * this.pageSize,
    to: currentPageNumber * this.pageSize + this.pageSize,
    filter: this.activeFilter
  }, this.showReviews);
  this.pageNumber++;
  this.hideFilters();
  this.showControls();
};

Reviews.prototype.changeFilter = function(filter) {
  this.reviewList.innerHTML = '';
  this.activeFilter = filter;
  this.pageNumber = 0;
  this.loadReview(filter, this.pageNumber);
};

Reviews.prototype.attachEvents = function() {
  var self = this;
  this.reviewsControlsMore.addEventListener('click', function() {
    self.loadReview(this.activeFilter, this.pageNumber);
  });

  this.reviewsFilter.addEventListener('change', function(evt) {
    var filterID = evt.target.id;
    self.changeFilter(filterID);
  }, true);
};

// changeFilter(activeFilter);
