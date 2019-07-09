'use strict';

(function () {
  // Отрисовка пинов

  window.map = {
    renderPins: function () {
      for (var j = 0; j < window.renderPins.length; j++) {
        var listPins = document.querySelector('.map__pins');
        var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
        var pinElement = pinTemplate.cloneNode(true);
        pinElement.style = 'left: ' + window.renderPins[j].location.x + 'px; top: ' + window.renderPins[j].location.y + 'px;';
        pinElement.querySelector('img').src = window.renderPins[j].author.avatar;
        pinElement.querySelector('img').alt = window.renderPins[j].offer.type;
        listPins.appendChild(pinElement);
      }
    }
  };

})();
