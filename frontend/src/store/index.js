// auth

import {createSlice, configureStore} from '@reduxjs/toolkit';

const authSlice= createSlice({
        name:"auth",
        initialState: {
            isLoggedIn:false,
        },
        reducers:{
            login(state){
                console.log("invoking action to set logged in");
                state.isLoggedIn = true;
            },
            logout(state){
                console.log("invoking action to set loggout");
                state.isLoggedIn=false;
            }
        }
});

export const authAction=authSlice.actions;

export const store = configureStore({reducer:authSlice.reducer});