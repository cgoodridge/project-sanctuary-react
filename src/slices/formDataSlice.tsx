import { createSlice } from '@reduxjs/toolkit';


export const formDataSlice = createSlice({
    name: "formData",
    initialState: {
        formData: {
            kingdom: "",
            phylum: "",
            kingdomClass: "",
            order:"",
            family: "",
            genus:"",
            species: "",
            description:"",
            lat: 0,
            lng: 0
        },
    },
    reducers: {
        saveData: (state: any, action: any) => {
            state.formData = action.payload;
        },
    }
});

export const { saveData } = formDataSlice.actions;

export const selectForm = (state: any) => state.formData.formData;

export default formDataSlice.reducer;