'use strict';

module.exports = function(list, filterID) {
  var days = new Date()  - 1000 * 3600 * 24 * 3;
  switch(filterID) {
    case 'reviews-all':
      return list;
      break;
    case 'reviews-recent':
      var arr = list.filter(function(listReviewItem) {
        return listReviewItem.created <= days;
      }).sort(function(a, b) {
        return b.created - a.created;
      });
      break;
    case 'reviews-good':
      return list.filter(function(listReviewItem) {
        return listReviewItem.rating >= 3;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case 'reviews-bad':
      return list.filter(function(listReviewItem) {
        return listReviewItem.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case 'reviews-popular':
      return list.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }

  return list;
};
