import { createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';

export const locationDataSlice = createSlice({

    name: "locationData",
    initialState: {
        locations: [],
    },
    reducers: {
        saveLocations: (state: any, action: any) => {
            state.locations = [...state.locations, ...action.payload];
        },

        clearLocations: (state: any) => {
            state.locations = [];
        }
    }
});

export const { saveLocations, clearLocations } = locationDataSlice.actions;

export const selectLocations = (state: RootStateOrAny) => state.location.locations;

export default locationDataSlice.reducer;