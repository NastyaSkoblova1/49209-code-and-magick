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
  // this.setActive();
};

utils.inherit(Review, BaseComponent);

Review.prototype.addReview = function() {
  this.reviewRating.classList.add('review-rating-' + this.valueRatingClass[this.data.getRating() - 1]);
  this.authorImage.addEventListener('load', this.onAuthorImageLoad);
  this.authorImage.addEventListener('error', this.onAuthorImageError);
  this.reviewQuiz.addEventListener('click', this.onQuizAnswerClick);

  this.authorImage.src = this.data.getAuthorPicture();
};

// Review.prototype.setActive = function() {
//   var self = this;
//   for (var i = 0; i < this.reviewQuizAnswer.length; i++) {
//     this.reviewQuizAnswer[i].addEventListener('click', function() {
//       for (var j = 0; j < self.reviewQuizAnswer.length; j++) {
//         self.reviewQuizAnswer[j].classList.remove('review-quiz-answer-active');
//       }
//       this.classList.add('review-quiz-answer-active');
//     });
//   }
// };

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
  var currentUsefulness = this.data.getReviewUsefulness();
  var recentUsefulness = currentUsefulness;

  if (evt.target.classList.contains('review-quiz-answer-active')) {
    return false;
  }
  if (evt.target.classList.contains('review-quiz-answer')) {
    if (evt.target.classList.contains('review-quiz-answer-yes')) {
      recentUsefulness = ++currentUsefulness;
    } else {
      recentUsefulness = --currentUsefulness;
    }
    this.data.setReviewUsefulness(recentUsefulness, this.setQuizActive.bind(this, evt));
  } else {
    return false;
  }
};

Review.prototype.setQuizActive = function(evt) {
  for (var j = 0; j < this.reviewQuizAnswer.length; j++) {
    this.reviewQuizAnswer[j].classList.remove('review-quiz-answer-active');
  }
  evt.target.classList.add('review-quiz-answer-active');
};

module.exports = Review;
