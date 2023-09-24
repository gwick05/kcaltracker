import 'core-js/stable';
import * as Model from './model';
import AddNewDayView from './views/addNewDayView.js';
import ProfileView from './views/profileView.js';
import NewProfileView from './views/newProfileView.js';
import InformationView from './views/informationView.js';
import ModifyDayView from './views/modifyDayView.js';
import DayPreviewView from './views/dayPreviewView.js';
import PaginationView from './views/paginationView.js';
import NavigationView from './views/navigationView.js';

////////////////////////////////////RENDERERS/////////////////////////////////////////////////
//Function that renders the preview for each day stored in the state.previousDays
const renderDays = function (curPage) {
  Model.state.pages = Math.ceil(Model.state.previousDays.length / 10);
  DayPreviewView.clear();
  Model.state.previousDays
    .slice((curPage - 1) * 10, curPage * 10)
    .forEach(day => DayPreviewView.renderContent(day));
  paginationViewHandlers();
};
const renderProfile = function () {
  ProfileView.renderContent(Model.state);
  ProfileView.addChangeProfileInfoEventHandler(changeProfileInfoEventHandler);
};

const clearLeftSideContainer = function () {
  DayPreviewView.clear();
  PaginationView.clear();
};
const renderNewProfileViewForm = function () {
  NewProfileView.renderContent();
  NewProfileView.addNewProfileViewHandler(newProfileViewHandler);
  clearLeftSideContainer();
};
//RENDERS THE NEW DAY VIEW FORM
const renderNewDayView = function () {
  AddNewDayView.renderContent();
  AddNewDayView.addNewLineClickEventHandler();
  AddNewDayView.addDeleteIngredientClickEventHandler();
  AddNewDayView.addNewDayFormSubmitHandler(
    newDayFormSubmitEventHandler.bind(undefined, Model.state)
  );
};
//RENDER PREVIOUS DAYS CALORIC INTAKES
const renderPreviousDays = function () {
  if (Model.state.previousDays.length === 0) return DayPreviewView.clear();
  renderDays(Model.state.curPage);
};

//RENDERS EDIT DAY PAGE
const renderEditPage = function (day) {
  ModifyDayView.renderContent(
    Model.state.previousDays.find(
      el => el.information.id === Number(day.dataset.id)
    )
  );
  ModifyDayView.addNewLineClickEventHandler();
  ModifyDayView.addDeleteIngredientClickEventHandler(
    Model.state.previousDays.find(
      el => el.information.id === Number(day.dataset.id)
    )
  );
  ModifyDayView.addNewDayFormSubmitHandler(
    newDayFormSubmitEventHandler.bind(
      undefined,
      Model.state.previousDays.find(
        el => el.information.id === Number(day.dataset.id)
      )
    )
  );
};

//FETCH USER INFORMATION FROM THE LOCAL STORAGE. IF THERE'S NO DATA RETRIEVED IT RENDERS THE NEW PROFILE FORM
const fetchUserInfo = function (onload = true) {
  Model.retrieveLocalStorageData();
  renderPreviousDays();
  if (onload) if (!Model.checkIfEmpty()) return;
  DayPreviewView.clear();
  renderNewProfileViewForm();
};

/////////////////////////////////////// HANDLERS /////////////////////////////////////////////
const paginationViewEventHandler = function (page) {
  Model.state.curPage = page;
  renderDays(Model.state.curPage);
};

const dayPreviewClickEventHandler = function (day) {
  InformationView.renderContent(
    Model.state.previousDays.find(
      el => el.information.id === Number(day.dataset.id)
    )
  );
};

const editButtonClickEventHandler = function (day) {
  renderEditPage(day);
};

const deleteButtonClickEventHandler = function (day) {
  const indexItem = Model.state.previousDays.findIndex(
    el => el.information.id === Number(day.dataset.id)
  );
  Model.state.previousDays.splice(indexItem, 1);
  Model.setLocalStorageData();
  DayPreviewView.clear();
  InformationView.clear();
  renderPreviousDays();
};

//RESETS THE CURRENT PROFILE USER INFORMATION HANDLER
const changeProfileInfoEventHandler = function () {
  fetchUserInfo(false);
};

//
const navigationClickEventHandler = function (btn) {
  if (btn.classList.contains('add-new-day')) newDayBtnEventHandler();
  if (btn.classList.contains('profile')) profileBtnEventHandler();
};

//PROFILE BUTTON HANDLER
const profileBtnEventHandler = function () {
  if (Model.checkIfEmpty()) return;
  renderProfile();
};

// NEW PROFILE INFO /HANDLER/ USED FOR ON LOAD PAGE EVENT AND CHANGE PROFILE INFO
const newProfileViewHandler = async function (form) {
  try {
    NewProfileView.renderSpinner();
    await Model.createNewProfile(Model.getFormData(form));
    NewProfileView.clear();
  } catch (error) {
    clearLeftSideContainer();
    ProfileView.renderError(error);
  }
};

//THE NEW DAY BUTTON CLICK EVENT HANDLER
const newDayBtnEventHandler = function () {
  if (Model.checkIfEmpty()) return;
  renderNewDayView();
};

//THE SUBMIT NEW DAY FORM EVENT HANDLER
const newDayFormSubmitEventHandler = async function (state, e) {
  try {
    AddNewDayView.clear();
    InformationView.renderSpinner();
    await Model.getAPICallsData(state, e);
    if (!state.information.nutritionFacts.calories) return;
    InformationView.renderContent(state);
    Model.backToFirstPage(state);
    renderPreviousDays();
    DayPreviewView.toggleOverlay(state);
  } catch (error) {
    InformationView.renderError(error);
  }
};

//ADD DAY PREVIEW VIEW HANDLERS
const addDayPreviewViewHandlers = function () {
  DayPreviewView.addDayPreviewClickEventHandler(dayPreviewClickEventHandler);
  DayPreviewView.addDeleteButtonClickEventHandler(
    deleteButtonClickEventHandler
  );
  DayPreviewView.addEditButtonClickEventHandler(editButtonClickEventHandler);
};

const paginationViewHandlers = function () {
  PaginationView.renderContent(Model.state);
  PaginationView.addPaginationEventHandler(paginationViewEventHandler);
};
//////////////////////////////////////////////////////////////////////////////////////////////////

//CODE EXECUTED AS SOON AS THE PAGE LOADS
const init = function () {
  fetchUserInfo();
  NavigationView.addNavBtnClickEventListener(navigationClickEventHandler);
  addDayPreviewViewHandlers();
};
init();
