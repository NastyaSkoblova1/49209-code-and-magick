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

  inherit: function(ChildClass, ParentClass) {
    if (typeof ChildClass === 'function' && typeof ParentClass === 'function') {
      var EmptyConstructor = function() {};
      EmptyConstructor.prototype = ParentClass.prototype;
      ChildClass.prototype = new EmptyConstructor();
    }
  }
};
