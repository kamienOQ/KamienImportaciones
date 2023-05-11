import { createSlice } from '@reduxjs/toolkit';

export const aboutSlice = createSlice({
    name: 'about',
    initialState: {
        description: '',
        instagram: '',
        name: '',
        whatsapp: '',
        logo: ''
    },
    reducers: {

        onSetData: (state, {payload} ) => {
            state.description = payload[0].description;
            state.instagram = payload[0].instagram;
            state.name = payload[0].name;
            state.logo = payload[0].logo;
            const whatsapp = payload[0].whatsapp.toString();
            if (whatsapp.includes('-') || whatsapp.length < 8){
                state.whatsapp = whatsapp;
            }else{
                state.whatsapp = whatsapp.slice(0, 4) + "-" + whatsapp.slice(4, 8);
            }
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetData } = aboutSlice.actions;