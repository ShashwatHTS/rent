import { configureStore } from "@reduxjs/toolkit";

//* import reducer ( Slices files )
import authReducer from "./Slices/auth";
// import loaderReducer from "../Redux Store/Slices/loaderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // loader: loaderReducer
  },
  // devTools: true
});

export default store;
