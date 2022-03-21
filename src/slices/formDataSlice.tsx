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
            console.log("payload is " + action.payload);
            const newObject = {...state.formData};
            newObject.kingdom = "Test";
            state.formData = newObject;
            console.log(" This is the new redux state " + newObject.kingdom);
            state.formData.locations = action.payload;

        }

    }

});

export const { saveData, saveImageURLS, saveLocation } = formDataSlice.actions;

export const selectForm = (state: RootStateOrAny) => state.form.formData;

export default formDataSlice.reducer;