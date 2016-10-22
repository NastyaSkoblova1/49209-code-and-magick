'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var MIN_GOOD_RATE = 3;
  var rate = document.querySelectorAll('.review-form-group-mark input[type="radio"]');
  var nameText = document.querySelector('#review-name');
  var reviewText = document.querySelector('#review-text');
  var hintControls = document.querySelector('.review-fields');
  var nameHint = document.querySelector('.review-fields-name');
  var textHint = document.querySelector('.review-fields-text');
  var submitButton = document.querySelector('.review-submit');
  var reviewMarks = document.querySelector('.review-form')['review-mark'];
  var setCookiesExpires = function() {
    var currentDate = new Date();
    var dayGraceHopper = new Date(currentDate.getFullYear(), 11, 9);
    var dayCount;

    if (dayGraceHopper > currentDate) {
      dayGraceHopper.setFullYear(currentDate.getFullYear() - 1);
    }

    dayCount = currentDate - dayGraceHopper;
    return dayCount;
  };
  var setCookies = function() {
    var cookiesExpires = setCookiesExpires();
    window.Cookies.set('review-mark', reviewMarks.value, {expires: cookiesExpires});
    window.Cookies.set('review-name', nameText.value, {expires: cookiesExpires});
  };
  var getCookies = function() {
    reviewMarks.value = window.Cookies.get('review-mark');
    nameText.value = window.Cookies.get('review-name');
  };
  var validateForm = function() {
    var nameTextValue = nameText.value.trim();
    var reviewTextValue = reviewText.value.trim();
    var nameHintValidate = nameTextValue.length > 0;
    var reviewTextValidate = reviewTextValue.length > 0 || reviewMarks.value >= MIN_GOOD_RATE;
    nameHint.classList.toggle('invisible', nameHintValidate);
    textHint.classList.toggle('invisible', reviewTextValidate);
    hintControls.classList.toggle('invisible', nameHintValidate && reviewTextValidate);
    if (reviewMarks.value < MIN_GOOD_RATE) {
      reviewText.required = true;
    }
    submitButton.disabled = !(nameHintValidate && reviewTextValidate);
  };

  for (var i = 0; i < rate.length; i++) {
    rate[i].onchange = function() {
      validateForm();
    };
  }
  nameText.oninput = function() {
    validateForm();
  };
  reviewText.oninput = function() {
    validateForm();
  };
  submitButton.onclick = function() {
    setCookies();
  };
  validateForm();
  getCookies();

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },
  };
  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
