'use strict';

var Game = require('./game.js');
var form = require('./form.js');
var reviews = require('./reviews.js');
var Gallery = require('./gallery.js');

var game = new Game(document.querySelector('.demo'));
game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

var picturesItems = [];
var galleryImages = document.querySelectorAll('.photogallery-image img');
var galleryImagesArray = Array.prototype.slice.call(galleryImages);

for (var i = 0; i < galleryImages.length; i++) {
  picturesItems[i] = galleryImages[i].src;
}
var gallery = new Gallery(picturesItems);

galleryImagesArray.forEach(function(picture, currentPicture) {
  picture.onclick = function() {
    gallery.show(currentPicture);
  };
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

reviews();
