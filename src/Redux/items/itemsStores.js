import { createStore, combineReducers } from 'redux';
import { itemsReducer, deliveryItemsReducer, archiveItemsReducer, autoFilterReducer } from './reducers';

const allReducers = combineReducers({
    items: itemsReducer,
    deliveryItems: deliveryItemsReducer,
    archiveItems: archiveItemsReducer,
    autoFilter: autoFilterReducer,
})

export const itemsStore = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());