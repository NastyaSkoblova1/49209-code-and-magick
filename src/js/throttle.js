'use strict';

module.exports = function(func, timeout) {
  var isThrottled = true;

  function wrapper() {
    if (isThrottled) {
      func();
      isThrottled = false;
    }
    setTimeout(function() {
      isThrottled = true;
    }, timeout);
  }

  return wrapper;
};
