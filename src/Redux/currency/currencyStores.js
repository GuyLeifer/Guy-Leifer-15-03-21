import { createStore, combineReducers } from 'redux';
import { currencyReducer, currencyShekelReducer } from './reducers';

const allReducers = combineReducers({
    currency: currencyReducer,
    currencyShekel: currencyShekelReducer
})

export const currencyStore = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
