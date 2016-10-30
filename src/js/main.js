'use strict';

var Game = require('./game.js');
var form = require('./form.js');
var reviews = require('./reviews.js');
var Gallery = require('./gallery.js');

var game = new Game(document.querySelector('.demo'));
game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

var pictures = [];
var galleryImages = document.querySelectorAll('.photogallery-image');

for (var i = 0; i < galleryImages.length; i++) {
  pictures[i] = galleryImages[i].src;
}
var gallery = new Gallery(pictures);

galleryImages.forEach(function(picture, activePicture) {
  picture.onclick = function() {
    gallery.show(activePicture);
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
