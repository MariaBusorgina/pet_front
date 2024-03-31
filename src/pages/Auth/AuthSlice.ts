import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {
        first_name: null as string | null,
        last_name: null as string | null,
        email: null,
    },
    accessToken: null,
    csrftoken: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, payload) => {
            state.user = {...payload.payload}
        },
        setAccessToken: (state, payload) => {
            state.accessToken = payload.payload
        },
        setCSRFToken: (state, payload) => {
            state.csrftoken = payload.payload
        }
    },

})

export const {
    setAccessToken,
    setCSRFToken,
    setUser,
} = authSlice.actions;
export default authSlice.reducer;
