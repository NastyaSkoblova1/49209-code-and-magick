'use strict';

module.exports = function(func, timeout) {
  var isThrottled = true;

  return function() {
    if (isThrottled) {
      func();
      isThrottled = false;
    }
    setTimeout(function() {
      isThrottled = true;
    }, timeout);
  };
};
