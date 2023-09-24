import RightSideView from './rightSideView.js';
import icons from 'url:../../images/icons.svg';
class NewProfileView extends RightSideView {
  _renderMarkUp = function (_) {
    return `<form class="change-profile">
    <div>
    <label for="info">AGE</label>
    <input id="info" name="age" type="text" placeholder="e.g: 18" />
  </div>
    <div>
      <label for="info">GOAL WEIGHT</label>
      <input id="info" name="goalWeight" type="text" placeholder="goal weight in kgs e.g: 90" />
    </div>
    <div>
      <label for="info">CURRENT WEIGHT</label>
      <input id="info" name="curWeight" type="text" placeholder="current weight in kgs e.g: 70"/>  
    </div>
    <div>
      <label for="info">HEIGHT</label>
      <input id="info" name="height" type="text" placeholder="height in cms eg: 182" />
    </div>
    <div class="dropdown">
      <label for="info">SEX</label>
      <select class="sex" name="sex">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div class="dropdown">
      <label for="info">ACTIVITY LEVELS</label>
      <select class="activity-levels" name="activityLevel">
        <option value="2">Sedentary: little or no exercise</option>
        <option value="3">
        Exercise 1-3 times/week
        </option>
        <option value="4">
        Exercise 4-5 times/week
        </option>
        <option value="5">
        Daily exercise or intense exercise 3-4 times/week
        </option>
        <option value="6">
        Intense exercise 6-7 times/week
        </option>
        <option value="7">
        Very intense exercise daily, or physical job
        </option>
      </select>
    </div>
    <button class="btn" type="submit">
    <svg class="form-submit-icon icon-btns">
     <use href="${icons}#icon-send"/>
    </svg>
   </button>
  </form>`;
  };
  addNewProfileViewHandler(handler) {
    document
      .querySelector('.change-profile')
      .addEventListener('submit', function (e) {
        e.preventDefault();
        handler(e.target);
      });
  }
}
export default new NewProfileView();
