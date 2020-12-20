
(function () {
  var inputPhone = document.querySelector('#user-phone');
  if (inputPhone) {
    var INVALID_PHONE_MESSAGE = 'Пожалуйста, введите номер телефона в формате 8-xxx-xxx-xx-xx';
    var checkInputPhone = function () {
      inputPhone.validity.patternMismatch ? inputPhone.setCustomValidity(INVALID_PHONE_MESSAGE) : inputPhone.setCustomValidity('');
    };
    inputPhone.addEventListener('input', function () {
      checkInputPhone();
    });
  }
})();
