import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";
import { auth } from "@/firebase/config";

const appReducer = combineReducers({
    cart: cartSlice,
    auth: authSlice
});

const rootReducer = (state, action) => {
    if(action.type === 'GLOBAL_RESET') {
        state = undefined;
    }

    return appReducer(state, action);

};

export const store = configureStore({
    reducer: rootReducer
});