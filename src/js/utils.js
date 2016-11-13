'use strict';

module.exports = {
  throttle: function(func, timeout) {
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
  },

  inherit: function(ChildClass, BaseClass) {
    return function() {
      var EmptyConstructor = function() {};

      EmptyConstructor.prototype = BaseClass.prototype;
      ChildClass.prototype = new EmptyConstructor();
    };
  }
};
