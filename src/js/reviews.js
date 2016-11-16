'use strict';

var load = require('./load.js');
var Review = require('./review.js');

var template = document.querySelector('template');
var templateContainer = 'content' in template ? template.content : template;
var templateContainerReview = templateContainer.querySelector('.review');

var Reviews = function() {
  this.REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
  this.reviewsFilter = document.querySelector('.reviews-filter');
  this.reviewList = document.querySelector('.reviews-list');
  this.reviewsControlsMore = document.querySelector('.reviews-controls-more');
  this.activeFilter = 'reviews-all';
  this.pageNumber = 0;
  this.pageSize = 3;

  this.onChangeFilter = this.onChangeFilter.bind(this);
  this.onControlsMoreClick = this.onControlsMoreClick.bind(this);

  this.hideFilters();
  this.loadReview(this.activeFilter, this.pageNumber);
  this.attachEvents();

  this.reviewsArr = [];
};

Reviews.prototype.hideFilters = function() {
  this.reviewsFilter.classList.add('invisible');
};

Reviews.prototype.showFilters = function() {
  this.reviewsFilter.classList.remove('invisible');
};

Reviews.prototype.showControls = function() {
  this.reviewsControlsMore.classList.remove('invisible');
};

Reviews.prototype.showReviews = function(reviewsItems) {
  var currentFilter = localStorage.getItem('currentFilter');
  reviewsItems.forEach(function(review) {
    var reviewObject = new Review(templateContainerReview.cloneNode(true), review);
    this.reviewsArr.push(reviewObject);
    this.reviewList.appendChild(reviewObject.element);
  }.bind(this));

  if (currentFilter) {
    document.getElementById(currentFilter).checked = true;
  }
};

Reviews.prototype.loadReview = function(filter, currentPageNumber) {
  this.activeFilter = filter;
  load(this.REVIEWS_LOAD_URL, {
    from: currentPageNumber * this.pageSize,
    to: currentPageNumber * this.pageSize + this.pageSize,
    filter: filter
  }, function(data) {
    this.showReviews(data);
  }.bind(this));
  this.pageNumber++;
  this.showFilters();
  this.showControls();
};

Reviews.prototype.changeFilter = function(filter) {
  this.reviewsArr.forEach(function(item) {
    item.remove();
  });
  this.activeFilter = filter;
  this.pageNumber = 0;
  this.reviewsArr = [];
  this.loadReview(filter, this.pageNumber);
};

Reviews.prototype.attachEvents = function() {
  this.reviewsFilter.addEventListener('change', this.onChangeFilter, true);
  this.reviewsControlsMore.addEventListener('click', this.onControlsMoreClick);
};

Reviews.prototype.onChangeFilter = function(evt) {
  var filterID = evt.target.id;
  localStorage.setItem('currentFilter', filterID);
  this.changeFilter(filterID);
};

Reviews.prototype.onControlsMoreClick = function() {
  this.loadReview(this.activeFilter, this.pageNumber);
};

module.exports = Reviews;
