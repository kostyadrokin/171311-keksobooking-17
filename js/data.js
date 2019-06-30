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

})();
