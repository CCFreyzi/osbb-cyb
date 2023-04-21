import {createSlice, createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit";


const initialState = {
    email: null,
    id: null,
    name: '',
    surname: '',
    age: 0,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setEmailAndUid(state, action) {
            state.email = action.payload.email
            state.id = action.payload.id
        },
        setAnotherData(state, action) {
            state.name = action.payload.name
            state.surname = action.payload.surname
            state.age = action.payload.age

        }
    }
})

export const {setEmailAndUid, setAnotherData} = authSlice.actions;
export default authSlice.reducer;