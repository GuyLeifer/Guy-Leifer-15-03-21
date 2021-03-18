import { createStore, combineReducers } from 'redux';
import { itemsReducer, deliveryItemsReducer, archiveItemsReducer, autoFilterReducer } from './items/reducers';
import { currencyReducer, currencyShekelReducer } from './currency/reducers';

const allReducers = combineReducers({
    currency: currencyReducer,
    currencyShekel: currencyShekelReducer,
    items: itemsReducer,
    deliveryItems: deliveryItemsReducer,
    archiveItems: archiveItemsReducer,
    autoFilter: autoFilterReducer,
})

const store = createStore(allReducers);
export default store;