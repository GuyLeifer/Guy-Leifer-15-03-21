import { atom } from "recoil";

export const itemsState = atom({
    key: "itemsState",
    default: []
});

export const deliveryItemsState = atom({
    key: "deliveryItemsState",
    default: []
});


export const archiveItemsState = atom({
    key: "archiveItemsState",
    default: []
});

export const autoFilterState = atom({
    key: "autoFilterState",
    default: false
});




