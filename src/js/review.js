'use strict';

module.exports = function(reviewItem) {
  var template = document.querySelector('template');
  var templateContainer = 'content' in template ? template.content : template;
  var templateContainerReview = templateContainer.querySelector('.review');
  var reviewElement = templateContainerReview.cloneNode(true);
  var reviewAuthor = reviewElement.querySelector('.review-author');
  var reviewRating = reviewElement.querySelector('.review-rating');
  var reviewText = reviewElement.querySelector('.review-text');
  var valueRatingClass = ['one', 'two', 'three', 'four', 'five'];
  reviewRating.classList.add('review-rating-' + valueRatingClass[reviewItem.rating - 1]);
  reviewText.textContent = reviewItem.description;
  var authorImage = new Image();
  authorImage.onload = function() {
    reviewAuthor.alt = reviewItem.author.name;
    reviewAuthor.src = reviewItem.author.picture;
    reviewAuthor.width = 124;
    reviewAuthor.height = 124;
  };
  authorImage.onerror = function() {
    reviewElement.classList.add('review-load-failure');
  };

  authorImage.src = reviewItem.author.picture;

  return reviewElement;
};
