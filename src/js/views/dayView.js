import RightSideView from './rightSideView.js';
import icons from 'url:../../images/icons.svg';
export default class DayView extends RightSideView {
  newLineClickEventHandler = function (e) {
    const btn = e.target.closest('.new-line-btn');
    if (!btn) return;
    const section = btn.closest('.ingredients--section');
    const rows = Number(section.dataset.rows);

    section
      .querySelector('.ingredients')
      .insertAdjacentHTML(
        'beforeend',
        this._renderNewLineMarkup(section.classList[0], rows)
      );
    section.dataset.rows = rows + 1;
  };

  _renderMarkUp = function (_) {
    const markUp = `<form class="ingredients--form">
          <h1>Write everything you ate today! 😊</h1>
          <div class="form-section">
          <div class="breakfast--section ingredients--section" data-rows="3">
          <div class="ingredients">
            <h3>BREAKFAST 🥞</h3>
            <div class="breakfast row">
            <div>
              <label for="ing">Ingredient</label>
              <input id="ing" name="breakfastIng1" type="text" placeholder="e.g: 200g pasta" />
              </div>
              <button class="btn-minus" type="button">
              <svg class="icon-btns icon-minus">
               <use href="${icons}#icon-minus"/>
              </svg>
             </button>
            </div>

            <div class="breakfast row">
            <div>
              <label for="ing">Ingredient</label>
              <input id="ing" name="breakfastIng2" type="text" placeholder="e.g: 200g pasta" />
              </div>
              <button class="btn-minus" type="button">
              <svg class="icon-btns icon-minus">
               <use href="${icons}#icon-minus"/>
              </svg>
             </button>
            </div>

            <div class="breakfast row">
            <div>
              <label for="ing">Ingredient</label>
              <input id="ing" name="breakfastIng3" type="text" placeholder="e.g: 200g pasta" />
              </div>

              <button class="btn-minus" type="button">
              <svg class="icon-btns icon-minus">
               <use href="${icons}#icon-minus"/>
              </svg>
             </button>
            </div>
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
      
      
      
      
      
          <div class="first--snack--section ingredients--section" data-rows="3">
          <div class="ingredients">
                      <h3>FIRST SNACK 🍫</h3>
                      <div class="first--snack row">
                      <div>
                        <label for="ing">Ingredient</label>
                        <input id="ing" name="firstSnackIng1" type="text" placeholder="e.g: 200g pasta" />
                        </div>
                        <button class="btn-minus" type="button">
                        <svg class="icon-btns icon-minus">
                         <use href="${icons}#icon-minus"/>
                        </svg>
                       </button>
                      </div>
                      <div class="first--snack row">
                      <div>
                        <label for="ing">Ingredient</label>
                        <input id="ing" name="firstSnackIng2" type="text"placeholder="e.g: 200g pasta" />
                        </div>
                        <button class="btn-minus" type="button">
                        <svg class="icon-btns icon-minus">
                         <use href="${icons}#icon-minus"/>
                        </svg>
                       </button>
                      </div>
                      <div class="first--snack row">
                      <div>
                        <label for="ing">Ingredient</label>
                        <input id="ing" name="firstSnackIng3" type="text"placeholder="e.g: 200g pasta" />
                        </div>
                        <button class="btn-minus" type="button">
                        <svg class="icon-btns icon-minus">
                         <use href="${icons}#icon-minus"/>
                        </svg>
                       </button>
                      </div>
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
                    <div class="lunch--section ingredients--section" data-rows="3">
                    <div class="ingredients">
                      <h3>LUNCH 🥗</h3>
                      <div class="lunch row">
                      <div>
                        <label for="ing">Ingredient</label>
                        <input id="ing" name="lunchIng1" type="text"placeholder="e.g: 200g pasta" />
                        </div>
                        <button class="btn-minus" type="button">
                        <svg class="icon-btns icon-minus">
                         <use href="${icons}#icon-minus"/>
                        </svg>
                       </button>
                      </div>
                      <div class="lunch row">
                      <div>
                        <label for="ing">Ingredient</label>
                        <input id="ing" name="lunchIng2" type="text"placeholder="e.g: 200g pasta" />
                        </div>
                        <button class="btn-minus" type="button">
                        <svg class="icon-btns icon-minus">
                         <use href="${icons}#icon-minus"/>
                        </svg>
                       </button>
                      </div>
                      <div class="lunch row">
                      <div>
                        <label for="ing">Ingredient</label>
                        <input id="ing" name="lunchIng3" type="text"placeholder="e.g: 200g pasta" />
                        </div>
                        <button class="btn-minus" type="button">
                        <svg class="icon-btns icon-minus">
                         <use href="${icons}#icon-minus"/>
                        </svg>
                       </button>
                      </div>     
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
        
      
                    <div class="second--snack--section ingredients--section" data-rows="3">
                    <div class="ingredients">
                      <h3>SECOND SNACK 🍫</h3>
                      <div class="second--snack row">
                      <div>
                        <label for="ing">Ingredient</label>
                        <input id="ing" name="secondSnackIng1" type="text"placeholder="e.g: 200g pasta" />
                        </div>
                        <button class="btn-minus" type="button">
                        <svg class="icon-btns icon-minus">
                         <use href="${icons}#icon-minus"/>
                        </svg>
                       </button>
                      </div>
                      <div class="second--snack row">
                      <div>
                        <label for="ing">Ingredient</label>
                        <input id="ing" name="secondSnackIng2" type="text"placeholder="e.g: 200g pasta" />
                        </div>
                        <button class="btn-minus" type="button">
                        <svg class="icon-btns icon-minus">
                         <use href="${icons}#icon-minus"/>
                        </svg>
                       </button>
                      </div>
                      <div class="second--snack row">
                      <div>
                        <label for="ing">Ingredient</label>
                        <input id="ing" name="secondSnackIng3" type="text"placeholder="e.g: 200g pasta" />
                        </div>
                        <button class="btn-minus" type="button">
                        <svg class="icon-btns icon-minus">
                         <use href="${icons}#icon-minus"/>
                        </svg>
                       </button>
                      </div>   
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
        
      
      
                    <div class="dinner--section ingredients--section" data-rows="3">
                    <div class="ingredients">
                      <h3>DINNER 🍽️</h3>
                      <div class="dinner row">
                      <div>
                        <label for="ing">Ingredient</label>
                        <input id="ing" name="dinnerIng1" type="text"placeholder="e.g: 200g pasta" />
                        </div>
                        <button class="btn-minus" type="button">
                        <svg class="icon-btns icon-minus">
                         <use href="${icons}#icon-minus"/>
                        </svg>
                       </button>
                      </div>
                      <div class="dinner row">
                      <div>
                        <label for="ing">Ingredient</label>
                        <input id="ing" name="dinnerIng2" type="text"placeholder="e.g: 200g pasta" />
                        </div>
                        <button class="btn-minus" type="button">
                        <svg class="icon-btns icon-minus">
                         <use href="${icons}#icon-minus"/>
                        </svg>
                       </button>
                      </div>
                      <div class="dinner row">
                      <div>
                        <label for="ing">Ingredient</label>
                        <input id="ing" name="dinnerIng3" type="text"placeholder="e.g: 200g pasta" />
                        </div>
                        <button class="btn-minus" type="button">
                        <svg class="icon-btns icon-minus">
                         <use href="${icons}#icon-minus"/>
                        </svg>
                       </button>
                      </div>          
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
                  </form>`;
    return markUp;
  };

  _renderNewLineMarkup = function (meal, rows) {
    let markUp;
    switch (meal) {
      case 'breakfast--section':
        markUp = `<div class="breakfast row">
        <div>
              <label for="ing">Ingredient</label>
              <input id="ing" name="breakfastIng${
                rows + 1
              }" type="text" placeholder="e.g: 200g pasta" />
              </div>
              <button class="btn-minus" type="button">
              <svg class="icon-btns icon-minus">
               <use href="${icons}#icon-minus"/>
              </svg>
             </button>
            </div>`;
        break;

      case 'first--snack--section':
        markUp = `<div class="first--snack row">
        <div>
              <label for="ing">Ingredient</label>
              <input id="ing" name="firstSnackIng${
                rows + 1
              }" type="text"  placeholder="e.g: 200g pasta"/>
              </div>
              <button class="btn-minus" type="button">
              <svg class="icon-btns icon-minus">
               <use href="${icons}#icon-minus"/>
              </svg>
             </button>
            </div>`;
        break;

      case 'lunch--section':
        markUp = `<div class="lunch row">
        <div>
              <label for="ing">Ingredient</label>
              <input id="ing" name="lunchIng${
                rows + 1
              }" type="text" placeholder="e.g: 200g pasta" />
              </div>
              <button class="btn-minus" type="button">
              <svg class="icon-btns icon-minus">
               <use href="${icons}#icon-minus"/>
              </svg>
             </button>
            </div>`;
        break;

      case 'second--snack--section':
        markUp = `<div class="second--snack row">
        <div>
              <label for="ing">Ingredient</label>
              <input id="ing" name="secondSnackIng${
                rows + 1
              }" type="text" placeholder="e.g: 200g pasta" />
              </div>
              <button class="btn-minus" type="button">
              <svg class="icon-btns icon-minus">
               <use href="${icons}#icon-minus"/>
              </svg>
             </button>
            </div>`;
        break;

      case 'dinner--section':
        markUp = `<div class="dinner row">
        <div>
              <label for="ing">Ingredient</label>
              <input id="ing" name="dinnerIng${
                rows + 1
              }" type="text" placeholder="e.g: 200g pasta" />
              </div>
              <button class="btn-minus" type="button">
              <svg class="icon-btns icon-minus">
               <use href="${icons}#icon-minus"/>
              </svg>
             </button>
            </div>`;
        break;
    }
    return markUp;
  };

  addNewLineClickEventHandler = function () {
    document
      .querySelector('.ingredients--form')
      .addEventListener('click', this.newLineClickEventHandler.bind(this));
  };

  addNewDayFormSubmitHandler = function (handler) {
    document
      .querySelector('.ingredients--form')
      .addEventListener('submit', function (e) {
        e.preventDefault();
        handler(e);
      });
  };

  addDeleteIngredientClickEventHandler = function () {
    document
      .querySelector('.ingredients--form')
      .addEventListener('click', function (e) {
        const btn = e.target.closest('.btn-minus');
        if (!btn) return;
        btn.parentElement.remove();
      });
  };
}
