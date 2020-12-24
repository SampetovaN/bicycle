'use strict';

(function () {
  var inputPhone = document.querySelector('#user-phone');
  var INVALID_PHONE_MESSAGE = 'Пожалуйста, введите номер телефона в формате 8-xxx-xxx-xx-xx';
  if (inputPhone) {
    var checkInputPhone = function () {
      if (inputPhone.validity.patternMismatch) {
        inputPhone.setCustomValidity(INVALID_PHONE_MESSAGE);
      } else {
        inputPhone.setCustomValidity('');
      }
    };
    inputPhone.addEventListener('input', function () {
      checkInputPhone();
    });
  }
})();
