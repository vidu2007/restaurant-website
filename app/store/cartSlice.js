import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    {
        id: 1,
        name: 'Samsung Galaxy J2 Prime',
        price: 14000,
        quantity: 2
    },
    {
        id: 2,
        name: 'Nokiga G20',
        price: 120000,
        quantity: 1
    }
];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {

        },
        removeFromCart: (state, action) => {

        },
        increaseQuantity: (state, action) => {

        },
        decreaseQuantity: (state, action) => {

        }
    }
});

export const {addToCart, removeFromCart, increaseQuantity, decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;