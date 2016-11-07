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

  this.addReview();
  this.setActive();
};

Review.prototype.addReview = function() {
  var self = this;
  this.reviewRating.classList.add('review-rating-' + this.valueRatingClass[this.data.rating - 1]);
  this.authorImage.onload = function() {
    self.reviewAuthor.alt = self.data.author.name;
    self.reviewAuthor.src = self.data.author.picture;
    self.reviewAuthor.width = 124;
    self.reviewAuthor.height = 124;
  };
  this.authorImage.onerror = function() {
    self.element.classList.add('review-load-failure');
  };

  this.authorImage.src = this.data.author.picture;
};

Review.prototype.setActive = function() {
  var self = this;

  for (var i = 0; i < this.reviewQuizAnswer.length; i++) {
    this.reviewQuizAnswer[i].onclick = function() {
      for (i = 0; i < self.reviewQuizAnswer.length; i++) {
        self.reviewQuizAnswer[i].classList.remove('review-quiz-answer-active');
      }
      this.classList.add('review-quiz-answer-active');
    };
  }
};

Review.prototype.remove = function() {
  for (var i = 0; i < this.reviewQuizAnswer.length; i++) {
    this.reviewQuizAnswer[i].onclick = null;
  }
};

module.exports = Review;
