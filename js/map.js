'use strict';

(function () {
  // Отрисовка пинов

  window.map = {
    renderPins: function () {
      for (var j = 0; j < window.pins.length; j++) {
        var listPins = document.querySelector('.map__pins');
        var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
        var pinElement = pinTemplate.cloneNode(true);
        pinElement.style = 'left: ' + window.pins[j].location.x + 'px; top: ' + window.pins[j].location.y + 'px;';
        pinElement.querySelector('img').src = window.pins[j].author.avatar;
        pinElement.querySelector('img').alt = window.pins[j].offer.type;
        listPins.appendChild(pinElement);
      }
    }
  };

})();
