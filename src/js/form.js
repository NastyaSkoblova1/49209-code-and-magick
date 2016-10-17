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
  var nameTextValue;
  var reviewTextValue;
  var getTextValue = function() {
    nameTextValue = nameText.value.trim();
    reviewTextValue = reviewText.value.trim();
  };
  var toggleHints = function() {
    if (nameTextValue.length > 0 && reviewTextValue.length > 0) {
      hintControls.classList.add('invisible');
    } else if (nameTextValue.length > 0) {
      nameHint.classList.add('invisible');
    } else if (reviewTextValue.length > 0) {
      textHint.classList.add('invisible');
    } else {
      hintControls.classList.remove('invisible');
      nameHint.classList.remove('invisible');
      textHint.classList.remove('invisible');
    }
  };
  var validateForm = function() {
    getTextValue();
    if (reviewMarks.value < MIN_GOOD_RATE) {
      reviewText.required = true;
      submitButton.disabled = !(nameTextValue.length > 0);
      submitButton.disabled = !(reviewTextValue.length > 0);
    } else {
      submitButton.disabled = !(nameTextValue.length > 0);
    }
    toggleHints();
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
