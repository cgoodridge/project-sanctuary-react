import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';


interface TPayload {
    email: string | null | undefined;
    uid: string | undefined;
    displayName: string | null | undefined;
};

export interface AuthState {
    isAuth: boolean;
    currentUser?: TPayload;
};

export const initialState: AuthState = {
    isAuth: false,
};



export const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {

        login: (state, { payload }: PayloadAction<TPayload>) => {
            state.currentUser = payload;
        },

        logout: (state) => {    
            state.currentUser = undefined;
        }

    }
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootStateOrAny) => state.user.currentUser;

export default userSlice.reducer;