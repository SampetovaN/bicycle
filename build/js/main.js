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



(function () {
  var header = document.querySelector('.header');
  var buttonOpenMenu = document.querySelector('.main-nav__toggle');
  var buttonCloseMenu = document.querySelector('.main-nav__toggle-list');
  var menu = document.querySelector('.main-nav__wrapper');
  var OPENED_MENU = 'main-nav__wrapper--opened';
  var CLOSED_MENU = 'main-nav__wrapper--closed';
  var NOJS_TAG = 'header--nojs';
  var MENUOPENED_TAG = 'header--menu-opened';

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
      buttonOpenMenu.focus();
      buttonOpenMenu.addEventListener('click', onClickButtonOpenMenu);
      document.removeEventListener('keydown', onEscKeyDown);
      header.classList.remove(MENUOPENED_TAG)
    };
    var onClickButtonOpenMenu = function () {
      menu.classList.remove(CLOSED_MENU);
      menu.classList.add(OPENED_MENU);
      buttonCloseMenu.focus();
      buttonCloseMenu.addEventListener('click', onClickButtonCloseMenu);
      document.addEventListener('keydown', onEscKeyDown);
      header.classList.add(MENUOPENED_TAG)
    };

    buttonOpenMenu.addEventListener('click', onClickButtonOpenMenu);
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
