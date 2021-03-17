export function currencyReducer(state = '$', action) {
    switch (action.type) {
        case "$":
            console.log("dollar")
            return action.payload.value;
        case "₪":
            console.log("shekel")
            return action.payload.value;
        default:
            return state
    }
}

export function currencyShekelReducer(state = 3.1, action) {
    switch (action.type) {
        case "setNewShekel":
            return action.payload.value;
        default:
            return state
    }
}