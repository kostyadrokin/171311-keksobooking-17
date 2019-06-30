'use strict';
(function () {
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
      } if (mapPinMain.offsetLeft - shift.x + MAIN_PIN_WIDTH >= window.util.shirina) {
        mapPinMain.style.left = (window.data.shirina - MAIN_PIN_WIDTH) + 'px';
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.querySelector('#address').value = (mapPinMain.offsetLeft + (MAIN_PIN_WIDTH / 2)) + ', ' + (mapPinMain.offsetTop + MAIN_PIN_HEIGHT + 22); // pageXOffset и pageYOffset это смещение при скролле
      window.map.renderPins();
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
})();
