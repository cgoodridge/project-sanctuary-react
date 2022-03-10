import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';
import { RootStateOrAny } from 'react-redux';


const rootReducer = combineReducers({
    user: userReducer,
});


const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer<RootStateOrAny>(persistConfig, rootReducer);


export const store = configureStore(
    {
        reducer: persistedReducer,
    });