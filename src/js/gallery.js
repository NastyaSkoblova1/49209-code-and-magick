'use strict';

var BaseComponent = require('./component.js');
var utils = require('./utils');

var Gallery = function(el, picturesItems) {
  BaseComponent.call(this, el);
  this.pictures = picturesItems;
  this.activePicture = 0;
  this.overlayGalleryControlLeft = document.querySelector('.overlay-gallery-control-left');
  this.overlayGalleryControlRight = document.querySelector('.overlay-gallery-control-right');
  this.previewNumberCurrent = document.querySelector('.preview-number-current');
  this.previewNumberTotal = document.querySelector('.preview-number-total');
  this.overlayGalleryClose = document.querySelector('.overlay-gallery-close');
  this.overlayGalleryPreview = document.querySelector('.overlay-gallery-preview');

  this.hide = this.hide.bind(this);
  this.onControlLeftClick = this.onControlLeftClick.bind(this);
  this.onControlRightClick = this.onControlRightClick.bind(this);
};

utils.inherit(Gallery, BaseComponent);

Gallery.prototype.show = function(currentPicture) {
  this.overlayGalleryClose.addEventListener('click', this.hide);
  this.overlayGalleryControlLeft.addEventListener('click', this.onControlLeftClick);
  this.overlayGalleryControlRight.addEventListener('click', this.onControlRightClick);
  this.element.classList.remove('invisible');
  this.setActivePicture(currentPicture);
};

Gallery.prototype.hide = function() {
  this.element.classList.add('invisible');
  this.overlayGalleryClose.onclick = null;
  this.overlayGalleryControlLeft.onclick = null;
  this.overlayGalleryControlRight.onclick = null;
};

Gallery.prototype.setActivePicture = function(currentPicture) {
  this.activePicture = currentPicture;
  var picture = new Image();
  picture.src = this.pictures[currentPicture];
  if (this.overlayGalleryPreview.lastChild.nodeName === 'IMG') {
    this.overlayGalleryPreview.replaceChild(picture, this.overlayGalleryPreview.lastChild);
  } else {
    this.overlayGalleryPreview.appendChild(picture);
  }

  this.previewNumberTotal.innerHTML = this.pictures.length;
  this.previewNumberCurrent.innerHTML = this.activePicture + 1;

  this.overlayGalleryControlLeft.classList.toggle('invisible', currentPicture === 0);
  this.overlayGalleryControlRight.classList.toggle('invisible', currentPicture === this.pictures.length - 1);

  utils.inherit(picture, BaseComponent);
};

Gallery.prototype.onGalleryCloseClick = function() {
  this.hide();
};

Gallery.prototype.onControlLeftClick = function() {
  if (this.activePicture > 0) {
    this.activePicture--;
    this.setActivePicture(this.activePicture);
  }
};

Gallery.prototype.onControlRightClick = function() {
  if (this.activePicture < this.pictures.length - 1) {
    this.activePicture++;
    this.setActivePicture(this.activePicture);
  }
};

module.exports = Gallery;
