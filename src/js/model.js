export const state = {
  information: {
    meals: {
      breakfast: {},
      firstSnack: {},
      lunch: {},
      secondSnack: {},
      dinner: {},
    },
  },
  profileInfo: {},
  previousDays: [],
  curPage: 1,
};

export const createNewProfile = async function (data) {
  const newProfileInfo = data;

  newProfileInfo.goal = getGoal(
    +newProfileInfo.curWeight,
    +newProfileInfo.goalWeight
  );

  await (async function () {
    try {
      newProfileInfo.dailyCaloricData = await calculateCalories(newProfileInfo);
    } catch (error) {
      throw error;
    }
  })();
  updateProfile(newProfileInfo);
  clearLocalStorage();
  setLocalStorageData();
};

export const backToFirstPage = function (state) {
  if (Object.hasOwn(state, 'previousDays')) {
    state.curPage = 1;
  }
};

export const getAPICallsData = async function (state, form) {
  try {
    const meals = getMeals(getFormData(form.target), state);
    for (const meal of Object.entries(meals)) await fetchCalories(meal, state);
    await fetchData(Object.values(meals).flat(), state);
  } catch (error) {
    throw error;
  }
};

//Create the Quickchart chart link based on the information retrieved from the api calls
export const fetchCharts = function (state) {
  const configs = {
    //MEALS CHART CONFIG
    meals: {
      type: 'pie',
      data: {
        labels: ['Breakfast', 'First Snack', 'Lunch', 'Second Snack', 'Dinner'],
        datasets: [
          {
            label: 'Calories',
            data: Object.values(state.information.meals).map(value => value),
            borderColor: 'black',
            borderWidth: 1.5,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: 'black',
            fontSize: 15,
          },
        },
        plugins: {
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold',
              size: 15,
            },
          },
        },
      },
    },

    //MACROS CHART CONFIG
    macros: {
      type: 'doughnut',
      data: {
        labels: ['Protein', 'Fat', 'Carbohydrates'],
        datasets: [
          {
            data: [
              ...Object.entries(
                state.information.nutritionFacts.caloriesDivided
              )
                .filter(el => el[1].label !== 'Energy')
                .map(el => el[1].quantity),
            ],
            borderColor: 'black',
            borderWidth: 1.5,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: 'black',
            fontSize: 15,
          },
        },
        plugins: {
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold',
              size: 15,
            },
          },
          doughnutlabel: {
            labels: [
              {
                text: `${Object.entries(
                  state.information.nutritionFacts.caloriesDivided
                )
                  .filter(el => el[1].label !== 'Energy')
                  .map(el => el[1].quantity)
                  .reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                  )}`,
                font: { size: 20 },
              },
              { text: 'Total Calories' },
            ],
          },
        },
      },
    },

    recommendedMacros: {
      type: 'pie',
      data: {
        labels: ['Protein', 'Fat', 'Carbohydrates'],
        datasets: [
          {
            label: 'Recommended macros',
            data: Object.values(
              state.profileInfo.dailyCaloricData.balanced
            ).map(value => Math.round(value)),
            borderColor: 'black',
            borderWidth: 1.5,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: 'black',
            fontSize: 15,
          },
        },
        plugins: {
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold',
              size: 15,
            },
          },
        },
      },
    },

    dayMacros: {
      type: 'pie',
      data: {
        labels: ['Protein', 'Fat', 'Carbohydrates'],
        datasets: [
          {
            label: 'Daily macros',
            data: [
              Math.round(
                state.information.nutritionFacts.totalNutrients.PROCNT.quantity
              ),
              Math.round(
                state.information.nutritionFacts.totalNutrients.FAT.quantity
              ),
              Math.round(
                state.information.nutritionFacts.totalNutrients.CHOCDF.quantity
              ),
            ],
            borderColor: 'black',
            borderWidth: 1.5,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: 'black',
            fontSize: 15,
          },
        },
        plugins: {
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold',
              size: 15,
            },
          },
        },
      },
    },

    nutrients: {
      type: 'bar',
      data: {
        labels: Object.entries(
          Object.values(state.information.nutritionFacts.totalDaily)
        ).map(el => el[1].label),
        datasets: [
          {
            label: 'Nutrients %',
            data: Object.entries(
              Object.values(state.information.nutritionFacts.totalDaily)
            ).map(el => el[1].quantity),
            backgroundColor: 'Green',
            fontColor: 'black',
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: 'black',
            fontSize: 15,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: 'Black',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: 'Black',
              },
            },
          ],
        },
      },
    },
  };

  state.information.charts = {
    meals: `${JSON.stringify(configs.meals).replaceAll(`"`, `'`)}`,
    macros: `${JSON.stringify(configs.macros).replaceAll(`"`, `'`)}`,
    recommendedMacros: `${JSON.stringify(configs.recommendedMacros).replaceAll(
      `"`,
      `'`
    )}`,
    nutrients: `${JSON.stringify(configs.nutrients).replaceAll(`"`, `'`)}`,
    dayMacros: `${JSON.stringify(configs.dayMacros).replaceAll(`"`, `'`)}`,
  };
};

//Divides ingredients by each meal storing them in an object, adding it to the state and returning it
export const getMeals = function (data, state) {
  const meals = {
    breakfast: [],
    firstSnack: [],
    lunch: [],
    secondSnack: [],
    dinner: [],
  };

  Object.entries(data).forEach(ing => {
    if (ing[0].startsWith('break')) meals.breakfast.push(ing[1]);
    if (ing[0].startsWith('first')) meals.firstSnack.push(ing[1]);
    if (ing[0].startsWith('lunch')) meals.lunch.push(ing[1]);
    if (ing[0].startsWith('second')) meals.secondSnack.push(ing[1]);
    if (ing[0].startsWith('dinner')) meals.dinner.push(ing[1]);
  });
  state.information.ingredientsByEachMeal = meals;
  return meals;
};

//Clears the LocalStorage
export const clearLocalStorage = function () {
  localStorage.clear();
};

//Function that takes an object as an argument and returns it without empty values
function removeEmptyValues(object) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];
      if (value === null || value === undefined || value === '') {
        delete object[key];
      }
    }
  }
}

//Function that checks if the profile information object in the state is empty
export const checkIfEmpty = function () {
  return Object.keys(state.profileInfo).length === 0;
};

//Function that makes an api call that returns the calories necessary to meet a certain goal and also the recommended macros
export const calculateCalories = async function (profileInfo) {
  const url = `https://fitness-calculator.p.rapidapi.com/macrocalculator?age=${profileInfo.age}&gender=${profileInfo.sex}&height=${profileInfo.height}&weight=${profileInfo.curWeight}&activitylevel=${profileInfo.activityLevel}&goal=${profileInfo.goal}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0bbf485a4cmsh2a66bb566444abcp18572cjsn7bb8b07cfccf',
      'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      state.profileInfo = {};
      throw new Error(
        'Could not fetch the amout of calories needed for you to reach your weight goal! Try filling the form again following the logging pattern!'
      );
    }
    const result = await response.json();

    const {
      data: { calorie, balanced },
    } = result;

    return { calorie, balanced };
  } catch (error) {
    throw error;
  }
};

//Function that returns the goal of the user after fetching his information with the info form
export const getGoal = function (curWeight, goalWeight) {
  if (curWeight > goalWeight) return 'weightlose';
  if (curWeight < goalWeight) return 'weightgain';
  if (curWeight === goalWeight) return 'maintain';
};

//Function that returns the current date
const getDate = function () {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const date = new Date();
  return `${
    days[date.getDay()]
  } ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

//Function that updates the profile information with some other object of info
export const updateProfile = function (info) {
  state.profileInfo = info;
  state.previousDays = [];
};

//Function that stores the data of the API call to a certain state passed in as an argument and in the end sets the local storage
const storeData = function (data, state) {
  state.information.nutritionFacts = createObject(data);
  fetchCharts(state);
  state.information.id = Date.now();
  state.date = getDate();

  if (Object.hasOwn(state, 'previousDays')) {
    state.previousDays.unshift({
      profileInfo: { ...state.profileInfo },
      information: { ...state.information },
      date: state.date,
    });
  }

  setLocalStorageData();
};

//Function that sets the local storage
export const setLocalStorageData = function () {
  localStorage.setItem(
    'data',
    JSON.stringify({
      previousDays: [...state.previousDays],
      profileInfo: { ...state.profileInfo },
    })
  );
};

//Function that retrieves the local storage data
export const retrieveLocalStorageData = function () {
  const data = JSON.parse(localStorage.getItem('data'));
  if (!data) return;
  state.profileInfo = data.profileInfo;
  state.previousDays = data.previousDays;
  state.pages = Math.ceil(data.previousDays.length / 10);
};

//Function that retrieves the data from a form
export const getFormData = function (form) {
  const myFormData = new FormData(form);
  const formDataObj = {};
  myFormData.forEach((value, key) => (formDataObj[key] = value));

  removeEmptyValues(formDataObj);
  return formDataObj;
};

//Function that returns a new based on another one // Used to create the information from the API object in the state
export const createObject = function (obj) {
  return {
    calories: obj.calories,
    totalDaily: obj.totalDaily,
    totalNutrients: obj.totalNutrients,
    caloriesDivided: obj.totalNutrientsKCal,
    ingredients: obj.ingredients,
  };
};

//Function that makes an API call to Edamam to retrieve the amount of calories in a certain meal, then it sets the result in the state.information.meals
export const fetchCalories = async function (meal, state) {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-details?app_id=b54934e7&app_key=f5539aa37375c536ea9159c51a4f92e7&beta=true&force=true`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingr: meal[1],
        }),
      }
    );
    const data = await response.json();
    state.information.meals[meal[0]] = data.calories;
  } catch (err) {
    throw err;
  }
};

//Function that makes an API call to Edamam to retrieve the amount of calories of everything eaten during a certain day, basically takes an array of ingredients and calculates the total amount of calories. Then stores the data in the state in state.information using the storeData function
export const fetchData = async function (ingredients, state) {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-details?app_id=b54934e7&app_key=f5539aa37375c536ea9159c51a4f92e7&beta=true&force=true`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingr: ingredients,
        }),
      }
    );
    if (!response.ok)
      throw new Error(
        'Could not determine the amount of calories consumed! Try following the ingredient logging pattern and be more specific with the name/quantity and unit of the ingredients'
      );
    const data = await response.json();
    storeData(data, state);
  } catch (err) {
    throw err;
  }
};
