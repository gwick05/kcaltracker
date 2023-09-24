import LeftSideView from './leftSideView.js';
import icons from 'url:../../images/icons.svg';
class DayPreviewView extends LeftSideView {
  renderContent = function (state) {
    this._markUp = this._renderMarkUp(state);
    this._parentElement.insertAdjacentHTML('beforeend', this._markUp);
  };

  _getIcon = function (state) {
    let icon;
    switch (state.profileInfo.goal) {
      case 'weightlose':
        icon =
          state.information.nutritionFacts.calories <
          state.profileInfo.dailyCaloricData.calorie
            ? `${icons}#icon-ok`
            : `${icons}#icon-x`;
        break;
      case 'weightgain':
        icon =
          state.information.nutritionFacts.calories <
          state.profileInfo.dailyCaloricData.calorie
            ? `${icons}#icon-x`
            : `${icons}#icon-ok`;
        break;
      case 'maintain':
        icon =
          state.information.nutritionFacts.calories ===
          state.profileInfo.dailyCaloricData.calorie
            ? `${icons}#icon-ok`
            : `${icons}#icon-x`;
    }
    return icon;
  };
  _renderMarkUp = function (state) {
    return `<li>
          <div class="day-container" data-id="${state.information.id}">
            <time class="date">${state.date}</time>
          <div class="calories">
            <p class="total-calories">Calories:${
              state.information.nutritionFacts.calories
            }</p>
            
            <svg class="day-preview-icon">
            <use href="${this._getIcon(state)}"/>
          </svg>
            
            <div class="calories-to-meet">
                        <p class="total-calories">${Math.round(
                          state.profileInfo.dailyCaloricData.calorie
                        )}</p>
                      </div>
          </div>
          <div class="day-container-buttons">
          <button class="edit-btn icon-btns" type="button">
          <svg class="day-preview-icon">
          <use href="${icons}#icon-edit"/>
        </svg>
          </button>
          <button class="delete-btn icon-btns" type="button">
          <svg class="day-preview-icon">
          <use href="${icons}#icon-delete"/>
        </svg>
          </button>
          </div>
        </div>
      </li>
      `;
  };

  addDayPreviewClickEventHandler = function (handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const day = e.target.closest('.day-container');
      if (!day) return;
      const elements = [...document.querySelectorAll('.day-container')];
      elements.forEach(el => el.classList.remove('overlay'));
      day.classList.toggle('overlay');
      handler(day);
    });
  };

  addDeleteButtonClickEventHandler = function (handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.delete-btn');
      const day = e.target.closest('.day-container');
      if (!btn) return;
      handler(day);
    });
  };

  addEditButtonClickEventHandler = function (handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.edit-btn');
      const day = e.target.closest('.day-container');
      if (!btn) return;
      handler(day);
    });
  };

  toggleOverlay(state) {
    const elements = [...document.querySelectorAll('.day-container')];
    const element = elements.find(
      el => state.information.id === Number(el.dataset.id)
    );
    element.classList.toggle('overlay');
  }
}
export default new DayPreviewView();
