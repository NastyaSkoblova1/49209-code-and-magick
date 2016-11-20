'use strict';

var Game = require('./game.js');
var form = require('./form.js');
var Reviews = require('./reviews.js');
var Gallery = require('./gallery.js');

var game = new Game(document.querySelector('.demo'));
game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

// var picturesItems = [];
var galleryImages = document.querySelectorAll('.photogallery-image img');
var galleryImagesArray = Array.prototype.slice.call(galleryImages);

// for (var i = 0; i < galleryImages.length; i++) {
//   picturesItems[i] = galleryImages[i].src;
// }

var picturesItems = galleryImagesArray.map(function(picture) {
  return picture.attributes.src.nodeValue;
});

var containerGallery = document.querySelector('.overlay-gallery');
var gallery = new Gallery(containerGallery, picturesItems);

galleryImagesArray.forEach(function(picture) {
  picture.onclick = function() {
    location.hash = '#photo/' + picture.attributes.src.nodeValue;
    gallery.show(location.hash);
  };
});

window.addEventListener('load', function() {
  gallery.onHashChange();
});

var formOpenButton = document.querySelector('.reviews-controls-new');

/** @param {MouseEvent} evt */
formOpenButton.onclick = function(evt) {
  evt.preventDefault();

  form.open(function() {
    game.setGameStatus(Game.Verdict.PAUSE);
    game.setDeactivated(true);
  });
};

form.onClose = function() {
  game.setDeactivated(false);
};

var reviews = new Reviews();
