import RightSideView from './rightSideView.js';
import icons from 'url:../../images/icons.svg';
class ProfileView extends RightSideView {
  _renderActivityLevel = function (level) {
    let activityLevel;
    switch (level) {
      case '2':
        activityLevel = `Sedentary: little or no exercise`;
        break;

      case '3':
        activityLevel = `Exercise 1-3 times/week`;
        break;

      case '4':
        activityLevel = `Exercise 4-5 times/week`;
        break;

      case '5':
        activityLevel = `Daily exercise or intense exercise 3-4 times/week`;
        break;

      case '6':
        activityLevel = `Intense exercise 6-7 times/week`;
        break;

      case '7':
        activityLevel = `Very intense exercise daily, or physical job`;
        break;
    }
    return activityLevel;
  };
  _renderMarkUp = function (state) {
    return `<div class="profile-info">
  <h1>PROFILE</h1>
  <ul class="informations">
    <li>GOAL WEIGHT:${state.profileInfo.goalWeight}</li>
    <li>CURRENT WEIGHT:${state.profileInfo.curWeight}</li>
    <li>HEIGHT:${state.profileInfo.height}</li>
    <li>SEX:${state.profileInfo.sex}</li>
    <li>ACTIVITY LEVEL:${this._renderActivityLevel(
      state.profileInfo.activityLevel
    )}</li>
    <li>CALORIC GOAL:${Math.round(
      state.profileInfo.dailyCaloricData.calorie
    )}</li>
  </ul>
  <button class="btn change" type="submit">
  <svg class="change-profile-icon icon-btns">
   <use href="${icons}#icon-edit"/>
  </svg>
 </button>
</div>`;
  };

  addChangeProfileInfoEventHandler = function (handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.change');
      if (!btn) return;
      handler();
    });
  };
}
export default new ProfileView();
