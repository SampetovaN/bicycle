'use strict';

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


(function () {
  var header = document.querySelector('.header');
  var buttonOpenMenu = document.querySelector('.main-nav__toggle');
  var buttonCloseMenu = document.querySelector('.main-nav__toggle-list');
  var menu = document.querySelector('.main-nav__wrapper');
  var OPENED_MENU = 'main-nav__wrapper--opened';
  var CLOSED_MENU = 'main-nav__wrapper--closed';
  var NOJS_TAG = 'header--nojs';
  if (header) {
    header.classList.remove(NOJS_TAG);
  }
  if (buttonOpenMenu && buttonCloseMenu && menu) {

    var onEscKeyDown = function (evt) {
      window.utils.isEscEvent(evt, onClickButtonCloseMenu);
    };

    var onClickButtonCloseMenu = function () {
      menu.classList.remove(OPENED_MENU);
      menu.classList.add(CLOSED_MENU);
      buttonOpenMenu.addEventListener('click', onClickButtonOpenMenu);
      document.removeEventListener('keydown', onEscKeyDown);
    };
    var onClickButtonOpenMenu = function () {
      menu.classList.remove(CLOSED_MENU);
      menu.classList.add(OPENED_MENU);
      buttonCloseMenu.addEventListener('click', onClickButtonCloseMenu);
      document.addEventListener('keydown', onEscKeyDown);
    };

    buttonOpenMenu.addEventListener('click', onClickButtonOpenMenu);
    document.addEventListener('keydown', onEscKeyDown);
  }
})();

(function () {
  var ESCAPE_BUTTON = 'Escape';

  var isEscEvent = function (evt, action) {
    if (evt.key === ESCAPE_BUTTON) {
      evt.preventDefault();
      action(evt);
    }
  };

  window.utils = {
    isEscEvent: isEscEvent
  };
})();
