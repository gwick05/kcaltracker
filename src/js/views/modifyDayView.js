import DayView from './dayView.js';
import icons from 'url:../../images/icons.svg';
class ModifyDayView extends DayView {
  _renderMarkUp = function (state) {
    const markUp = `
    <form class="ingredients--form">
    <h1>Modify ${state.date}</h1>
    <div class="form-section">
    <div class="breakfast--section ingredients--section" data-rows="${
      state.information.ingredientsByEachMeal.breakfast.length
    }">
    <div class="ingredients">
      <h3>BREAKFAST 🥞</h3>
      ${state.information.ingredientsByEachMeal.breakfast
        .map((ing, i) => {
          return `<div class="breakfast row" data-row="${i + 1}">
          <div>
          <label for="ing">Ingredient</label>
          <input
            id="ing"
            name="breakfastIng${i + 1}"
            type="text"
            value="${ing}"
          />
          </div>
          <button class="btn-minus" type="button">
          <svg class="icon-btns icon-minus">
           <use href="${icons}#icon-minus"/>
          </svg>
         </button>
        </div>`;
        })
        .join('')}
    </div>  
      <div class="new-line">
       <button class="new-line-btn icon-btns" type="button">
        <svg class="new-line-icon">
         <use href="${icons}#icon-add-line"/>
        </svg>
        <span class="add-new-line-span"><strong>Add new line</strong></span>
       </button>
      </div>
    </div> 





    <div class="first--snack--section ingredients--section" data-rows="${
      state.information.ingredientsByEachMeal.firstSnack.length
    }">
    <div class="ingredients">
                <h3>FIRST SNACK 🍫</h3>
                ${state.information.ingredientsByEachMeal.firstSnack
                  .map((ing, i) => {
                    return `<div class="firstSnack row">
                <div>
                      <label for="ing">Ingredient</label>
                      <input id="ing" name="firstSnackIng${i + 1}" type="text" 
                      value="${ing}" />
                      </div>
                      <button class="btn-minus" type="button">
                      <svg class="icon-btns icon-minus">
                       <use href="${icons}#icon-minus"/>
                      </svg>
                     </button>
                    </div>
                  `;
                  })
                  .join('')}
                </div>
                <div class="new-line">
                <button class="new-line-btn icon-btns" type="button">
                 <svg class="new-line-icon">
                  <use href="${icons}#icon-add-line"/>
                 </svg>
                 <span class="add-new-line-span"><strong>Add new line</strong></span>
                </button>
               </div>
              </div>
            </div>
  



            <div class="form-section">
              <div class="lunch--section ingredients--section" data-rows="${
                state.information.ingredientsByEachMeal.lunch.length
              }">
              <div class="ingredients">
                <h3>LUNCH 🥗</h3>
                ${state.information.ingredientsByEachMeal.lunch
                  .map((ing, i) => {
                    return `<div class="lunch row">
                    <div>
                    <label for="ing">Ingredient</label>
                    <input id="ing" name="lunchIng${
                      i + 1
                    }" type="text" value="${ing}" />

                    </div>
                    <button class="btn-minus" type="button">
                    <svg class="icon-btns icon-minus">
                     <use href="${icons}#icon-minus"/>
                    </svg>
                   </button>
                  </div>`;
                  })
                  .join('')}
                </div>  
                <div class="new-line">
                <button class="new-line-btn icon-btns" type="button">
                 <svg class="new-line-icon">
                  <use href="${icons}#icon-add-line"/>
                 </svg>
                 <span class="add-new-line-span"><strong>Add new line</strong></span>
                </button>
               </div>
              </div>
  

              <div class="second--snack--section ingredients--section" data-rows="${
                state.information.ingredientsByEachMeal.secondSnack.length
              }">
              <div class="ingredients">
                <h3>SECOND SNACK 🍫</h3>
                ${state.information.ingredientsByEachMeal.secondSnack
                  .map((ing, i) => {
                    return `<div class="secondSnack row">
                    <div>
                    <label for="ing">Ingredient</label>
                    <input id="ing" name="secondSnackIng${
                      i + 1
                    }" type="text" value="${ing}" />
                    </div>
                    <button class="btn-minus" type="button">
                    <svg class="icon-btns icon-minus">
                     <use href="${icons}#icon-minus"/>
                    </svg>
                   </button>
                  </div>`;
                  })
                  .join('')}

                </div>              
                <div class="new-line">
                <button class="new-line-btn icon-btns" type="button">
                 <svg class="new-line-icon">
                  <use href="${icons}#icon-add-line"/>
                 </svg>
                 <span class="add-new-line-span"><strong>Add new line</strong></span>
                </button>
               </div>
              </div>
              </div>
  


              <div class="dinner--section ingredients--section" data-rows="${
                state.information.ingredientsByEachMeal.dinner.length
              }">
              <div class="ingredients">
                <h3>DINNER 🍽️</h3>
                ${state.information.ingredientsByEachMeal.dinner
                  .map((ing, i) => {
                    return `<div class="dinner row">
                    <div>
                      <label for="ing">Ingredient</label>
                      <input id="ing" name="dinnerIng${
                        i + 1
                      }" type="text" value="${ing}" />
                      </div>
                      <button class="btn-minus" type="button">
                      <svg class="icon-btns icon-minus">
                       <use href="${icons}#icon-minus"/>
                      </svg>
                     </button>
                    </div>`;
                  })
                  .join('')}

                </div>        
                <div class="new-line">
                <button class="new-line-btn icon-btns" type="button">
                 <svg class="new-line-icon">
                  <use href="${icons}#icon-add-line"/>
                 </svg>
                 <span class="add-new-line-span"><strong>Add new line</strong></span>
                </button>
               </div>
              </div>
               <button class="btn" type="submit">
                <svg class="form-submit-icon icon-btns">
                 <use href="${icons}#icon-send"/>
                </svg>
               </button>
            </form>

`;
    return markUp;
  };
}
export default new ModifyDayView();
