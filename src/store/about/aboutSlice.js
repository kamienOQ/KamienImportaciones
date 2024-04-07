import { createSlice } from '@reduxjs/toolkit';

export const aboutSlice = createSlice({
    name: 'about',
    initialState: {
        description: '',
        instagram: '',
        name: '',
        whatsapp: '',
        facebook: '',
        logo: ''
    },
    reducers: {

        onSetData: (state, {payload} ) => {
            state.description = payload[0].description;
            state.instagram = payload[0].instagram;
            state.facebook = payload[0].facebook;
            state.whatsapp = payload[0].whatsapp;
            state.name = payload[0].name;
            state.logo = payload[0].logo;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetData } = aboutSlice.actions;