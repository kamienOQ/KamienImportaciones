import { createSlice } from '@reduxjs/toolkit';

export const buyingSlice = createSlice({
    name: 'buying',
    initialState: {
        success: false
    },
    reducers: {
        onChangeSuccess: (state, action) => {
            state.success = action.payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onChangeSuccess } = buyingSlice.actions;