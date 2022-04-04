import { createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';

export const imageDataSlice = createSlice({

    name: "imageData",
    initialState: {
        images: [],
    },
    reducers: {
        saveImageURLS: (state: any, action: any) => {

            let newImages = [...state.images];
            newImages = [...newImages, action.payload];

            state.images = newImages;

            console.log("State images are " + state.images);
        },

        clearImageURLS: (state: any) => {
            state.images = [];
        }
    }
});

export const { saveImageURLS, clearImageURLS } = imageDataSlice.actions;

export const selectImages = (state: RootStateOrAny) => state.image.images;

export default imageDataSlice.reducer;