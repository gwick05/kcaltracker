import RightSideView from './rightSideView.js';
import icons from 'url:../../images/icons.svg';
class InformationView extends RightSideView {
  _renderEmojis = function (str) {
    let emoji;
    switch (str) {
      case 'Calories from protein':
        emoji = `🥩`;
        break;

      case 'Calories from fat':
        emoji = `🥑`;
        break;

      case 'Calories from carbohydrates':
        emoji = `🍞`;
        break;
    }
    return emoji;
  };
  _renderMarkUp = function (state) {
    const markUp = `
    <div>
    ${
      state.information.nutritionFacts.calories <
      Math.round(state.profileInfo.dailyCaloricData.calorie)
        ? `<div class="day-summary">
        <h1>Calories for the day not met!</h1> <svg class="day-summary-icon">
        <use href="${icons}#icon-x"/>
      </svg>
      </div>`
        : `<div class="day-summary">
        <h1>Calories for the day met!</h1>
      <svg class="day-summary-icon">
        <use href="${icons}#icon-ok"/>
      </svg>
      </div>`
    }
    </div>
    <div class="ingredients-container">
    <h2>Everything eaten on ${state.date}</h2>
      <ul class="ing">
      ${state.information.nutritionFacts.ingredients
        .map(ing => {
          return `<li>${ing.text}</li>`;
        })
        .join('')}
      </ul>
      </div>
      <hr>

      <div>
      <h2>Calories divided by each meal</h2>
    <div class="info-container meals-container">
     <div class="data-container meals-data">
      <ul>
      <li>Breakfast 🥞</li>
      <li>First Snack 🍫</li>
      <li>Lunch 🥗</li>
      <li>Second Snack 🍫</li>
      <li>Dinner 🍽️</li>
      </ul>
    </div>
    
    <div class="chart meals-chart">
      <div class="meals-chart">
        <img src="https://quickchart.io/chart?width=300&height=300&chart=${
          state.information.charts.meals
        }" class="chart" alt="Ingredients chart" />
      </div>
    </div>
  </div>
  </div>
  <hr>

  <div>
  <h2>Macros</h2>

  <div class="macros info-container">
  <div class="chart macros-chart">
  <div class="macros-chart">
  <span><strong>Daily intake of macros in g</strong></span>
    <img src="https://quickchart.io/chart?width=300&height=300&chart=${
      state.information.charts.dayMacros
    }" class="chart" alt="Ingredients chart" />
  </div>
</div>

    <div class="chart macros-chart">
    <div class="macros-chart">
    <span><strong>Recommended macros in g</strong></span>
      <img src="https://quickchart.io/chart?width=300&height=300&chart=${
        state.information.charts.recommendedMacros
      }" class="chart" alt="Ingredients chart" />
    </div>
  </div>
</macros>


  </div>


  <div>
  <h2>Total of calories divided by macros</h2>
  <div class="info-container macros-container">
    <div class="data-container macros-data">
      <ul>${Object.entries(state.information.nutritionFacts.caloriesDivided)
        .filter(el => el[1].label !== 'Energy')
        .map(
          el =>
            `<li>${el[1].label} ${this._renderEmojis(el[1].label)}: ${
              el[1].quantity
            } ${el[1].unit}</li>`
        )
        .join('')}</ul>
    </div>
    
    <div class="chart macros-chart">
      <div class="macros-chart">
        <img src="https://quickchart.io/chart?width=300&height=300&chart=${
          state.information.charts.macros
        }" class="chart" alt="Ingredients chart" />
      </div>
    </div>


  </div>

  
  <hr>


  <div>
  <h2>Nutrients chart</h2
  <div class="info-container nutrients-container">
    <div class="nutrients-chart">
      <img src="https://quickchart.io/chart?width=300&height=300&chart=${
        state.information.charts.nutrients
      }" class="nutrients-chart-img" alt="Nutrients chart" />
  </div>
</div>
</div>
`;
    return markUp;
  };
}
export default new InformationView();
