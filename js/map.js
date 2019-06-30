'use strict';

(function () {
  // Отрисовка пинов
  var listPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  window.map = {
    renderPins: function () {
      for (var j = 0; j < window.util.nearAd.length; j++) {
        var pinElement = pinTemplate.cloneNode(true);
        pinElement.style = 'left: ' + window.util.nearAd[j].location.x + 'px; top: ' + window.util.nearAd[j].location.y + 'px;';
        pinElement.querySelector('img').src = window.util.nearAd[j].author.avatar;
        pinElement.querySelector('img').alt = window.util.nearAd[j].offer.type;
        listPins.appendChild(pinElement);
      }
    }
  };
})();
