import { createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';

export const imageDataSlice = createSlice({

    name: "imageData",
    initialState: {
        images: [{}],
    },
    reducers: {
        saveImageURLS: (state: any, action: any) => {
            state.imgURLS = [...state.imgURLS, action.payload];
            console.log(state.imgURLS);
        },

        clearImageURLS: (state: any) => {
            state.imgURLS = [{}];
        }
    }
});

export const { saveImageURLS, clearImageURLS } = imageDataSlice.actions;

export const selectImages = (state: RootStateOrAny) => state.location.locations;

export default imageDataSlice.reducer;