'use strict';

document.querySelector('.map').classList.remove('map--faded');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var mapWidth = document.querySelector('.map__pins').offsetWidth;

var offerTypes = ['palace', 'flat', 'house', 'bungalo'];

var nearAd = [];

for (var i = 0; i <= 7; i++) {
  var offerType = offerTypes[Math.floor(Math.random() * offerTypes.length)];
  nearAd.push(
      {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          type: offerType
        },

        location: {
          x: getRandom(0, mapWidth),
          y: getRandom(130, 630)
        }
      }
  );
}

var listPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

for (var i = 0; i < nearAd.length; i++) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + nearAd[i].location.x + 'px; top: ' + nearAd[i].location.y + 'px;';
  pinElement.querySelector('img').src = nearAd[i].author.avatar;
  pinElement.querySelector('img').alt = nearAd[i].offer.type;
  listPins.appendChild(pinElement);
}
