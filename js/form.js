'use strict';
(function () {
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
})();
