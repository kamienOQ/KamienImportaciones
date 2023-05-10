import { createSlice } from '@reduxjs/toolkit';

export const uiAttSlice = createSlice({
    name: 'uiAtt',
    initialState: {
        isModalViewOpen: false,
    },
    reducers: {
        onOpenModalView: ( state ) => {
            state.isModalViewOpen = true;
        },
        onCloseModalView: ( state ) => {
            state.isModalViewOpen = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    onOpenModalView,
    onCloseModalView,
} = uiAttSlice.actions;