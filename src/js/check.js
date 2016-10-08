'use strict';
function getMessage(a, b) {
  var textMessage;
  if (typeof a === 'boolean') {
    if(a) {
      textMessage = 'Я попал в ' + b;
    } else {
      textMessage = 'Я никуда не попал';
    }
  } else if (typeof a === 'number') {
    textMessage = 'Я прыгнул на ' + a * 100 + ' сантиметров';
  } else if(Array.isArray(a)) {
    if (Array.isArray(b)) {
      var distancePath = 0;
      for (var i = 0; i < a.length; i++) {
        distancePath += a[i] * b[i];
      }
      textMessage = 'Я прошёл ' + distancePath + ' метров';
    } else {
      var numberOfSteps = 0;
      for (i = 0; i < a.length; i++) {
        numberOfSteps += a[i];
      }
      textMessage = 'Я прошёл ' + numberOfSteps + ' шагов';
    }
  } else {
    textMessage = 'Переданы неккоректные данные';
  }
  return textMessage;
}
