'use strict';

var Review = function(reviewItem) {
  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
  var templateContainerReview = templateContainer.querySelector('.review');
  this.element = templateContainerReview.cloneNode(true);
  this.valueRatingClass = ['one', 'two', 'three', 'four', 'five'];
  this.data = reviewItem;
  this.reviewAuthor = this.element.querySelector('.review-author');
  this.reviewRating = this.element.querySelector('.review-rating');
  this.reviewText = this.element.querySelector('.review-text');
  this.reviewText.textContent = this.data.description;
  this.authorImage = new Image();
  this.reviewQuizAnswer = this.element.querySelectorAll('.review-quiz-answer');

  this.onAuthorImageLoad = this.onAuthorImageLoad.bind(this);
  this.onAuthorImageError = this.onAuthorImageError.bind(this);

  this.addReview();
  this.setActive();
};

Review.prototype.addReview = function() {
  this.reviewRating.classList.add('review-rating-' + this.valueRatingClass[this.data.rating - 1]);
  this.authorImage.addEventListener('load', this.onAuthorImageLoad);
  this.authorImage.addEventListener('error', this.onAuthorImageError);

  this.authorImage.src = this.data.author.picture;
};

Review.prototype.setActive = function() {
  var self = this;

  // for (var i = 0; i < this.reviewQuizAnswer.length; i++) {
  //   this.reviewQuizAnswer[i].onclick = function() {
  //     for (var j = 0; j < self.reviewQuizAnswer.length; j++) {
  //       self.reviewQuizAnswer[j].classList.remove('review-quiz-answer-active');
  //     }
  //     this.classList.add('review-quiz-answer-active');
  //   };
  // }

  for (var i = 0; i < this.reviewQuizAnswer.length; i++) {
    this.reviewQuizAnswer[i].addEventListener('click', function() {
      for (var j = 0; j < this.reviewQuizAnswer.length; j++) {
        this.reviewQuizAnswer[j].classList.remove('review-quiz-answer-active');
      }
      this.classList.add('review-quiz-answer-active');
    }.bind(this));
  }
};

Review.prototype.remove = function() {
  for (var i = 0; i < this.reviewQuizAnswer.length; i++) {
    this.reviewQuizAnswer[i].onclick = null;
  }
};

Review.prototype.onAuthorImageError = function() {
  this.element.classList.add('review-load-failure');
};

Review.prototype.onAuthorImageLoad = function() {
  this.reviewAuthor.alt = this.data.author.name;
  this.reviewAuthor.src = this.data.author.picture;
  this.reviewAuthor.width = 124;
  this.reviewAuthor.height = 124;
};

module.exports = Review;
