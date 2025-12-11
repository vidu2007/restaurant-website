import { createSlice } from "@reduxjs/toolkit"

const initialState = [
];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
        removeFromCart: (state, action) => {
            const product = state.find((item) => item.cartId === action.payload);
            state.splice(state.indexOf(product), 1);
        },
        increaseQuantity: (state, action) => {
            const productId = action.payload;
            const product = state.find((item) => item.cartId === productId);
            product.quantity++;

        },
        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const product = state.find((item) => item.cartId === productId);
            product.quantity--;

        }
    }
});

export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;