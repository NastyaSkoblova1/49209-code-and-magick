'use strict';

var overlayGallery = document.querySelector('.overlay-gallery');
var overlayGalleryControlLeft = document.querySelector('.overlay-gallery-control-left');
var overlayGalleryControlRight = document.querySelector('.overlay-gallery-control-right');
var previewNumberCurrent = document.querySelector('.preview-number-current');
var previewNumberTotal = document.querySelector('.preview-number-total');
var overlayGalleryClose = document.querySelector('.overlay-gallery-close');
var overlayGalleryPreview = document.querySelector('.overlay-gallery-preview');
var activePicture = 0;

var Gallery = function(pictures) {
  this.pictures = pictures;
  this.activePicture = activePicture;
  this.overlayGallery = overlayGallery;
  this.overlayGalleryControlLeft = overlayGalleryControlLeft;
  this.overlayGalleryControlRight = overlayGalleryControlRight;
  this.previewNumberCurrent = previewNumberCurrent;
  this.previewNumberTotal = previewNumberTotal;
  this.overlayGalleryPreview = overlayGalleryPreview;
  this.overlayGalleryClose = overlayGalleryClose;
};

Gallery.prototype.show = function(activePicture) {
  var self = this;
  this.overlayGalleryClose.onclick = function(evt) {
    evt.preventDefault();
    self.onGalleryCloseClick();
  };
  this.overlayGalleryControlLeft.onclick = function(evt) {
    evt.preventDefault();
    self.onControlLeftClick();
  };
  this.overlayGalleryControlRight.onclick = function(evt) {
    evt.preventDefault();
    self.onControlRightClick();
  };
  this.overlayGallery.classList.remove('invisible');
  this.setActivePicture(activePicture);
};

Gallery.prototype.hide = function() {
  this.overlayGallery.classList.add('invisible');
  this.overlayGalleryClose.onclick = null;
  this.overlayGalleryControlLeft.onclick = null;
  this.overlayGalleryControlRight.onclick = null;
};

Gallery.prototype.setActivePicture = function(activePicture) {
  this.activePicture = activePicture;
  var picture = new Image();
  picture.src = this.pictures[activePicture];
  if (overlayGalleryPreview.lastChild === 'img') {
    this.overlayGalleryPreview.replaceChild(picture, this.overlayGalleryPreview);
  } else {
    this.overlayGalleryPreview.appendChild(picture);
  }
};

Gallery.prototype.onGalleryCloseClick = function() {
  this.hide();
};

Gallery.prototype.onControlLeftClick = function() {
  if (activePicture > 0) {
    activePicture = activePicture - 1;
    this.setActivePicture(activePicture);
  }
};

Gallery.prototype.onControlRightClick = function() {
  if (activePicture < this.pictures.length - 1) {
    activePicture = activePicture + 1;
    this.setActivePicture(activePicture);
  }
};

module.exports = Gallery;
