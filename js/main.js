'use strict';

var mapPinMain = document.querySelector('.map__pin--main');
var MAIN_PIN_WIDTH = mapPinMain.offsetWidth;
var MAIN_PIN_HEIGHT = mapPinMain.offsetHeight;

var getDisabled = function (formArray) {
  for (var i = 0; i < formArray.length; i++) {
    formArray[i].setAttribute('disabled', 'disabled');
  }
};

var getAbortDisabled = function (formArray) {
  for (var i = 0; i < formArray.length; i++) {
    formArray[i].removeAttribute('disabled');
  }
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.map').classList.remove('map--faded');
};

var mapFilters = document.querySelector('.map__filters').children;
getDisabled(mapFilters);

var adFormList = document.querySelector('.ad-form').children;
getDisabled(adFormList);

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

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordsPin = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoordsPin.x - moveEvt.clientX,
      y: startCoordsPin.y - moveEvt.clientY
    };

    startCoordsPin = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (mapPinMain.offsetTop - shift.y <= 130) {
      mapPinMain.style.top = 130 + 'px';
    } if (mapPinMain.offsetTop - shift.y + MAIN_PIN_HEIGHT >= 630) {
        mapPinMain.style.top = 630 - MAIN_PIN_HEIGHT + 'px';
    } else {
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    }

    if (mapPinMain.offsetLeft - shift.x <= 0) {
      mapPinMain.style.left = 0 + 'px';
    } if (mapPinMain.offsetLeft - shift.x + MAIN_PIN_WIDTH >= mapWidth) {
        mapPinMain.style.left = (mapWidth - MAIN_PIN_WIDTH) + 'px';
    } else {
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.querySelector('#address').value = (mapPinMain.offsetLeft + (MAIN_PIN_WIDTH / 2)) + ', ' + (mapPinMain.offsetTop + MAIN_PIN_HEIGHT + 22); // pageXOffset и pageYOffset это смещение при скролле
    renderPins();
    var formAdress = document.querySelector('#address');
    formAdress.setAttribute('readonly', 'readonly');

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  getAbortDisabled(adFormList);
  getAbortDisabled(mapFilters);

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// Валидация
var adForm = document.querySelector('.ad-form');
adForm.setAttribute('action', 'https://js.dump.academy/keksobooking');

var formTitle = document.querySelector('#title');
var formTitleValidation = function (minlength, maxlength, required) {
  formTitle.setAttribute('minlength', minlength);
  formTitle.setAttribute('maxlength', maxlength);
  formTitle.required = required;
};

var formPrice = document.querySelector('#price');
var formPriceValidation = function (max, required) {
  formPrice.required = required;
  formPrice.setAttribute('max', max);
};

formTitleValidation(30, 100, true);
formPriceValidation(1000000, true);

var formType = document.querySelector('#type');
formType.addEventListener('change', function () {
  var options = formType.querySelectorAll('option');
  for (var i = 0; i < options.length; i++) {
    if (options[i].selected && options[i].value === 'bungalo') {
      formPrice.setAttribute('min', 0);
    } if (options[i].selected && options[i].value === 'flat') {
      formPrice.setAttribute('min', 1000);
    } if (options[i].selected && options[i].value === 'house') {
      formPrice.setAttribute('min', 5000);
    } if (options[i].selected && options[i].value === 'palace') {
      formPrice.setAttribute('min', 10000);
    }
  }
});

var formTimeIn = document.querySelector('#timein');
var formTimeOut = document.querySelector('#timeout');

formTimeIn.addEventListener('change', function () {
  var optionsIn = formTimeIn.querySelectorAll('option');
  var optionsOut = formTimeOut.querySelectorAll('option');
  for (var i = 0; i < optionsIn.length; i++) {
    if (optionsIn[i].selected) {
      optionsOut[i].selected = true;
    }
  }
});

formTimeOut.addEventListener('change', function () {
  var optionsIn = formTimeIn.querySelectorAll('option');
  var optionsOut = formTimeOut.querySelectorAll('option');
  for (var i = 0; i < optionsOut.length; i++) {
    if (optionsOut[i].selected) {
      optionsIn[i].selected = true;
    }
  }
});
