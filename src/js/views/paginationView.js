import LeftSideView from './leftSideView.js';
import icons from 'url:../../images/icons.svg';
export default new (class PaginationView extends LeftSideView {
  _parentElement = document.querySelector('.pagination');

  addPaginationEventHandler = function (handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.inline-btn');
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  };
  renderContent = function (state) {
    this._markUp = this._renderMarkUp(state);
    this.clear();
    this._parentElement.insertAdjacentHTML('beforeend', this._markUp);
  };

  _renderMarkUp(state) {
    // Page 1, and there are other pages
    if (state.curPage === 1 && state.pages > 1) {
      //DISPLAY THE NEXT PAGE BUTTON
      return `
        <div class="pagination">
        <div></div>
        <span><strong>Page ${state.curPage}</strong></span>
        <button class="inline-btn next-btn icon-btns" type="button" data-goto="${
          state.curPage + 1
        }">
        <svg class="pagination-icon">
        <use href="${icons}#icon-next"/>
      </svg>
        </button>
      </div>
        `;
    }

    // Last page
    //DISPLAY PREVIOUS PAGE BUTTON
    if (state.curPage === state.pages && state.pages > 1) {
      return `
        <div class="pagination">
        <button class="inline-btn previous-btn icon-btns" type="button" data-goto="${
          state.curPage - 1
        }">
        <svg class="pagination-icon">
        <use href="${icons}#icon-previous"/>
      </svg>
        </button>
        <span><strong>Page ${state.curPage}</strong></span>
        <div></div>
      </div>
        `;
    }

    // DISPLAY BOTH BUTTONS
    if (state.curPage < state.pages) {
      return `
        <div class="pagination">
        <button class="inline-btn previous-btn icon-btns" type="button" data-goto="${
          state.curPage - 1
        }">
        <svg class="pagination-icon">
        <use href="${icons}#icon-previous"/>
      </svg>
        </button>
        <span><strong>Page ${state.curPage}</strong></span>
        <button class="inline-btn next-btn icon-btns" type="button" data-goto="${
          state.curPage + 1
        }">
        <svg class="pagination-icon">
        <use href="${icons}#icon-next"/>
      </svg>
        </button>
      </div>
        `;
    }

    // Page 1, and there are NO other pages
    return '';
  }
})();
