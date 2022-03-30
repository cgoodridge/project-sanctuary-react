import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import formDataReducer from './slices/formDataSlice';
import locationReducer from './slices/locationDataSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { persistReducer } from 'redux-persist';
import { RootStateOrAny } from 'react-redux';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    user: userReducer,
    form: formDataReducer,
    location: locationReducer
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
        middleware: [thunk],
    });