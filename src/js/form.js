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
  var nameTextValue;
  var reviewTextValue;
  var getRateValue = function() {
    var rateValue;
    for (var i = 0; i < rate.length; i++) {
      if (rate[i].checked) {
        rateValue = rate[i].getAttribute('value');
      }
    }
    return rateValue;
  };
  var getTextValue = function() {
    nameTextValue = nameText.value.trim();
    reviewTextValue = reviewText.value.trim();
  };
  var hideHints = function() {
    getTextValue();
    if (nameTextValue !== '' && reviewTextValue !== '') {
      hintControls.style.display = 'none';
    } else if (nameTextValue !== '' ) {
      nameHint.style.display = 'none';
    } else if (reviewTextValue !== '') {
      textHint.style.display = 'none';
    } else {
      hintControls.style.display = 'inline-block';
      nameHint.style.display = 'inline-block';
      textHint.style.display = 'inline-block';
    }
  };
  var validateForm = function() {
    getTextValue();
    submitButton.disabled = true;
    if (getRateValue() < MIN_GOOD_RATE) {
      reviewText.required = true;
      if (nameTextValue !== '' && reviewTextValue !== '') {
        submitButton.disabled = false;
      }
    } else {
      if (nameTextValue !== '') {
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
