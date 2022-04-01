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
        imgURLS: []
    },
    reducers: {

        saveData: (state: any, action: any) => {
            state.formData = action.payload;
        },

        saveImageURLS: (state: any, action: any) => {
            state.imgURLS = [...state.imgURLS, action.payload];
            console.log(state.imgURLS);
        },

        clearImageURLS: (state: any) => {
            state.imgURLS = [];
        }

    }

});

export const { saveData, saveImageURLS, clearImageURLS } = formDataSlice.actions;

export const selectForm = (state: RootStateOrAny) => state.form.formData;
export const selectImages = (state: RootStateOrAny) => state.form.imageURLS;

export default formDataSlice.reducer;