
(function () {
  var header = document.querySelector('.header');
  var buttonOpenMenu = document.querySelector('.main-nav__toggle');
  var buttonCloseMenu = document.querySelector('.main-nav__toggle-list');
  var menu = document.querySelector('.main-nav__wrapper');
  var OPENED_MENU = 'main-nav__wrapper--opened';
  var CLOSED_MENU = 'main-nav__wrapper--closed';
  if (header) {
    header.classList.remove('header--nojs');
  }
  if (buttonOpenMenu && buttonCloseMenu && menu) {
    var onClickButtonCloseMenu = function () {
      menu.classList.remove(OPENED_MENU);
      menu.classList.add(CLOSED_MENU);
      buttonCloseMenu.removeEventListener('click', onClickButtonCloseMenu);
      buttonOpenMenu.addEventListener('click', onClickButtonOpenMenu);
    };
    var onClickButtonOpenMenu = function () {
      menu.classList.remove(CLOSED_MENU);
      menu.classList.add(OPENED_MENU);
      buttonOpenMenu.removeEventListener('click', onClickButtonOpenMenu);
      buttonCloseMenu.addEventListener('click', onClickButtonCloseMenu);
    };
    buttonOpenMenu.addEventListener('click', onClickButtonOpenMenu);
  }
})();
