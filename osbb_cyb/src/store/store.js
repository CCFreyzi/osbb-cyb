import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slice/auth-slice";

export default configureStore({
    reducer: {
        auth: authSlice,
    }
})