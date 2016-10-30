'use strict';

var activePicture = 0;

var Gallery = function(picturesItems) {
  this.pictures = picturesItems;
  this.activePicture = activePicture;
  this.overlayGallery = document.querySelector('.overlay-gallery');
  this.overlayGalleryControlLeft = document.querySelector('.overlay-gallery-control-left');
  this.overlayGalleryControlRight = document.querySelector('.overlay-gallery-control-right');
  this.previewNumberCurrent = document.querySelector('.preview-number-current');
  this.previewNumberTotal = document.querySelector('.preview-number-total');
  this.overlayGalleryClose = document.querySelector('.overlay-gallery-close');
  this.overlayGalleryPreview = document.querySelector('.overlay-gallery-preview');
};

Gallery.prototype.show = function(currentPicture) {
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
  this.setActivePicture(currentPicture);
};

Gallery.prototype.hide = function() {
  this.overlayGallery.classList.add('invisible');
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
