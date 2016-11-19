'use strict';

var BaseComponent = require('./component.js');
var utils = require('./utils');
var DataReview = require('./datareview.js');

var Review = function(el, reviewItem) {
  BaseComponent.call(this, el);
  this.valueRatingClass = ['one', 'two', 'three', 'four', 'five'];
  this.data = new DataReview(reviewItem);
  this.reviewAuthor = this.element.querySelector('.review-author');
  this.reviewRating = this.element.querySelector('.review-rating');
  this.reviewText = this.element.querySelector('.review-text');
  this.reviewText.textContent = this.data.getDescription();
  this.authorImage = new Image();
  this.reviewQuiz = this.element.querySelector('.review-quiz');
  this.reviewQuizAnswer = this.element.querySelectorAll('.review-quiz-answer');

  this.onAuthorImageLoad = this.onAuthorImageLoad.bind(this);
  this.onAuthorImageError = this.onAuthorImageError.bind(this);
  this.onQuizAnswerClick = this.onQuizAnswerClick.bind(this);

  this.addReview();
};

utils.inherit(Review, BaseComponent);

Review.prototype.addReview = function() {
  this.reviewRating.classList.add('review-rating-' + this.valueRatingClass[this.data.getRating() - 1]);
  this.authorImage.addEventListener('load', this.onAuthorImageLoad);
  this.authorImage.addEventListener('error', this.onAuthorImageError);
  this.reviewQuiz.addEventListener('click', this.onQuizAnswerClick);

  this.authorImage.src = this.data.getAuthorPicture();
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

Review.prototype.onQuizAnswerClick = function(evt) {
  var eventTarget = evt.target;
  var recentUsefulness = this.data.getReviewUsefulness();

  if (!eventTarget.classList.contains('review-quiz-answer')) {
    return;
  }
  if (!eventTarget.classList.contains('review-quiz-answer-active')) {
    recentUsefulness += eventTarget.classList.contains('review-quiz-answer-yes') ? 1 : -1;
    this.data.setReviewUsefulness(recentUsefulness, this.setQuizActive.bind(this, eventTarget));
  }
};

Review.prototype.setQuizActive = function(eventTarget) {
  for (var j = 0; j < this.reviewQuizAnswer.length; j++) {
    this.reviewQuizAnswer[j].classList.remove('review-quiz-answer-active');
  }
  eventTarget.classList.add('review-quiz-answer-active');
};

module.exports = Review;
