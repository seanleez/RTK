const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTORED = 'CAKE_RESTORED';
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED';
const ICE_CREAM_RESTORED = 'ICE_CREAM_RESTORED';

function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restoreCake(quantity) {
  return {
    type: CAKE_RESTORED,
    payload: quantity,
  };
}
function orderIceCream() {
  return {
    type: ICE_CREAM_ORDERED,
    payload: 1,
  };
}

function restoreIceCream(quantity) {
  return {
    type: ICE_CREAM_RESTORED,
    payload: quantity,
  };
}

const cakeInitState = {
  numOfCakes: 10,
};
const iceCreamInitState = {
  numOfIceCream: 10,
};

const cakeReducer = (state = cakeInitState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTORED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };

    default:
      return state;
  }
};

const iceCreamReducer = (state = iceCreamInitState, action) => {
  switch (action.type) {
    case ICE_CREAM_ORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };
    case ICE_CREAM_RESTORED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream + action.payload,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(() => {});

const actions = bindActionCreators(
  { orderCake, restoreCake, orderIceCream, restoreIceCream },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restoreCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restoreIceCream(3);

unsubscribe();
