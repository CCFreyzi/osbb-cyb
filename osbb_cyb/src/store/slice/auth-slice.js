import {createSlice, createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";


const initialState = {
    email: null,
    id: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setData(state, action) {
            state.email = action.payload.email
            // state.id = action.payload.id
        }
    }
})

export const {setData} = authSlice.actions;
export default authSlice.reducer;