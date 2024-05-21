import { createSlice } from "@reduxjs/toolkit";

const userJSONstr = localStorage.getItem("user") || "null";
const initialState = {
    isAuthenticated: JSON.parse(userJSONstr) ? true : false,
    user: JSON.parse(userJSONstr) || {
        Timing: [],
        outletId: null,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authLogin: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload));
            const newState = {
                isAuthenticated: true,
                user: action.payload,
            };
            return Object.assign({}, state, newState);
        },
        logout: (state) => {
            localStorage.removeItem("user");
            return Object.assign({}, state, {
                isAuthenticated: false,
                user: null,
            });
        },
        checkAuth: (state) => {
            const userJSONstr = localStorage.getItem("user") || "";
            const _user = JSON.parse(userJSONstr);
            if (_user && _user !== "") {
                return Object.assign({}, state, {
                    isAuthenticated: true,
                    user: _user,
                });
            } else {
                return Object.assign({}, state, {
                    isAuthenticated: !!state.isAuthenticated,
                });
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { authLogin, logout, checkAuth } = authSlice.actions;

export default authSlice.reducer;
