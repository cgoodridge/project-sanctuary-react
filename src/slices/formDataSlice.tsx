import { createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';


export const formDataSlice = createSlice({

    name: "formData",
    initialState: {
        formData: {
            kingdom: "",
            phylum: "",
            kingdomClass: "",
            order: "",
            family: "",
            genus: "",
            species: "",
            description: "",
        },
        locations: [],
        imgURLS: []
    },

    reducers: {

        saveData: (state: any, action: any) => {
            state.formData = action.payload;

        },

        saveImageURLS: (state: any, action: any) => {
            state.imgURLS = [...state.imgURLS, action.payload];
        },

        saveLocations: (state: any, action: any) => {
            state.locations = [...state.locations, action.payload];
            console.log(state.locations);
        }

    }

});

export const { saveData, saveImageURLS, saveLocations } = formDataSlice.actions;

export const selectForm = (state: RootStateOrAny) => state.form.formData;
export const selectLocations = (state: RootStateOrAny) => state.form.locations;
export const selectImages = (state: RootStateOrAny) => state.form.imageURLS;

export default formDataSlice.reducer;