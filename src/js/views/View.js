import icons from 'url:../../images/icons.svg';
export default class View {
  renderSpinner = function () {
    this.clear();
    this._markUp = `<div class ="spinner"> <div class="lds-roller">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  </div>`;
    this._parentElement.insertAdjacentHTML('afterbegin', this._markUp);
  };
  renderError = function (err) {
    this.clear();
    this._parentElement.insertAdjacentHTML(
      'afterbegin',
      `<h1>${err}</h1>
    <button class="refresh" type="button">
    <svg class="refresh-icon icon-btns">
        <use href="${icons}#icon-refresh"/>
      </svg>
    </button> `
    );
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.refresh');
      if (!btn) return;
      location.reload();
    });
  };
  renderContent = function (state) {
    this._markUp = this._renderMarkUp(state);
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', this._markUp);
  };

  clear = function () {
    this._parentElement.innerHTML = '';
  };
}
