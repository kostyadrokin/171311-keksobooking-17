'use strict';

document.querySelector('.map').classList.remove('map--faded');

var nearAd = [
  {
    author: {
      avatar: 'img/avatars/user01.png'
    },

    offer: {
      type: palace
    },

    location: {
      x: 24,
      y: 130
    }
  }
/*
  {
    author: {
      avatar: 'img/avatars/user02.png'
    },

    offer: {
      type: flat
    },

    location: {
      x: 24,
      y: 130
    }
  },

  {
    author: {
      avatar: 'img/avatars/user03.png'
    },

    offer: {
      type: house
    },

    location: {
      x: 24,
      y: 130
    }
  },

  {
    author: {
      avatar: 'img/avatars/user04.png'
    },

    offer: {
      type: bungalo
    },

    location: {
      x: 24,
      y: 130
    }
  },

  {
    author: {
      avatar: 'img/avatars/user05.png'
    },

    offer: {
      type: palace
    },

    location: {
      x: 24,
      y: 130
    }
  },

  {
    author: {
      avatar: 'img/avatars/user06.png'
    },

    offer: {
      type: flat
    },

    location: {
      x: 24,
      y: 130
    }
  },

  {
    author: {
      avatar: 'img/avatars/user07.png'
    },

    offer: {
      type: house
    },

    location: {
      x: 24,
      y: 130
    }
  },

  {
    author: {
      avatar: 'img/avatars/user08.png'
    },

    offer: {
      type: bungalo
    },

    location: {
      x: 24,
      y: 130
    }
  }*/
];

var listPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

for (var i = 0; i < nearAd.length; i++) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('style').textContent = 'left: ' + nearAd[i].location.x + 'px; top: ' + nearAd[i].location.y + 'px;';
  pinElement.querySelector('src').textContent = nearAd[i].author.avatar;
  pinElement.querySelector('alt').textContent = nearAd[i].offer.type;
  listPins.appendChild(pinElement);
};

