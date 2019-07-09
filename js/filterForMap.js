'use strict';
(function() {

  var clearMapPins = function () {
    var mapPinsElement = document.querySelector('.map__pins');
    mapPinsElement.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
        mapPinsElement.removeChild(pin);
      });
  };

  var mapFiltersHousingType = document.getElementById("housing-type");
  mapFiltersHousingType.addEventListener('change', function () {
    clearMapPins();
    var selectedHouseType = mapFiltersHousingType.options[mapFiltersHousingType.selectedIndex].value;
    if (selectedHouseType === 'any') {
      window.renderPins = window.pins;
      window.map.renderPins();
    } else {
      window.renderPins = window.pins.filter(function(obj) {
        return obj.offer.type === selectedHouseType;
      });
      window.map.renderPins();
    }
  });
})();
