const store = require('./app/store');
const cakeActions = require('./features/cake/cakeSlice').cakeActions;
const iceCreamActions =
  require('./features/ice-cream/iceCreamSlice').iceCreamActions;

console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(() =>
  console.log('Update state', store.getState())
);

store.dispatch(cakeActions.order());
store.dispatch(cakeActions.order());
store.dispatch(cakeActions.order());
store.dispatch(cakeActions.restock(3));
store.dispatch(iceCreamActions.order());
store.dispatch(iceCreamActions.order());
store.dispatch(iceCreamActions.order());
store.dispatch(iceCreamActions.restock(3));

unsubscribe();
