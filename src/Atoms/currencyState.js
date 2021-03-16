import { atom } from "recoil";

export const currencyState = atom({
	key: "currencyState",
	default: '$'
});

export const currencyShekelState = atom({
	key: "currencyShekelState",
	default: 3.1
});

