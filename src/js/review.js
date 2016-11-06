'use strict';

var template = document.querySelector('template');
var templateContainer = 'content' in template ? template.content : template;
var templateContainerReview = templateContainer.querySelector('.review');
var reviewElement = templateContainerReview.cloneNode(true);
var valueRatingClass = ['one', 'two', 'three', 'four', 'five'];

var Review = function(reviewItem) {
  this.data = reviewItem;
  this.element = reviewElement;
  this.reviewAuthor = this.element.querySelector('.review-author');
  this.reviewRating = this.element.querySelector('.review-rating');
  this.reviewText = this.element.querySelector('.review-text');
  this.reviewText.textContent = this.data.description;
  this.authorImage = new Image();
  this.authorImage.src = this.data.author.picture;
  this.reviewQuizAnswer = this.element.querySelectorAll('.review-quiz-answer');
};

Review.prototype.addReview = function() {
  this.reviewRating.classList.add('review-rating-' + valueRatingClass[this.element.rating - 1]);
  this.authorImage.onload = function() {
    this.reviewAuthor.alt = this.data.author.name;
    this.reviewAuthor.src = this.data.author.picture;
    this.reviewAuthor.width = 124;
    this.reviewAuthor.height = 124;
  };
  this.authorImage.onerror = function() {
    this.element.classList.add('review-load-failure');
  };
};

Review.prototype.setActive = function() {
  for (var i = 0; i < this.reviewQuizAnswer.length; i++) {
    this.reviewQuizAnswer[i].onclick = function() {
      this.reviewQuizAnswer[i].classList.add('review-quiz-answer-active');
    };
  }
};

Review.prototype.remove = function() {
  for (var i = 0; i < this.reviewQuizAnswer.length; i++) {
    this.reviewQuizAnswer[i].onclick = null;
  }
};

module.exports = Review;
