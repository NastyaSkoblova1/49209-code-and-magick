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
  this.onHashChange = this.onHashChange.bind(this);
  window.addEventListener('hashchange', this.onHashChange);
};

utils.inherit(Gallery, BaseComponent);

Gallery.prototype.show = function(currentPicture) {
  var pictureSrc = typeof currentPicture === 'string' ? this.pictures.indexOf(currentPicture) : currentPicture;
  this.overlayGalleryClose.addEventListener('click', this.hide);
  this.overlayGalleryControlLeft.addEventListener('click', this.onControlLeftClick);
  this.overlayGalleryControlRight.addEventListener('click', this.onControlRightClick);
  this.element.classList.remove('invisible');
  this.setActivePicture(pictureSrc);
};

Gallery.prototype.hide = function() {
  this.element.classList.add('invisible');
  this.overlayGalleryClose.onclick = null;
  this.overlayGalleryControlLeft.onclick = null;
  this.overlayGalleryControlRight.onclick = null;
  location.hash = '';
};

Gallery.prototype.setActivePicture = function(pictureSrc) {
  this.activePicture = pictureSrc;
  var picture = new Image();
  picture.src = this.pictures[pictureSrc];
  if (this.overlayGalleryPreview.lastChild.nodeName === 'IMG') {
    this.overlayGalleryPreview.replaceChild(picture, this.overlayGalleryPreview.lastChild);
  } else {
    this.overlayGalleryPreview.appendChild(picture);
  }

  this.previewNumberTotal.innerHTML = this.pictures.length;
  this.previewNumberCurrent.innerHTML = this.activePicture + 1;

  this.overlayGalleryControlLeft.classList.toggle('invisible', pictureSrc === 0);
  this.overlayGalleryControlRight.classList.toggle('invisible', pictureSrc === this.pictures.length - 1);
};

Gallery.prototype.onGalleryCloseClick = function() {
  this.hide();
};

Gallery.prototype.onControlLeftClick = function() {
  if (this.activePicture > 0) {
    location.hash = '#photo' + this.pictures[this.activePicture - 1];
    this.setActivePicture(location.hash);
  }
};

Gallery.prototype.onControlRightClick = function() {
  if (this.activePicture < this.pictures.length - 1) {
    location.hash = '#photo' + this.pictures[this.activePicture + 1];
    this.setActivePicture(location.hash);
  }
};

Gallery.prototype.onHashChange = function() {
  var regExp = /#photo\/(\S+)/;
  var locationHash = location.hash.match(regExp);
  if (locationHash) {
    this.show(location.hash);
  } else {
    this.hide();
  }
};

module.exports = Gallery;
