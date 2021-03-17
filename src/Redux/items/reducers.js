export function itemsReducer(state = [], action) {
    switch (action.type) {
        case "setItems":
            return action.payload.value;
        default:
            return state
    }
}

export function deliveryItemsReducer(state = [], action) {
    switch (action.type) {
        case "setDeliveryItems":
            return action.payload.value;
        default:
            return state
    }
}

export function archiveItemsReducer(state = [], action) {
    switch (action.type) {
        case "setArchiveItems":
            return action.payload.value;
        default:
            return state
    }
}

export function autoFilterReducer(state = false, action) {
    switch (action.type) {
        case "setAutoFilter":
            return !state;
        default:
            return state
    }
}