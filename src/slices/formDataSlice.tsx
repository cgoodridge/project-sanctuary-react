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
    },
    reducers: {
        saveData: (state: any, action: any) => {
            state.formData = action.payload;
        },
        clearData: (state: any) => {
            state.formData = {};
        }
    }

});

export const { saveData, clearData } = formDataSlice.actions;

export const selectForm = (state: RootStateOrAny) => state.form.formData;

export default formDataSlice.reducer;