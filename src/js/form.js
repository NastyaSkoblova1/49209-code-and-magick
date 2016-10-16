'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

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
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();

var MIN_GOOD_RATE = 3;
var rate = document.querySelectorAll('.review-form-group-mark input[type="radio"]');
var rateGroup = document.querySelector('.review-form-group-mark');
var nameText = document.querySelector('#review-name');
var reviewText = document.querySelector('#review-text');
var hintControls = document.querySelector('.review-fields');
var nameHint = document.querySelector('.review-fields-name');
var textHint = document.querySelector('.review-fields-text');
var submitButton = document.querySelector('.review-submit');

var getRateValue = function() {
  for (var i = 0; i < rate.length; i++) {
    var rateValue;
    if (rate[i].checked) {
      rateValue = rate[i].getAttribute('value');
    }
  }
  return rateValue;
};

var setRequired = function() {
  if (getRateValue() < MIN_GOOD_RATE) {
    reviewText.setAttribute('required', '');
  }
};

var checkNameField = function() {
  if (nameText.value !== '') {
    nameHint.style.display = 'none';
  }
};

var checkTextField = function() {
  if (reviewText.value !== '') {
    textHint.style.display = 'none';
  }
};

var checkControlsField = function() {
  if (nameText.value !== '' && reviewText.value !== '') {
    hintControls.style.display = 'none';
  }
};

var changeDisabledButton = function() {
  if (getRateValue() < MIN_GOOD_RATE) {
    if (nameText.value !== '' && reviewText.value !== '') {
      submitButton.removeAttribute('disabled');
    }
  } else {
    if (nameText.value !== '') {
      submitButton.removeAttribute('disabled');
    }
  }
};

rateGroup.onchange = function() {
  setRequired();
};

nameText.onblur = function() {
  checkNameField();
  checkControlsField();
  changeDisabledButton();
};

reviewText.onblur = function() {
  checkTextField();
  checkControlsField();
  changeDisabledButton();
};
