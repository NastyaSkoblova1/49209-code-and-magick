'use strict';

var DataReview = function(data) {
  this.data = data;
};

DataReview.prototype.getAuthorName = function() {
  return this.data.author.name;
};

DataReview.prototype.setAuthorName = function(authorName) {
  this.data.author.name = authorName;
};

DataReview.prototype.getAuthorPicture = function() {
  return this.data.author.picture;
};

DataReview.prototype.setAuthorPicture = function(authorPicture) {
  this.data.author.picture = authorPicture;
};

DataReview.prototype.getReviewUsefulness = function() {
  return this.data.review_usefulness;
};

DataReview.prototype.setReviewUsefulness = function(reviewUsefulness, callback) {
  this.data.review_usefulness = reviewUsefulness;
  if (typeof callback === 'function') {
    callback();
  }
};

DataReview.prototype.getRating = function() {
  return this.data.rating;
};

DataReview.prototype.setRating = function(reviewRating) {
  this.data.rating = reviewRating;
};

DataReview.prototype.getDescription = function() {
  return this.data.description;
};

DataReview.prototype.setDescription = function(reviewDescription) {
  this.data.description = reviewDescription;
};

module.exports = DataReview;
