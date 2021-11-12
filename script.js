// Action
const BUY_PHONE = "BUY_PHONE";
const BUY_TABLET = "BUY_TABLET";
const BUY_TV = "BUY_TV";

function buyPhone() {
  return { type: BUY_PHONE };
}

function buyTablet() {
  return { type: BUY_TABLET };
}

function buyTV() {
  return { type: BUY_TV };
}

// Reducer

const initialeStatePhone = { phones: 5, tablets: 10 };
const phoneReducer = (state = initialeStatePhone, action) => {
  switch (action.type) {
    case "BUY_PHONE":
      return { ...state, phones: state.phones - 1 };
      break;
    case "BUY_TABLET":
      return { ...state, tablets: state.tablets - 1 };
      break;
    default:
      return state;
  }
};

const initialeStateTV = { tv: 15 };
const tvReducer = (state = initialeStateTV, action) => {
  switch (action.type) {
    case "BUY_TV":
      return { ...state, tv: state.tv - 1 };
      break;
    default:
      return state;
  }
};


//Redux store

// Lorsqu'il y a plusieurs Reducer on utilise la méthode combineReducers de redux
// Cette méthode va générer le "rootReducer" que l'on va faire passer dans le store
const rootReducer = Redux.combineReducers({
  phone: phoneReducer,
  tv: tvReducer,
});

const store = Redux.createStore(rootReducer);


//VUE
const availablePhones = document.getElementById("number");
const availableTablets = document.getElementById("numberTablet");
const availableTV = document.getElementById("numberTV");

//getState
availablePhones.innerHTML = store.getState().phone.phones;
availableTablets.innerHTML = store.getState().phone.tablets;
availableTV.innerHTML = store.getState().tv.tv;

//dispatch
document.getElementById("buy-phone").addEventListener("click", function () {
  store.dispatch(buyPhone());
});
document.getElementById("buy-tablet").addEventListener("click", function () {
  store.dispatch(buyTablet());
});
document.getElementById("buy-tv").addEventListener("click", function () {
  store.dispatch(buyTV());
});

//subscribe
store.subscribe(() => {
  console.log("Mon nouveau store", store.getState());
  availablePhones.innerHTML = store.getState().phone.phones;
  availableTablets.innerHTML = store.getState().phone.tablets;
  availableTV.innerHTML = store.getState().tv.tv;
});
