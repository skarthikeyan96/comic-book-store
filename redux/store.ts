import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "../lib/localstorage";
import { cartReducer } from "./cart.slice";

const reducer = {
  cart: cartReducer,
};

const persistedState:any = loadState();


const store = configureStore({
  reducer,
  preloadedState: persistedState
});

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
  });
});

export default store;