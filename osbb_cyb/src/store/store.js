import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slice/auth-slice";
import groupSlice from "./slice/group-slice";

export default configureStore({
    reducer: {
        auth: authSlice,
        group: groupSlice,
    }
})