'use strict';

(function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  var template = document.querySelector('template');
  var reviewList = document.querySelector('.reviews-list');
  var valueRatingClass = ['one', 'two', 'three', 'four', 'five'];
  var templateContainer = 'content' in template ? template.content : template;
  var templateContainerReview = templateContainer.querySelector('.review');
  var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
  reviewsFilter.classList.add('invisible');
  var getReviewElement = function(reviewItem) {
    var reviewElement = templateContainerReview.cloneNode(true);
    var reviewAuthor = reviewElement.querySelector('.review-author');
    var reviewRating = reviewElement.querySelector('.review-rating');
    var reviewText = reviewElement.querySelector('.review-text');
    reviewRating.classList.add('review-rating-' + valueRatingClass[reviewItem.rating - 1]);
    reviewText.textContent = reviewItem.description;
    var authorImage = new Image();
    var reviews = [];
    authorImage.onload = function() {
      reviewAuthor.alt = reviewItem.author.name;
      reviewAuthor.src = reviewItem.author.picture;
      reviewAuthor.width = 124;
      reviewAuthor.height = 124;
    };

    var loadReviews = function(url, callback, callbackName) {
      if (!callbackName) {
        callbackName = 'cb' + Date.now();
      }
      window[callbackName] = function(data) {
        callback(data);
      };

      var script = document.createElement('script');
      script.src = url + '?callback=' + callbackName;
      document.body.appendChild(script);
    };

    authorImage.onerror = function() {
      reviewElement.classList.add('review-load-failure');
    };

    authorImage.src = reviewItem.author.picture;

    return reviewElement;
  };

  var showReviews = function(reviewItem) {
    reviews.forEach(function(review) {
      reviewList.appendChild(getReviewElement(review));
    });
  }
  loadReviews(REVIEWS_LOAD_URL, showReviews, '__jsonpCallback');
  reviewsFilter.classList.remove('invisible');
})();
