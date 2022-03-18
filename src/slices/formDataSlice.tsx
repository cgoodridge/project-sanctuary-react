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
            locations: [],
            imgURLS: []
        },
    },
    reducers: {
        saveData: (state: any, action: any) => {
            state.formData = action.payload;

        },
        saveImageURLS: (state: any, action: any) => {
            state.formData.imgURLS = [...state.formData.imgURLS, action.payload];
        },
        saveLocation: (state: any, action: any) => {
            state.formData.locations = [...state.formData.locations, action.payload] ;

            console.log(" This is the current redux state " + state.formData.kingdom);
            console.log(" This is the new redux state " + state.formData.locations[0]);
        }
    }
});

export const { saveData, saveImageURLS, saveLocation } = formDataSlice.actions;

export const selectForm = (state: RootStateOrAny) => state.form.formData;

export default formDataSlice.reducer;