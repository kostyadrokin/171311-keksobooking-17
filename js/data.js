'use strict';
(function () {
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Функция создания объекта для массива с данными (моки)
  var createData = function () {
    for (var i = 0; i <= 7; i++) {
      var offerType = offerTypes[Math.floor(Math.random() * offerTypes.length)];
      window.util.nearAd.push(
          {
            author: {
              avatar: 'img/avatars/user0' + (i + 1) + '.png'
            },

            offer: {
              type: offerType
            },

            location: {
              x: getRandom(0, window.util.mapWidth),
              y: getRandom(130, 630)
            }
          }
      );
    }
  };

  var offerTypes = ['palace', 'flat', 'house', 'bungalo'];

  // Генерация массива с данными для пинов (моки)
  createData();

  var errorHandler = function () {
    var errorParent = document.querySelector('main');
    var errorContainer = document.querySelector('#error')
      .content
      .querySelector('.error').cloneNode(true);

    errorParent.appendChild(errorContainer);

    var removeErrorMessage = function () {
      errorParent.removeChild(errorContainer);
      document.removeEventListener('click', onErrorClose);
      document.removeEventListener('keydown', onErrorClose);
    };

    var onErrorClose = function (evt) {
      window.util.isEscOrClick(evt, removeErrorMessage);
    };

    document.addEventListener('click', onErrorClose);
    document.addEventListener('keydown', onErrorClose);

  };

  var createApartments = function (apartmentServerSideData) {
    var apartmentsList = [];
    for (var i = 0; i < apartmentServerSideData.length; i++) {
      var apartment = apartmentServerSideData[i];
      apartmentsList.push(apartment);
    }
    window.pins = apartmentsList;
  };

  window.backend.load(createApartments, errorHandler);

})();
