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
  var nameRegExp = /^[A-Z]/;
  var reviewRegExp = /\S/;
  var testName;
  var testReview;
  var getRateValue = function() {
    var rateValue;
    for (var i = 0; i < rate.length; i++) {
      if (rate[i].checked) {
        rateValue = rate[i].getAttribute('value');
      }
    }
    return rateValue;
  };
  var hideHints = function() {
    testName = nameRegExp.test(nameText.value);
    testReview = reviewRegExp.test(reviewText.value);
    if (nameText.value !== '' && reviewText.value !== '' && testName && testReview) {
      hintControls.style.display = 'none';
    } else if (nameText.value !== '' && testName) {
      nameHint.style.display = 'none';
    } else if (reviewText.value !== '' && testReview) {
      textHint.style.display = 'none';
    } else {
      hintControls.style.display = 'inline-block';
      nameHint.style.display = 'inline-block';
      textHint.style.display = 'inline-block';
    }
  };
  var validateForm = function() {
    testName = nameRegExp.test(nameText.value);
    testReview = reviewRegExp.test(reviewText.value);
    submitButton.disabled = true;
    if (getRateValue() < MIN_GOOD_RATE) {
      reviewText.required = true;
      if (nameText.value !== '' && reviewText.value !== '' && testName && testReview) {
        submitButton.disabled = false;
      }
    } else {
      if (nameText.value !== '' && testName) {
        submitButton.disabled = false;
      }
    }
    hideHints();
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
  validateForm();

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

  textHint.onclick = function() {
    validateForm();
  };

  return form;
})();
