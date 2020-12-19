
(function () {
  var inputPhone = document.querySelector('#user-phone');
  if (inputPhone) {
    var checkInputPhone = function () {

      if (inputPhone.validity.patternMismatch) {
        inputPhone.setCustomValidity('Пожалуйста, введите номер телефона в формате 8-xxx-xxx-xx-xx');
      } else {
        inputPhone.setCustomValidity('');
      }
      return true;
    };
    inputPhone.addEventListener('input', function () {
      checkInputPhone();
    });
  }
})();
