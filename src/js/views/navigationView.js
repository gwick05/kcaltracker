class Navigation {
  _parentElement = document.querySelector('.navigation');

  addNavBtnClickEventListener = function (handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.icon-btns');
      if (!btn) return;
      handler(btn);
    });
  };
}

export default new Navigation();
