'use strict';

module.exports = function(list, filterID) {
  var date = new Date();
  var days = date.getDay() - 1000 * 3600 * 24 * 3;
  switch(filterID) {
    case 'reviews-all':
      listReview = list;
      break;
    case 'reviews-recent':
      var arr = list.filter(function(listReviewItem) {
        return listReviewItem.created <= days;
      }).sort(function(a, b) {
        return b.created - a.created;
      });
      break;
    case 'reviews-good':
      listReview = list.filter(function(listReviewItem) {
        return listReviewItem.rating >= 3;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case 'reviews-bad':
      listReview = list.filter(function(listReviewItem) {
        return listReviewItem.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    // case 'reviews-popular':
    //   listReview = list.filter(function(listReviewItem) {
    //     return listReviewItem.review_usefulness;
    //   }).sort(function(a, b) {
    //     return b.review_usefulness - a.review_usefulness;
    //   });
    //   break;
  }

  return list;
};
