'use strict';


var getDisabled = function (formArray) {
  for (var i = 0; i < formArray.length; i++) {
    formArray[i].setAttribute('disabled', 'disabled');
  }
};

var getAbortDisabled = function (formArray) {
  for (var i = 0; i < adFormList.length; i++) {
    formArray[i].removeAttribute('disabled');
  }
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.map').classList.remove('map--faded');
};

var mapFilters = document.querySelector('.map__filters').children;
getDisabled(mapFilters);


var adFormList = document.querySelector('.ad-form').children;
getDisabled(adFormList);


var mapPinMain = document.querySelector('.map__pin--main');

mapPinMain.addEventListener('click', function () {
  getAbortDisabled(adFormList);
  getAbortDisabled(mapFilters);
});

mapPinMain.addEventListener('mouseup', function () {
  var mapPinMainCoord = mapPinMain.getBoundingClientRect();
  document.querySelector('#address').value = (mapPinMainCoord.left + pageXOffset) + ', ' + (mapPinMainCoord.top + pageYOffset);
});

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Функция создания объекта для массива с данными (моки)
var createData = function () {
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
};
var mapWidth = document.querySelector('.map__pins').offsetWidth;
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var nearAd = [];

// Генерация массива с данными для пинов (моки)
createData();


var listPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


// Отрисовка пинов
var renderPins = function () {
  for (var j = 0; j < nearAd.length; j++) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + nearAd[j].location.x + 'px; top: ' + nearAd[j].location.y + 'px;';
    pinElement.querySelector('img').src = nearAd[j].author.avatar;
    pinElement.querySelector('img').alt = nearAd[j].offer.type;
    listPins.appendChild(pinElement);
  }
};

renderPins();
