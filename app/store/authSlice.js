import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },

        clearUser: (state) => {
            state.user = null;
            console.log('clear user authslice', state.user);
        },
    }
});

export const {setUser, clearUser} = authSlice.actions;
export default authSlice.reducer;