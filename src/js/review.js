'use strict';

var BaseComponent = require('./component.js');
var utils = require('./utils');

var Review = function(el, reviewItem) {
  BaseComponent.call(this, el);
  this.valueRatingClass = ['one', 'two', 'three', 'four', 'five'];
  this.data = reviewItem;
  this.reviewAuthor = this.element.querySelector('.review-author');
  this.reviewRating = this.element.querySelector('.review-rating');
  this.reviewText = this.element.querySelector('.review-text');
  this.reviewText.textContent = this.data.getDescription();
  this.authorImage = new Image();
  this.reviewQuizAnswer = this.element.querySelectorAll('.review-quiz-answer');

  this.onAuthorImageLoad = this.onAuthorImageLoad.bind(this);
  this.onAuthorImageError = this.onAuthorImageError.bind(this);

  this.addReview();
  this.setActive();
};

utils.inherit(Review, BaseComponent);

Review.prototype.addReview = function() {
  this.reviewRating.classList.add('review-rating-' + this.valueRatingClass[this.data.getRating() - 1]);
  this.authorImage.addEventListener('load', this.onAuthorImageLoad);
  this.authorImage.addEventListener('error', this.onAuthorImageError);

  this.authorImage.src = this.data.getAuthorPicture();
};

Review.prototype.setActive = function() {
  var self = this;
  for (var i = 0; i < this.reviewQuizAnswer.length; i++) {
    this.reviewQuizAnswer[i].addEventListener('click', function() {
      for (var j = 0; j < self.reviewQuizAnswer.length; j++) {
        self.reviewQuizAnswer[j].classList.remove('review-quiz-answer-active');
      }
      this.classList.add('review-quiz-answer-active');
    });
  }
};

Review.prototype.remove = function() {
  for (var i = 0; i < this.reviewQuizAnswer.length; i++) {
    this.reviewQuizAnswer[i].onclick = null;
  }

  BaseComponent.prototype.remove.call(this);
};

Review.prototype.onAuthorImageError = function() {
  this.element.classList.add('review-load-failure');
};

Review.prototype.onAuthorImageLoad = function() {
  this.reviewAuthor.alt = this.data.getAuthorName();
  this.reviewAuthor.src = this.data.getAuthorPicture();
  this.reviewAuthor.width = 124;
  this.reviewAuthor.height = 124;
};

module.exports = Review;
